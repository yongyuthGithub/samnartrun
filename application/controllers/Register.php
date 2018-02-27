<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Register extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/register/register_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/register/register_edit');
    }

    public function findRegister() {
        $query = $this->db->select('E.RowKey as key, '
                        . 'E.IDCard, '
                        . 'E.TitleKey,'
                        . 'E.FName, '
                        . 'E.LName,'
                        . 'E.SDate,'
                        . 'E.Address,'
                        . 'E.Tel,'
                        . 'T.Title,'
                        . 'E.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey,'
                        . 'E.ZipCode')
                ->from('MSTEmployee E')
                ->join('MSTTitle T', 'E.TitleKey=T.RowKey', 'left')
                ->join('MSTSubDistrict SD', 'E.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->key,
                'IDCard' => $row->IDCard,
                'TitleKey' => $row->TitleKey,
                'Title' => $row->Title,
                'FName' => $row->FName,
                'LName' => $row->LName,
                'SDate' => $row->SDate,
                'Address' => $row->Address,
                'Tel' => $row->Tel,
                'SubDistrictKey' => $row->SubDistrictKey,
                'DistrictKey' => $row->DistrictKey,
                'ProvinceKey' => $row->ProvinceKey,
                'ZipCode' => $row->ZipCode,
                'TRNEmployeeFiles' => $this->db
                        ->select('RowKey, EDate, FileType,')
                        ->where('EmpKey', $row->key)
                        ->from('TRNEmployeeFiles')
                        ->get()
                        ->result()
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editRegister() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('IDCard', $_data->IDCard)->from('MSTEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTEmployee', $_data);

                $this->db->where('EmpKey', $_data->RowKey);
                $this->db->delete('TRNEmployeeFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->key = $_data->RowKey;
                    $vReturn->success = true;
                }
            }
        } else {
            $queryChk = $this->db->where('IDCard', $_data->IDCard)->where('RowKey !=', $_data->RowKey)->from('MSTEmployee')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->IDCard = $_data->IDCard;

                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTEmployee', $update);

                $this->db->where('EmpKey', $_data->RowKey);
                $this->db->delete('TRNEmployeeFiles');
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->key = $_data->RowKey;
                    $vReturn->success = true;
                }
            }
        }

        echo json_encode($vReturn);
    }

    public function addImage() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $_data->RowKey = PCenter::GUID();
        $_data->RowStatus = true;
        $_data->CreateBy = $this->USER_LOGIN()->RowKey;
        $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
        $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
        $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
        $this->db->insert('TRNEmployeeFiles', $_data);
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

    public function findImage() {
        $qryMenu = $this->db->select('ImageBase64')
                ->where('RowKey', $_POST['key'])
                ->get('TRNEmployeeFiles');
        echo json_encode($qryMenu->row());
    }

    public function removeAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTEmployee');

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

    //**** Fuel
    public function register_insurance_Main() {
        $data['page'] = 'master/register/register_insurance_main';
        $this->load->view('layout/nav', $data);
    }

    public function findregister_insurance() {
        $qryMenu = $this->db->select('ei.RowKey as key,'
                        . 'ei.SDate,'
                        . 'ei.EDate,'
                        . 'ei.Cash,'
                        . 'ei.InsuranceTypeKey,'
                        . 'it.TypeName,'
                        . 'i.InsuranceName')
                ->join('MSTInsuranceType it', 'ei.InsuranceTypeKey=it.RowKey', 'left')
                ->join('MSTInsurance i', 'it.InsuranceKey=i.RowKey', 'left')
                ->where('ei.EmpKey', $_POST['key'])
                ->where('ei.RowStatus', true)
                ->from('TRNEmployeeInsurance ei')
                ->get();
        echo json_encode($qryMenu->result());
    }

}
