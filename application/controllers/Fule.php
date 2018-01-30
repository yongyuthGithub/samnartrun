<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require __DIR__.'/../core/PCenter.php';
class Fule extends PCenter {
    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }
    
    public function index(){
        $data['page'] = 'master/Fule/fule_main';
        
        $this->load->model('fule_model');
        $this->fule_model->insert_into_fule();
        
        $this->load->view('layout/nav', $data);
    }
}
