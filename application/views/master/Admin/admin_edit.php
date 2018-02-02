<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<div class="page-header">
    <h1>ข้อมูลAdmin</h1><h4><small>เพิ่มข้อมูลAdmin</small></h4>
</div>
<div class="col-12">
    <ol class="breadcrumb">
        <li><a href="<?php echo base_url('Admin/index'); ?> ">Home</a></li>
        <li class="active">New Admin</li>
    </ol>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'เพิ่มข้อมูล Admin';
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
                    <label for="exampleInputEmail1"><h5>Email</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email..">
                </div>
                <div class="col-xs-6 text-left">
                    <label for="exampleInputEmail1"><h5>ชื่อ-นามสกุล</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ชื่อ-นามสกุล..">

                </div>
            </div>
        </div>
        <div class="panel-body">            
            <div class="row">
                <div class="col-xs-6 ">
                    <label for="exampleInputEmail1"><h5>รหัสผ่าน</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="รหัสผ่าน..">
                </div>
                <div class="col-xs-6 text-left">
                    <label for="exampleInputEmail1"><h5>ยืนยันรหัสผ่าน</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ยืนยันรหัสผ่าน..">

                </div>

                <div class="col-xs-6 text-left">
                    <label for="exampleInputEmail1"><h5>ตำแหน่ง</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ตำแหน่ง..">
                </div>
                 <div class="col-xs-6 text-left">
                    <label for="country"><h5>สิทธิการเข้าใช้งาน</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>ผุ้ดูแล</option>
                        <option>สมาชิก</option>
                    </select> 
                </div>
            </div>
        </div>
    </div>
</div>
<br>

<div class="panel-footer">
    ....
</div>
</div>