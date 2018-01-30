<?php

require_once __DIR__ . '\..\models\PCenter.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends PCenter {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     * 	- or -
     * 		http://example.com/index.php/welcome/index
     * 	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function __construct() {
        parent::__construct();
//        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }

    public function index() {
        $data['page'] = 'master/index';
        $data['txtemail'] = 'yongyuth@gmail.com';
        $data['ttt'] = $this->testmy($_SERVER['HTTP_HOST'] . ', ' . $_SERVER['REQUEST_URI'].', '.$_SERVER['REMOTE_ADDR'].', '.$_SERVER['SCRIPT_FILENAME']);
        $this->load->view('layout/_layout', $data);
    }

    public function showlayoutB4() {
        $this->load->view('layout/_layout_B4');
    }

    public function showlayoutB5() {
        $this->load->view('layout/_layout_B4');
    }

}
