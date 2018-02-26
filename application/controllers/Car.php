<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Car extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Car/Car_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Car/Car_edit');
    }

    public function findCar() {
        $query = $this->db->select('C.RowKey as key, '
                        . 'C.BrandKey, '
                        . 'C.CarNumber, '
//                . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'C.ProvinceKey,'
                        . 'P.Province,'
                        . 'C.CarType,'
                . 'B.Brand,')
//                . 'D.RowKey as DistrictKey,'
//                . 'D.ProvinceKey'
                ->from('MSTCar C')
                ->join('MSTBrand B', 'C.BrandKey=B.RowKey', 'left')
//                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTProvince P', 'C.ProvinceKey=P.RowKey', 'left')
                ->get();
//        $query = $this->db->select('RowKey, InsuranceName,Address,SubDistrict,ZipCode,Tel,')->get('MSTInsurance');
//        $_array = array();
//        foreach ($query->result() as $row) {
//            $_ar = array(
//                'key' => $row->RowKey,
//                'InsuranceName' => $row->InsuranceName,
//                'Address' => $row->Address,
//                'SubDistrict' => $row->SubDistrict,
//                'ZipCode' => $row->ZipCode,
//                'Tel' => $row->Tel,
//                
//                
//            );
//            array_push($_array, $_ar);
//        }
        echo json_encode($query->result());
    }

    public function editCar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                    ->where('CarNumber', $_data->CarNumber)
                    ->from('MSTCar')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTCar', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        } else {
            $queryChk = $this->db->where('CarNumber', $_data->CarNumber)->where('RowKey !=', $_data->RowKey)->from('MSTCar')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->BrandKey = $_data->BrandKey;
                $update->CarNumber = $_data->CarNumber;
                $update->ProvinceKey = $_data->ProvinceKey;
                $update->CarType = $_data->CarType;

                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCar', $update);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function removeCar() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTCar');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $vReturn->success = false;
            $vReturn->message = $this->db->_error_message();
        } else {
            $this->db->trans_commit();
            $vReturn->success = true;
        }
        echo json_encode($vReturn);
    }

}
