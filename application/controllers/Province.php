<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Province extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function findProvince() {
        $query = $this->db
                ->form('MSTProvince')
                ->select('RowKey, Province')
                ->order_by('Province', 'asc')
                ->get();
        echo json_encode($query->results());
    }

    public function findDistrict() {
        $value = $_POST['key'];
        $query = $this->db
                ->form('MSTDistrict')
                ->where('ProvinceKey', $value)
                ->select('RowKey, District')
                ->order_by('District', 'asc')
                ->get();
        echo json_encode($query->results());
    }
    
    public function findSubDistrict() {
        $value = $_POST['key'];
        $query = $this->db
                ->form('MSTSubDistrict')
                ->where('DistrictKey', $value)
                ->select('RowKey, SubDistrict, ZipCode')
                ->order_by('SubDistrict', 'asc')
                ->get();
        echo json_encode($query->results());
    }
}
