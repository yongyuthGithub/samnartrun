<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<div class="page-header">
    <h1>ข้อมูลประกัน <small>ข้อมูลประกันรถยนต์</small></h1>
</div>
<div class="col-12">
    <ol class="breadcrumb">
        <li><a href="<?php echo base_url('insurance/insurance_index'); ?> ">Home</a></li>
        <li class="active">เพิ่มข้อมูลประกัน</li>
    </ol>
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'ข้อมูลประกัน';
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
                    <label for="exampleInputEmail1"><h5>เลขที่กรรมธรรม์</h5></label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="เลขที่กรรมธรรม์">
                </div>
                <div class="col-xs-6 text-left">
                    <label for="country"><h5>บริษัทประกัน</h5></label>
                    <select class="form-control">
                        <option>กรุณาเลือก..</option>
                        <option>บริษัทที่ 1</option>
                        <option>บริษัทที่ 2</option>
                    </select> 
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-6 text-center">
                    <label for="exampleInputEmail1"><h5>ประกันชั้นที่</h5></label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> ชั้นที่1
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> ชั้นที่2
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> ชั้นที่3
                    </label>
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