<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<div class="page-header">
    <h1>ข้อมูลรถขนส่ง <small>ข้อมูลรถขนส่งภายในบริษัท (ส่วนหัว/ส่วนหาง)</small></h1>
</div>
<div class="col-12">
<ol class="breadcrumb">
    <li><a href="<?php echo base_url('Car/index'); ?> ">Home</a></li>
    <li class="active">New Car</li>
</ol>
<div class="panel panel-default">
    <div class="panel-heading">
        <div class="row">
            <div class="col-xs-6 ">
                <h4>
                    <?php
                    echo 'ข้อมูลรถ';
                    ?>
                </h4>
            </div>
            <div class="col-xs-6 text-right">
                <button type="button" class="btn btn-success"><i class="fa fa-newspaper-o" style="padding-right: 5px;"></i>Save</button>
            </div>
        </div>
    </div>
    <div class="panel-body">            
        <div class="row">
            <div class="col-xs-6 ">
                <label for="exampleInputEmail1"><h5>ทะเบียนรถ</h5></label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ทะเบียนรถ">
            </div>
            <div class="col-xs-6 text-left">
                <label for="country"><h5>ประเภทรถ</h5></label>
                <select class="form-control">
                    <option>กรุณาเลือก..</option>
                    <option>2 เพลา</option>
                    <option>3 เพลา</option>
                </select> 
            </div>

        </div>
    </div>
        </div>
        <br>

        <div class="panel-footer">
            ....
        </div>
    </div>
