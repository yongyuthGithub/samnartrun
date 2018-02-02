<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<div class="page-header">
    <h1>ข้อมูลผู้ขับขี่</h1><h4><small>เพิ่มข้อมูลผู้ขับขี่</small></h4>
</div>
<div class="col-12">
    <ol class="breadcrumb">
        <li><a href="<?php echo base_url('register/index'); ?> ">Home</a></li>
        <li class="active">New Driver</li>
    </ol>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'ข้อมูลผู้ขับขี่';
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
                <div class="col-xs-2 ">
                    <label for="exampleInputEmail1"><h5>รหัสบัตรประชาชน</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="รหัสบัตรประชาชน..">
                </div>
                <div class="col-xs-2 text-left">
                    <label for="country"><h5>คำนำหน้า</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>นาย</option>
                        <option>นาง</option>
                        <option>นาางสาว</option>
                    </select> 
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>ชื่อ</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ชื่อ..">
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>นามสกุล</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="นามสกุล..">
                </div>
                <div class="col-xs-2 ">
                    <label for="exampleInputEmail1"><h5>เบอร์โทร</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="เบอร์โทร..">
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>ที่อยู่</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="ที่อยู่..">
                </div>
                <div class="col-xs-2 text-left">
                    <label for="country"><h5>ตำบล</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>ตำบลที่ 1</option>
                        <option>ตำบลที่ 2</option>
                        <option>ตำบลที่ 3</option>
                    </select> 
                </div>
                <div class="col-xs-2 text-left">
                    <label for="country"><h5>อำเภอ</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>อำเภอที่ 1</option>
                        <option>อำเภอที่ 2</option>
                        <option>อำเภอที่ 3</option>
                    </select> 
                </div>
                <div class="col-xs-2 text-left">
                    <label for="country"><h5>จังหวัด</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>จังหวัดที่ 1</option>
                        <option>จังหวัดที่ 2</option>
                        <option>จังหวัดที่ 3</option>
                    </select> 
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>รหัสไปรษณีย์</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="รหัสไปรษณีย์..">
                </div>
                 <div class="col-xs-3 text-left">
                    <label for="country"><h5>บริษัทประกัน</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>บริษัทประกัน 1</option>
                        <option>บริษัทประกัน 2</option>
                        <option>บริษัทประกัน 3</option>
                    </select> 
                </div>
                 <div class="col-xs-3 text-left">
                    <label for="country"><h5>ประเภทประกัน</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>ประกันชีวิต</option>
                        <option>ประกันอุบัติเหตุ</option>
                    </select> 
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>วันเริ่มประกัน</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="วันเริ่มประกัน..">
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>วันหมดประกัน</h5></label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="วันหมดประกัน..">
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>แนบไฟล์ใบขับขี่</h5></label>
                    <input type="file" class="form-control" id="exampleInputEmail1" >
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>วันหมดอายุใบขับขี่</h5></label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="วันหมดอายุใบขับขี่..">
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>แนบไฟล์ทะเบียนบ้าน</h5></label>
                    <input type="file" class="form-control" id="exampleInputEmail1" >
                </div>
                <div class="col-xs-3 ">
                    <label for="exampleInputEmail1"><h5>แนบไฟล์ใสำเนาบัตรประชาชน</h5></label>
                    <input type="file" class="form-control" id="exampleInputEmail1" >
                </div>
                <div class="col-xs-6 ">
                    <label for="exampleInputEmail1"><h5>หมายเหตุ</h5></label>
                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="หมายเหตุ.." >
                </div>

            </div>
        </div>
    </div>

    <!--        <div class="panel-footer">
                ....
            </div>-->
</div>
