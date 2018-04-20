<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Bank extends PCenter {

    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }

    public function index() {
        $data['page'] = 'master/Bank/Bank_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {

        $this->load->view('master/Bank/Bank_edit');
    }

    public function branchindex() {
        $data['page'] = 'master/Bank/Banktype_main';
        $this->load->view('layout/nav', $data);
    }

    public function typeedit() {
        $this->load->view('master/Bank/Banktype_edit');
    }

    public function findBank() {
        $query = $this->db->select('RowKey,Bank,IsDefault')->from('MSTBank')->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'Bank' => $row->Bank,
                'IsDefault' => $row->IsDefault,
                '_Delete' => $this->db
                        ->where('bb.BankKey', $row->RowKey)
                        ->from('TRNReceiptPayCheque r')
                        ->from('MSTBankBranch bb', 'r.BankBranchKey=bb.RowKey')
                        ->count_all_results() > 0 ? false : true
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function findcustomerr() {
        $query = $this->db->select('I.RowKey as key, '
                        . 'I.Branch, '
                        . 'I.Address, '
                        . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'I.ZipCode,'
                        . 'I.Tel,'
                        . 'I.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey')
                ->from('MSTCustomer I')
                ->join('MSTSubDistrict SD', 'I.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->join('MSTProvince P', 'D.ProvinceKey=P.RowKey', 'left')
                ->get();
        echo json_encode($query->result());
    }

    public function editBank() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Bank', $_data->Bank)->from('MSTBank')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTBank');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTBank', $_data);
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
            $queryChk = $this->db->where('Bank', $_data->Bank)->where('RowKey !=', $_data->RowKey)->from('MSTBank')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->update('MSTBank');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTBank', $_data);
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
        }

        echo json_encode($vReturn);
    }

    public function findCustomertype() {
        $key = $_POST['key'];
        $query = $this->db->select('I.RowKey as key, '
                        . 'I.Branch, '
                        . 'I.Address, '
                        . 'Concat(I.Address," ",SD.SubDistrict," ",D.District, " ",P.Province," ",I.ZipCode )as FullAdress, '
                        . 'I.ZipCode,'
                        . 'I.Tel,'
                        . 'I.IDCard,'
                        . 'I.Fax,'
                        . 'I.SubDistrict as SubDistrictKey,'
                        . 'D.RowKey as DistrictKey,'
                        . 'D.ProvinceKey,'
                        . 'I.IsDefault')
                ->from('MSTCustomerBranch I')
                ->join('MSTSubDistrict SD', 'I.SubDistrict=SD.RowKey', 'left')
                ->join('MSTDistrict D', 'SD.DistrictKey=D.RowKey', 'left')
                ->join('MSTProvince P', 'D.ProvinceKey=P.RowKey', 'left')
                ->where('I.CompanyKey', $key)
                ->get();
        echo json_encode($query->result());
    }

    public function editCustomertype() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db
                            ->where('Branch', $_data->Branch)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->from('MSTCustomerBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->update('MSTCustomerBranch');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTCustomerBranch', $_data);
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
            $queryChk = $this->db
                            ->where('Branch', $_data->Branch)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->where('RowKey !=', $_data->RowKey)
                            ->from('MSTCustomerBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('CompanyKey', $_data->CompanyKey)
                            ->update('MSTCustomerBranch');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTCustomerBranch', $_data);
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

    public function removeAccount() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTCustomer');

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

    public function removeAccount1() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('MSTCustomerBranch');

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

}
