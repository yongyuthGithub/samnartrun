<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class  insurance extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/insurance/insurance_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
          $data['page'] = 'master/insurance/insurance_edit';
          $this->load->view('layout/nav', $data);
    }

}
