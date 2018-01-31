<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Car extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Car/car_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
        $data['page'] = 'master/Car/car_edit';
        $this->load->view('layout/nav', $data);
    }

    public function getTestjson() {
//       header('Content-Type: application/json');
        $objList = array();
        $obj = (object) [];
        $obj->id = PCenter::GUID();
        $obj->name = 'test';
        $obj->old = 33;
        array_push($objList, $obj);
        
        $obj = (object) [];
        $obj->id = PCenter::GUID();
        $obj->name = 'test2';
        $obj->old = 32;
        array_push($objList, $obj);
        
        $test = (object)[];
        $test->data=$obj;
        $test->dataArray=$objList;
        $test->data_from_page= json_decode($_POST['v']);
        $test->test_data_json = PCenter::DATATIME_DB(new DateTime());
        
        $query = $this->db->query('select * from MSTFuel');
        $test->with_db = $query->row_array();
        
        echo json_encode($test);
    }

}
