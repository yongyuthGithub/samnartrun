<?php echo css_asset('views/transaction/record/record_main.css'); ?>
<?php echo js_asset('views/BillHD/BillHD_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>รายการวางบิล</h1><h4><small>จัดการรายการวางบิล</small></h4>
        </div>
    </div>
</div>
<div id="form_record">
    <div class="col-12">   
        <div class="panel panel-default">
            <!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdTitle">บริษัท :</label>
                            <select id="cmdTitle" name="cmdTitle" class="form-control selectpicker show-menu-arrow"
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
                                <option data-icon="fa fa-clone" value="1">&nbsp;&nbsp;</option>
                                <option data-icon="fa fa-clone" value="2">&nbsp;&nbsp;บริษัทที่ 2</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4  col-md-3 col-md-offset-3">
                        <div class="form-group">
                            <label for="txtUser">ตั้งแต่วันที่ :</label>
                            <div class="input-group date" id="divSDate">
                                <input type='text' class="form-control text-center" id="txtSDate" name="txtSDate" placeholder="วันที่เริ่ม" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="txtUser">ถึงวันที่ :</label>
                            <div class="input-group date" id="divEDate">
                                <input type='text' class="form-control text-center" id="txtEDate" name="txtEDate" placeholder="วันที่สิ้นสุด" onkeydown="return false;" />
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <hr>
                <div id="form_recordlist"></div>
            </div>
        </div>
    </div>
</div>
