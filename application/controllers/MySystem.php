<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class MySystem extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'setting/mySystem/mysystem_main';
        $this->load->view('layout/nav', $data);
    }

    public function findMySystem() {
        $qryMenu = $this->db
                ->select('c.IDCard,'
                        . 'c.Customer,'
                        . 'c.Address,'
                        . 'c.SubDistrict as SubDistrictKey,'
                        . 'sd.DistrictKey,'
                        . 'd.ProvinceKey,'
                        . 'c.ZipCode,'
                        . 'c.Tel,'
                        . 'c.Fax')
                ->from('SYSCompany c')
                ->join('MSTSubDistrict sd', 'c.SubDistrict=sd.RowKey', 'left')
                ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey', 'left')
                ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey', 'left')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editMySystem() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($this->db->from('SYSCompany')->count_all_results() === 0) {
            $_data->RowKey = PCenter::GUID_EMPTY();
            $_data->CreateBy = $this->USER_LOGIN()->RowKey;
            $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('SYSCompany', $_data);
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        } else {
            $_data->UpdateBy = PCenter::GUID_EMPTY();
            $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->where('RowKey', PCenter::GUID_EMPTY())->update('SYSCompany', $_data);
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        }
        echo json_encode($vReturn);
    }

    public function findMyCompany() {
        echo json_encode($this->MyCompayDetail());
    }
    
    public function dd(){
        
    }
}
