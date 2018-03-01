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

}
