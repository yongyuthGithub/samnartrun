<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php echo js_asset('views/Regisrter/Register_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_Registeredit">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-xs-12">                       
                        <div class="col-xs-12 col-md-6"> 
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">รหัสบัตรประชาชน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-credit-card" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser1" name="txtUser1" placeholder="รหัสบัตรประชาชน">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="cmdTitle">นาม :</label>
                                        <select id="cmdTitle" name="cmdTitle" class="form-control selectpicker show-menu-arrow"
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
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">ชื่อ:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-book" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser2" name="txtUser2" placeholder="ชื่อ">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">นามสกุล:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-address-book-o" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser6" name="txtUser6" placeholder="นามสกุล">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">ที่อยู่:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-map-marker" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser3" name="txtUser3" placeholder="ที่อยู่">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-6"> 
                            <div class="row">
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
                                        <label for="cmdDistrict">อำเภอ :</label>
                                        <select id="cmdDistrict" name="cmdDistrict" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="cmdSubDistrict">ตำบล :</label>
                                        <select id="cmdSubDistrict" name="cmdSubDistrict" class="form-control selectpicker show-menu-arrow"
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
                                        <label for="txtZipCode">รหัสไปษณี:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-home" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtZipCode" name="txtZipCode" placeholder="รหัสไปษณี">
                                        </div>
                                    </div>
                                </div>                
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">เบอร์โทร:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-phone-square" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser7" name="txtUser7" placeholder="เบอร์โทร">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtUser">วันที่เริ่มงาน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-child" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtUser5" name="txtUser5" placeholder="วันที่เริ่มงาน">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>







