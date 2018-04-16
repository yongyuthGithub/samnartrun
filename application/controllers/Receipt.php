<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Receipt extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/Receipt/receipt_main';
        $this->load->view('layout/nav', $data);
    }

    public function editPage() {
        $data['page'] = 'transaction/Receipt/receipt_edit';
        $this->load->view('layout/nav', $data);
    }

    public function findCustomer() {
        $qryCust = $this->db->select('RowKey,'
                        . 'CusCode,'
                        . 'Customer')
                ->where('RowStatus', true)
                ->from('MSTCustomer')
                ->order_by('CusCode', 'asc')
                ->get();
        echo json_encode($qryCust->result());
    }

    public function findCustomerBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'Branch,'
                        . 'Address,'
                        . 'DueDate')
                ->where('CompanyKey', $_key)
                ->order_by('IsDefault', 'desc')
                ->order_by('Branch', 'asc')
                ->from('MSTCustomerBranch')
                ->get();
        echo json_encode($qryMenu->result());
    }

}
