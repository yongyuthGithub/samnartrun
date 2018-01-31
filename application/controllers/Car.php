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

}
