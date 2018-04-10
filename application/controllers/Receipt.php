<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class Receipt extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'transaction/Receipt/receipt_main';
        $this->load->view('layout/nav', $data);
    }
}