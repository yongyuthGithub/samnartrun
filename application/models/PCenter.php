<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PCenter
 *
 * @author Yongyuth
 */
class PCenter extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper('url');
        //$this->load-model('dbconnect');
    }
    
    protected function testmy($ssss){
        
        return $ssss;
    }
}
