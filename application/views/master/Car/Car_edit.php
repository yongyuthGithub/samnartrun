<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<div class="page-header">
    <h1>ข้อมูลAdmin</h1><h4><small>เพิ่มข้อมูลAdmin</small></h4>
</div>-->
<?php echo js_asset('views/Car/Car_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Caredit">
             <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdBrand">ยี่ห้อรถ :</label>
                    <select id="cmdBrand" name="cmdBrand" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="true"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                    </select>
                </div>
            </div>
              <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtCarNumber">เลขทะเบียนรถ :</label>
                    <div class="input-group">
                        <div class="input-group-addon"><i class=" fa fa-home" style="min-width: 20px;"></i></div>
                        <input type="text" class="form-control" id="txtCarNumber" name="txtCarNumber" placeholder="เลขทะเบียนรถ">
                    </div>
                </div>
            </div>
          
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="cmdProvince">จังหวัด :</label>
                    <select id="cmdProvince" name="cmdProvince" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="true"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                    </select>
                </div>
            </div>
             <div class="col-xs-12">
                <div class="form-group">
                    <label for="txtCarType">ประเภทเพลา :</label>
                    <select id="txtCarType" name="txtCarType" class="form-control selectpicker show-menu-arrow"
                            data-width="100%"
                            data-show-Tick="true"
                            data-tick-Icon="fa fa-check"
                            data-size="5"
                            data-header="false"
                            data-live-Search="false"
                            data-live-Search-Placeholder="key word"
                            data-multiple-Separator=",&nbsp;&nbsp;"
                            data-actions-Box="false"
                            data-selectAll-Text="Select All"
                            data-deselectAll-Text="Deselect All"
                            data-selected-Text-Format="count > 3">
                         <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;2เพลา</option>
                        <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;3เพลา</option>
                    </select>
                    </div>
                </div>
            </div>
           
        </form>
    </div>
</div>