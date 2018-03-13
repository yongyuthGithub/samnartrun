<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Fule extends PCenter {

    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }

    //**** Pump
    public function index() {
        $data['page'] = 'master/Fule/fule_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $this->load->view('master/Fule/fule_edit');
    }

    public function branchindex() {
        $data['page'] = 'master/Fule/fulebranch_main';
        $this->load->view('layout/nav', $data);
    }

    public function findPump() {
        $query = $this->db->select('RowKey, Pump, PumpType, ')->from('MSTPump')->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'Pump' => $row->Pump,
                'PumpType' => intval($row->PumpType),
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editPump() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Pump', $_data->Pump)->from('MSTPump')->count_all_results();
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
                $this->db->insert('MSTPump', $_data);
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
            $queryChk = $this->db->where('Pump', $_data->Pump)->where('RowKey !=', $_data->RowKey)->from('MSTPump')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->Pump = $_data->Pump;
                $update->PumpType = $_data->PumpType;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTPump', $update);
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

    public function removePump() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTPump');

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
    public function branchMain() {
        $data['page'] = 'master/Fule/branch_main';
        $this->load->view('layout/nav', $data);
    }

    public function branchEdit() {
        $this->load->view('master/Fule/fulebranch_edit');
    }

    public function findBrand() {
        $_key = $_POST['key'];
        $query = $this->db
                ->select('b.RowKey as key, '
                        . 'b.PumpBranch, '
                        . 'b.Address,'
                        . 'Concat(b.Address," ",sd.SubDistrict," ",d.District, " ",p.Province," ",b.ZipCode )as FullAdress, '
                        . 'b.SubDistrict as SubDistrictKey,'
                        . 'sd.DistrictKey,'
                        . 'd.ProvinceKey,'
                        . 'b.ZipCode,'
                        . 'b.IsDefault')
                ->from('MSTPumpBranch b')
                ->join('MSTSubDistrict sd', 'b.SubDistrict=sd.RowKey', 'left')
                ->join('MSTDistrict d', 'sd.DistrictKey=d.RowKey', 'left')
                ->join('MSTProvince p', 'd.ProvinceKey=p.RowKey', 'left')
                ->where('b.PumpKey', $_key)
                ->get();
        echo json_encode($query->result());
    }

    public function editBrand() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('PumpBranch', $_data->PumpBranch)
                            ->where('PumpKey', $_data->PumpKey)
                            ->from('MSTPumpBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('PumpKey', $_data->PumpKey)
                            ->update('MSTPumpBranch');
                }
                
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTPumpBranch', $_data);
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
            $queryChk = $this->db
                            ->where('PumpBranch', $_data->PumpBranch)
                            ->where('PumpKey', $_data->PumpKey)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('MSTPumpBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('PumpKey', $_data->PumpKey)
                            ->update('MSTPumpBranch');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTPumpBranch', $_data);
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

    public function removeBrand() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTPumpBranch');

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

    public function branchDetailMain() {
        $data['page'] = 'master/Fule/fulebranchdetail_main';
        $this->load->view('layout/nav', $data);
    }

    public function branchDetailEdit() {
        $this->load->view('master/Fule/fulebranchdetail_edit');
    }

    public function findBrandDetail() {
        $_key = $_POST['key'];
        $query = $this->db
                ->select('pf.RowKey as key, '
                        . 'f.Fuel, '
                        . 'f.FuelType')
                ->from('MSTPumpFule pf')
                ->join('MSTFuel f', 'pf.FuleKey=f.RowKey', 'left')
                ->where('pf.PumpBranchKey', $_key)
                ->get();
        echo json_encode($query->result());
    }

    public function findFuelList() {
        $_key = $_POST['key'];
        $query = $this->db
                ->select('pf.FuleKey')
                ->from('MSTPumpFule pf')
                ->where('pf.PumpBranchKey', $_key)
                ->get();
        $resultArray = array('');
        foreach ($query->result() as $row) {
            array_push($resultArray, $row->FuleKey);
        }

        $query2 = $this->db
                ->select('pf.RowKey,'
                        . 'pf.Fuel,'
                        . 'pf.FuelType')
                ->from('MSTFuel pf')
                ->where_not_in('pf.RowKey', $resultArray)
                ->get();
        echo json_encode($query2->result());
    }

    public function editFuelList() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        foreach ($_data as $row) {
            $row->RowKey = PCenter::GUID();
            $row->RowStatus = true;
            $row->CreateBy = $this->USER_LOGIN()->RowKey;
            $row->CreateDate = PCenter::DATATIME_DB(new DateTime());
            $row->UpdateBy = $this->USER_LOGIN()->RowKey;
            $row->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('MSTPumpFule', $row);
        }

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

    public function removeFuelList() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTPumpFule');

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
