<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__ . '/../core/PCenter.php';

class InReportCarIncome extends PCenter {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $data['page'] = 'subfolder/view';
        $this->load->view('layout/nav', $data);
    }

}