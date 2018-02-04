<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class admin extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'master/Admin/admin_main';
        $this->load->view('layout/nav', $data);
    }

    public function edit() {
          $this->load->view('master/Admin/admin_edit');
    }

}
