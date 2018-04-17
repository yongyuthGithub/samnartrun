<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

use Fusonic\Linq\Linq;

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

    public function newBill() {
        $this->load->view('transaction/Receipt/receiptbill_edit');
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

    public function findBillByCustomer() {
        $receiptkey = $_POST['receiptkey'];
        $_key = $_POST['key'];
        $_data = json_decode($_POST['vdata']);
        $qryBill = Linq::from($this->db->select('b.RowKey')
                                ->from('TRNBillHD b')
                                ->join('MSTCustomerBranch cb', 'b.CustomerBranchKey=cb.RowKey')
                                ->where('cb.CompanyKey', $_key)
                                ->where('b.Amounts=b.Remain')
                                ->where_not_in('b.RowKey', $_data)
                                ->get()->result())
                        ->select(function($x) {
                            return $x->RowKey;
                        })->toArray();
        $qryBillInReceipt = Linq::from($this->db->select('rb.BillKey as RowKey')
                                ->from('TRNReceiptBill rb')
                                ->where_not_in('rb.BillKey', $_data)
                                ->where('rb.ReceiptHDKey', $receiptkey)
                                ->get()->result())
                        ->select(function($x) {
                            return $x->RowKey;
                        })->toArray();
        $keyTotal = array_merge($qryBill, $qryBillInReceipt);
        if (count($keyTotal) === 0)
            array_push($keyTotal, PCenter::GUID_EMPTY());
        $arData = Linq::from($this->db->select('b.RowKey as key,'
                                . 'b.DocDate,'
                                . 'b.DocID,'
                                . 'b.Remain,'
                                . '"' . $receiptkey . '" as receiptkey')
                        ->from('TRNBillHD b')
                        ->where_in('b.RowKey', $keyTotal)
                        ->order_by('b.DocDate', 'ASC')
                        ->get()->result())
                ->select(function($x) {
                    $oldAmounts = $this->db->select_sum('Amounts')
                            ->from('TRNReceiptBill')
                            ->where('BillKey', $x->key)
                            ->where('ReceiptHDKey', $x->receiptkey)
                            ->get()->row()->Amounts;
                    return [
                        'key' => $x->key,
                        'DocDate' => $x->DocDate,
                        'DocID' => $x->DocID,
                        'Amounts' => $x->Remain + $oldAmounts,
                        'InputAmounts' => $x->Remain + $oldAmounts,
                    ];
                })
                ->toArray();
        echo json_encode($arData);
    }

}
