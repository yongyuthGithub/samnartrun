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

    public function newBank() {
        $this->load->view('transaction/Receipt/receiptbbank_new');
    }
    
    public function newBankBranch() {
        $this->load->view('transaction/Receipt/receiptbankbranch_new');
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

    public function findBank() {
        $query = $this->db->select('RowKey, '
                        . 'Bank,'
                        . 'IsDefault')
                ->from('MSTBank')
                ->order_by('Bank', 'ASC')
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

    public function findBankBranch() {
        $_key = $_POST['key'];
        $query = $this->db->select('RowKey, '
                        . 'Branch,'
                        . 'IsDefault')
                ->from('MSTBankBranch')
                ->where('BankKey', $_key)
                ->order_by('Branch', 'ASC')
                ->get();
        echo json_encode($query->result());
    }
    
    public function editBankBranch() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Branch', $_data->Branch)->where('BankKey', $_data->BankKey)->from('MSTBankBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('BankKey', $_data->BankKey)
                            ->update('MSTBankBranch');
                }

                $_data->RowKey = PCenter::GUID();
                $_data->RowStatus = true;
                $_data->CreateBy = $this->USER_LOGIN()->RowKey;
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('MSTBankBranch', $_data);
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
            $queryChk = $this->db->where('Branch', $_data->Branch)->where('RowKey !=', $_data->RowKey)->where('BankKey', $_data->BankKey)->from('MSTBankBranch')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                if ($_data->IsDefault) {
                    $this->db->set('IsDefault', false)
                            ->where('BankKey', $_data->BankKey)
                            ->update('MSTBankBranch');
                }
                $_data->UpdateBy = $this->USER_LOGIN()->RowKey;
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('MSTBankBranch', $_data);
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

}
