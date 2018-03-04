<?php

//require_once __DIR__ . '\..\models\PCenter.php';
require __DIR__ . '/../core/PCenter.php';
//require __DIR__ . '/../core/Phinq/PhinqBase.php';
//require __DIR__ . '/../core/Phinq/Phinq.php';


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

//    public function index() {
//        $data['page'] = 'master/index';
//        $data['txtemail'] = 'yongyuth@gmail.com';
//        $data['ttt'] = $this->testmy('HTTP_HOST : '.$_SERVER['HTTP_HOST'] . '<br>REQUEST_URI : ' . $_SERVER['REQUEST_URI'].'<br>REMOTE_ADDR : '.$_SERVER['REMOTE_ADDR'].'<br>SCRIPT_FILENAME : '.$_SERVER['SCRIPT_FILENAME']);
//        $this->load->view('layout/nav', $data);
//    }

    public function showlayoutB4() {
        $this->load->view('layout/_layout_B4');
    }

    public function index() {
        $data['page'] = 'setting/home/login';
        $data['seturl'] = !isset($_POST['loginUrl']) ? 0 : $_POST['loginUrl'];
        $this->load->view('layout/nav', $data);
    }

    public function main() {
//        $ddd = new Phinq/Phinq;
//        
//        $payments = array(10.5, 11.94, 9.3, 0, 17.1, 10.5, 0);
//        $paymentQuery = $ddd::create($payments)
//                ->where(function($payment) {
//                    return $payment !== 0;
//                }) //non-zero
//                ->orderBy(function($payment) {
//            return $payment;
//        }); //sorted ascending
//        $this->load->library('Phinq/PhinqBase');
//        $this->load->library('Phinq/Phinq');
        $data['page'] = 'setting/home/main_page';
        $this->load->view('layout/nav', $data);
    }

    public function popupLogin() {
        $this->load->view('setting/home/login_page');
    }

    public function popupForget() {
        $this->load->view('setting/home/forget_page');
    }

    public function profile() {
        $this->load->view('setting/home/profile_page');
    }

    public function chkLogin() {
        $_user = $_POST['user'];
        $_pass = $_POST['pass'];
        $_md5Pass = $this->GEN_PASSWORD_MD5($_user, $_pass);
        $vReturn = (object) [];

        $this->db->trans_begin();
        $queryChk = $this->db->where('Password', $_md5Pass)->from('USRAccount')->count_all_results();
        if ($queryChk === 0) {
            $vReturn->success = false;
            $vReturn->message = 'No user in the system..';
        } else {
            $data = $this->db->where('Password', $_md5Pass)->from('USRAccount')->get()->row();
            $arDelete = Array($data->RowKey);
            $this->db->where_in('AccountKey', $arDelete)->delete('TMPLogin');

            $obj = (object) [];
            $obj->RowKey = PCenter::GUID();
            $obj->AccountKey = $data->RowKey;
            $obj->Token = md5(PCenter::GUID());
            $obj->UpdateDate = PCenter::DATATIME_DB(new DateTime());
            $this->db->insert('TMPLogin', $obj);

            setcookie('samnartrun_login', $data->RowKey, time() + (86400 * 7), '/');
            setcookie('samnartrun_token', $obj->Token, time() + (86400 * 7), '/');
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $vReturn->success = false;
                $vReturn->message = $this->db->_error_message();
            } else {
                $this->db->trans_commit();
                $vReturn->success = true;
            }
        }

        echo json_encode($vReturn);
    }

    public function chkLoginCookie() {
        $vReturn = (object) [];
        if (!isset($_COOKIE['samnartrun_login'])) {
            $vReturn->success = false;
        } else {
            $login = $_COOKIE['samnartrun_login'];
            $token = $_COOKIE['samnartrun_token'];

            $chkAcc = $this->db->where('RowKey', $login)->from('USRAccount')->count_all_results();
            $chkTmp = $this->db->where('AccountKey', $login)->where('Token', $token)->from('TMPLogin')->count_all_results();

            if ($chkAcc === 0 || $chkTmp === 0) {
                setcookie('samnartrun_login', '', time() - 86400);
                setcookie('samnartrun_token', '', time() - 86400);
                $vReturn->success = false;
            } else {
                $vReturn->success = true;
            }
        }
        echo json_encode($vReturn);
    }

    public function findProfile() {
        $query = $this->db
                ->where('USRAccount.RowKey', $this->USER_LOGIN()->RowKey)
                ->from('USRAccount')
                ->join('MSTTitle', 'MSTTitle.RowKey = USRAccount.TitleKey', 'left')
                ->select('USRAccount.RowKey AS key,'
                        . ' USRAccount.User,'
                        . ' USRAccount.TitleKey,'
                        . ' CONCAT(MSTTitle.Title, USRAccount.FName," ",USRAccount.LName) AS Name,'
                        . ' USRAccount.FName,'
                        . ' USRAccount.LName,'
                        . ' USRAccount.RowStatus')
                ->get();
        $queryP = $this->db
                ->where('USRGroupAccount.AccountKey', $this->USER_LOGIN()->RowKey)
                ->from('USRGroupAccount')
                ->join('USRGroup', 'USRGroupAccount.GroupKey=USRGroup.RowKey', 'inner')
                ->select('USRGroup.UserGroup')
                ->get();
        $vReturn = (object) [];
        $vReturn->User = $query->row();
        $vReturn->Pemission = $queryP->result_array();
        echo json_encode($vReturn);
    }

}
