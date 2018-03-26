<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class InReport extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/InReport/InReport_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {

        $this->load->view('transaction/InReport/InReport_edit');
    }

     
    
    public function findInReport() {
        $_data = json_decode($_POST['vdata']);
        $query = $this->db->select('RowKey, DocDate, Detial,IncomeType,Amount, ')
                ->where('DocDate >=', $_data->SDate)
                ->where('DocDate <=', $_data->EDate)
                ->from('TRNIncomeOther')->get();
        $_array = array();
        foreach ($query->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'DocDate' => $row->DocDate,
                'Detial' => ($row->Detial),
                'IncomeType' => intval($row->IncomeType),
                'Amount' => ($row->Amount),
            );
            array_push($_array, $_ar);
        }
        echo json_encode($_array);
    }

    public function editIncome() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Detial', $_data->Detial)->from('TRNIncomeOther')->count_all_results();
            if ($queryChk = 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('TRNIncomeOther', $_data);
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
            $queryChk = $this->db->where('Detial', $_data->Detial)->where('RowKey !=', $_data->RowKey)->from('TRNIncomeOther')->count_all_results();
            if ($queryChk = 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->DocDate = $_data->DocDate;
                $update->Detial = $_data->Detial;
                $update->IncomeType = $_data->IncomeType;
                $update->Amount = $_data->Amount;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNIncomeOther', $update);
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

        $this->db->where_in('RowKey', $_data)->delete('TRNIncomeOther');

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
