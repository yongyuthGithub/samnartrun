<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<?php

echo 'ทดสอบ <br/>';
echo site_url().'<br/>';
echo base_url().'<br/>';
echo current_url().'<br/>';
echo uri_string().'<br/>';
echo anchor().'<br/>';
echo prep_url($_SERVER['HTTP_HOST']).'<br/>';
echo prep_url($_SERVER['REQUEST_URI']).'<br/>';

echo PCenter::getMyHost('');
?>

