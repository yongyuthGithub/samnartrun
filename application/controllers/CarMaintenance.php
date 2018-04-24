<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class CarMaintenance extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/CarMaintenance/CarMaintenance_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/CarMaintenance/CarMaintenance_edit');
    }

    public function findcarmtn() {
        $query = $this->db->select('CM.RowKey as key, '
                        . 'CM.CarKey, '
                        . 'C.CarNumber,'
                        . 'T.Title,'
                        . 'EM.FName,'
                        . 'EM.LName,'
                        . 'CM.EmpKey, '
                        . 'CM.BeginDate,'
                        . 'CM.SkillLabor,')
                ->from('TRNCarEmployee CM')
                ->join('MSTCar C', 'CM.CarKey=C.RowKey', 'left')
//                ->join('MSTDistrict D','SD.DistrictKey=D.RowKey','left')
                ->join('MSTEmployee EM', 'CM.EmpKey=EM.RowKey', 'left')
                ->join('MSTTitle T', 'EM.TitleKey=T.RowKey', 'left')
                ->get();
        echo json_encode($query->result());
    }

    public function editcarmtn() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('CarKey', $_data->CarKey)->from('TRNMaintenance')->count_all_results();
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
                $this->db->insert('TRNMaintenance', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                    $vReturn->key = $_data->RowKey;
                }
            }
        } else {
            $queryChk = $this->db->where('CarKey', $_data->CarKey)->where('RowKey !=', $_data->RowKey)->from('TRNMaintenance')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->CarKey = $_data->CarKey;
                $update->EmpKey = $_data->EmpKey;
                $update->BeginDate = $_data->BeginDate;
                $update->SkillLabor = $_data->SkillLabor;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNMaintenance', $update);
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

    public function removecarmtn() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNMaintenance');

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