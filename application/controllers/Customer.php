<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class  Customer extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/customer/customer_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
          $data['page'] = 'master/customer/customer_edit';
          $this->load->view('layout/nav', $data);
    }

}