<?php

defined('BASEPATH') OR exit('No direct script access allowed');
include_once APPPATH . 'core/POther.php';

use Fusonic\Linq\Linq;

class Bill extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/bill/bill_main';
        $this->load->view('layout/nav', $data);
    }

    public function indexNew() {
        $data['page'] = 'transaction/bill/billnew_main';
        $this->load->view('layout/nav', $data);
    }

    public function findCustomerIsRecord() {
        $qryMenu = $this->db->select('CutsomerKey')
                ->where('IsBill', false)
                ->from('TRNWrokSheetHD')
                ->get();

        if (Linq::from($qryMenu->result())->count() > 0) {
            $qryCust = $this->db->select('RowKey,'
                            . 'CusCode,'
                            . 'Customer')
                    ->where_in('RowKey', Linq::from($qryMenu->result())->select(function($x) {
                                return $x->CutsomerKey;
                            })->toArray())
                    ->from('MSTCustomer')
                    ->order_by('CusCode', 'asc')
                    ->get();
            echo json_encode($qryCust->result());
        } else {
            echo json_encode(array());
        }
    }

    public function findRecordNotIsBill() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey as key,'
                        . 'DocID,'
                        . 'DocDate,'
                        . 'Product,'
                        . 'PriceTotal,'
                        . '0 as Discount,'
                        . 'PriceTotal as NetPrice')
                ->where('CutsomerKey', $_key)
                ->where('IsBill', false)
                ->from('TRNWrokSheetHD')
                ->get();

        if (Linq::from($qryMenu->result())->count() > 0) {
            echo json_encode($qryMenu->result());
        } else {
            echo json_encode(array());
        }
    }

}
