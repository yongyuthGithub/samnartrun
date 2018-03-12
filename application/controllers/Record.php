<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Record extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/record/record_main';
        $this->load->view('layout/nav', $data);
    }

    public function recordEdit() {
        $this->load->view('transaction/record/record_edit');
    }

    public function incomeinEdit() {
        $this->load->view('transaction/record/recordincomein_edit');
    }

    public function fuleEdit() {
        $this->load->view('transaction/record/recordfule_edit');
    }

//    public function file_upload(){
//        $file = $_FILES['f'];        
//        $vReturn = (object) [];
//        $vReturn->name=$file['name'];
//        
//        move_uploaded_file($file["tmp_name"],$this->GET_FOLDER_UPLOAD().'/'.$file["name"]);
//                
//        echo json_encode($vReturn);
//    }

    public function findRecord() {
        $_data = json_decode($_POST['vdata']);
        $qryMenu = $this->db->select('w.RowKey as key,'
                        . 'w.DocID,'
                        . 'w.DocDate,'
                        . 'w.Product,'
                        . 'w.PriceTotal,'
                        . 'cf.CarNumber as CNumberF,'
                        . 'cs.CarNumber as CNumberS,'
                        . 'cufc.CusCode as CusCodeF,'
                        . 'cufc.Customer as CustomerF,'
                        . 'cusc.CusCode as CusCodeS,'
                        . 'cusc.Customer as CustomerS,')
                ->where('w.DocDate >=', $_data->SDate)
                ->where('w.DocDate <=', $_data->EDate)
                ->from('TRNWrokSheetHD w')
                ->join('MSTCar cf', 'w.CarFirstKey=cf.RowKey', 'left')
                ->join('MSTCar cs', 'w.CarSecondKey=cs.RowKey', 'left')
                ->join('MSTCustomerBranch cuf', 'w.CutsomerForm=cuf.RowKey', 'left')
                ->join('MSTCustomer cufc', 'cuf.CompanyKey=cufc.RowKey', 'left')
                ->join('MSTCustomerBranch cus', 'w.CustomerTo=cus.RowKey', 'left')
                ->join('MSTCustomer cusc', 'cus.CompanyKey=cusc.RowKey', 'left')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findCarFirst() {
        $qryMenu = $this->db->select('c.RowKey,'
                        . 'c.CarNumber,'
                        . 'c.CarType,'
                        . 'p.Province')
                ->where('c.CarGroup', 1)
                ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey', 'left')
                ->from('MSTCar c')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findCarSecond() {
        $qryMenu = $this->db->select('c.RowKey,'
                        . 'c.CarNumber,'
                        . 'c.CarType,'
                        . 'p.Province')
                ->where('c.CarGroup', 2)
                ->join('MSTProvince p', 'c.ProvinceKey=p.RowKey', 'left')
                ->from('MSTCar c')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function findCustomer() {
        $qryMenu = $this->db->select('RowKey,'
                        . 'CusCode,'
                        . 'Customer')
                ->get('MSTCustomer');
        echo json_encode($qryMenu->result());
    }

    public function findCustomerBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'Branch')
                ->where('CompanyKey', $_key)
                ->order_by('Branch', 'asc')
                ->get('MSTCustomerBranch');
        echo json_encode($qryMenu->result());
    }

    public function findFule() {
        $qryMenu = $this->db->select('RowKey,'
                        . 'Pump')
                ->order_by('Pump', 'asc')
                ->get('MSTPump');
        echo json_encode($qryMenu->result());
    }

    public function findFuleBranch() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('RowKey,'
                        . 'PumpBranch')
                ->where('PumpKey', $_key)
                ->order_by('PumpBranch', 'asc')
                ->get('MSTPumpBranch');
        echo json_encode($qryMenu->result());
    }

    public function findFuleType() {
        $_key = $_POST['key'];
        $qryMenu = $this->db->select('pf.RowKey,'
                        . 'f.Fuel')
                ->from('MSTPumpFule pf')
                ->join('MSTFuel f', 'pf.FuleKey=f.RowKey', 'left')
                ->where('pf.PumpBranchKey', $_key)
                ->order_by('f.Fuel', 'asc')
                ->get();
        echo json_encode($qryMenu->result());
    }

    public function editRecord() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();

        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('DocID', $_data->DocID)->from('TRNWrokSheetHD')->count_all_results();
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
                $this->db->insert('TRNWrokSheetHD', $_data);
                
                
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
            $queryChk = $this->db->where('DocID', $_data->DocID)->where('RowKey !=', $_data->RowKey)->from('TRNWrokSheetHD')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('TRNWrokSheetHD', $_data);
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

    public function removeRecord() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('TRNWrokSheetHD');

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
