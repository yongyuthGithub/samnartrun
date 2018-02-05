<?php

//require_once __DIR__ . '\..\models\PCenter.php';
require __DIR__ . '/../core/PCenter.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class Menu extends PCenter {

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
        $data['page'] = 'setting/menu/menu_main';
        $this->load->view('layout/nav', $data);
    }

    public function editMenuPage() {
        $this->load->view('setting/menu/menu_edit');
    }

    public function findMenu() {
        $qryMenu = $this->db->select('RowKey AS key,'
                        . ' Menu,'
                        . ' Description')
                ->get('USRMenu');
        echo json_encode($qryMenu->result());
    }

    public function editMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];

        $this->db->trans_begin();
        if ($_data->RowKey === PCenter::GUID_EMPTY()) {
            $queryChk = $this->db->where('Menu', $_data->Menu)->from('USRMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $quySeq = $this->db->select_max('Seq')->get('USRMenu');
                $Seq = $quySeq->row();

                $_data->RowKey = PCenter::GUID();
                $_data->Seq = $Seq->Seq + 1;
                $_data->RowStatus = true;
                $_data->CreateBy = PCenter::GUID_EMPTY();
                $_data->CreateDate = PCenter::DATATIME_DB(new DateTime());
                $_data->UpdateBy = PCenter::GUID_EMPTY();
                $_data->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->insert('USRMenu', $_data);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        } else {
            $queryChk = $this->db->where('Menu', $_data->Menu)->where('RowKey !=', $_data->RowKey)->from('USRMenu')->count_all_results();
            if ($queryChk > 0) {
                $vReturn->success = false;
                $vReturn->message = 'This information is already in the system.';
            } else {
                $update = (object) [];
                $update->Menu = $_data->Menu;
                $update->Description = $_data->Description;
                $update->UpdateBy = PCenter::GUID_EMPTY();
                $update->UpdateDate = PCenter::DATATIME_DB(new DateTime());
                $this->db->where('RowKey', $_data->RowKey)->update('USRMenu', $update);
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    $vReturn->success = false;
                    $vReturn->message = $this->db->_error_message();
                } else {
                    $this->db->trans_commit();
                    $vReturn->success = true;
                }
            }
        }
        echo json_encode($vReturn);
    }
    
    public function removeMenu() {
        $_data = json_decode($_POST['data']);
        $vReturn = (object) [];
        $this->db->trans_begin();

        $this->db->where_in('RowKey', $_data)->delete('USRMenu');

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $vReturn->success = false;
            $vReturn->message = $this->db->_error_message();
        } else {
            $this->db->trans_commit();
            $vReturn->success = true;
        }
        echo json_encode($vReturn);
    }

    public function findSubMenu() {
        $qryMenu = $this->db->select('RowKey, Menu, Description')->get('USRSubMenu');
        $arMenu = array();
        foreach ($qryMenu->result() as $row) {
            $_ar = array(
                'key' => $row->RowKey,
                'Menu' => $row->Menu,
                'Description' => $row->Description
            );
            array_push($arMenu, $_ar);
        }
        echo json_encode($arMenu);
    }

}