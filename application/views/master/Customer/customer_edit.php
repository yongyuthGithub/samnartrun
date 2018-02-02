<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<div class="page-header">
    <h1>ข้อมูลลูกค้าบริษัท</h1><h4><small>เพิ่มข้อมูลลูกค้า</small></h4>
</div>
<div class="col-12">
    <ol class="breadcrumb">
        <li><a href="<?php echo base_url('customer/index'); ?> ">Home</a></li>
        <li class="active">New Customer</li>
    </ol>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'ข้อมูลลูกค้า';
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
                    <label for="exampleInputEmail1"><h5>ชื่อบริษัท</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ชื่อบริษัท..">
                </div>
                <div class="col-xs-6 text-left">
                    <label for="country"><h5>สาขา</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>สาขาที่ 1</option>
                        <option>สาขาที่ 2</option>
                    </select> 
                </div>
                <div class="col-xs-6 ">
                    <label for="exampleInputEmail1"><h5>ที่อยู่</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ที่อยู่..">
                </div>
                <div class="col-xs-6 ">
                    <label for="exampleInputEmail1"><h5>เบอร์โทรติดต่อ</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="เบอร์โทรติดต่อ..">
                </div>

            </div>
        </div>
    </div>

    <!--        <div class="panel-footer">
                ....
            </div>-->
</div>