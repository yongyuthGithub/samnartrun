<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลAdmin</h1><h4><small>เพิ่มข้อมูลAdmin</small></h4>
</div>-->
<?php echo js_asset('views/insurance/insurance_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_insuranceedit">
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtUser">ชื่อบริษัทประกัน :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-user-circle" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtinsurance" name="txtinsurance" placeholder="ชื่อบริษัทประกัน">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>