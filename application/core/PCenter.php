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
        $this->load->helper('asset');
        $this->load->helper('form');
        //$this->load-model('dbconnect');
    }

    public static function GUID() {
        if (function_exists('com_create_guid') === true) {
            return trim(com_create_guid(), '{}');
        }

        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

    public static function GUID_EMPTY() {
        return trim('{00000000-0000-0000-0000-000000000000}', '{}');
    }

    public static function DATATIME_DB($datatime, $user_time = true) {
        return $user_time ? $datatime->format('Y-m-d H:i:s') : $datatime->format('Y-m-d');
    }

//    public static function getMyHost($url = null) {
//        if ($url == null) {
//            return prep_url($_SERVER['HTTP_HOST']) . '/samnartrun/';
//        } else {
//            return prep_url($_SERVER['HTTP_HOST']) . '/samnartrun/' . $url;
//        }
//    }

    protected function testmy($ssss) {

        return $ssss;
    }

}
