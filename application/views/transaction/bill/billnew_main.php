<?php echo css_asset('views/transaction/bill/billnew_main.css'); ?>
<?php echo js_asset('views/transaction/bill/billnew_main.js'); ?>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-body">
            <h1>สร้างรายการบิลใหม่</h1><h4><small>จัดการออกบิลแต่ละรายการลูกค้าที่มีอยู่ในระบบ</small></h4>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="<?php echo base_url('Bill/index') ?>">หน้าหลัก</a></li>
                <li class="active"><?php echo $_POST['txtdisplay']; ?></li>
            </ol>
        </div>
    </div>
</div>
<div id="form_billnew">
    <div class="col-12">   
        <div class="panel panel-default">
            <!--            <div class="panel-heading">ช่วงระยะเวลาที่แสดงรายการประจำวัน</div>-->
            <div class="panel-body">
                <div class="row">                    
                    <div class="col-xs-12 col-sm-4 col-md-3">
                        <div class="form-group">
                            <label for="cmdCust">เลือกลูกค้าที่ต้องการออกบิล :</label>
                            <select id="cmdCust" name="cmdCust" class="form-control selectpicker show-menu-arrow"
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
                    <div class="col-xs-12 col-sm-3 col-md-2">
                        <div class="form-group">
                            <label for="cmdVatStatus">รูปแบบภาษี :</label>
                            <select id="cmdVatStatus" name="cmdVatStatus" class="form-control selectpicker show-menu-arrow"
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
                                <option data-icon="fa fa-sliders" value="1">&nbsp;&nbsp;ไม่คำนวณภาษี</option>
                                <option data-icon="fa fa-sliders" value="2">&nbsp;&nbsp;คำนวณภาษีใน</option>
                                <option data-icon="fa fa-sliders" value="3">&nbsp;&nbsp;คำนวณภาษีนอก</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-3 col-sm-offset-2 col-md-2 col-md-offset-5" style="height: 74px;line-height: 74px;">
                        <div class="form-group">
                            <button type="button" class="btn btn-success form-control">ออกบิล</button>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="form_bilelist"></div>
                <hr>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group">
                            <label for="txtPriceTotal" class="text-right" style="line-height: 34px;">เงินรวม :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group">
                            <input type="text" class="form-control text-right" id="txtPriceTotal" name="txtPriceTotal" placeholder="เงินรวม" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group">
                            <label for="txtDiscountTotal" class="text-right" style="line-height: 34px;">ส่วนลด :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group">
                            <input type="text" class="form-control text-right" id="txtDiscountTotal" name="txtDiscountTotal" placeholder="ส่วนสดท้ายบิล" value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group">
                            <label for="txtVatTotal" class="text-right" style="line-height: 34px;">ภาษี :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group">
                            <input type="text" class="form-control text-right" id="txtVatTotal" name="txtVatTotal" placeholder="ภาษี" disabled value="0.00">
                        </div>
                    </div>
                </div>
                <div class="row">  
                    <div class="col-xs-4 col-xs-offset-0 col-sm-4 col-sm-offset-4 col-md-3 col-md-offset-6 text-right">
                        <div class="form-group">
                            <label for="txtNetPrice" class="text-right" style="line-height: 34px;">จำนวนเงินสุทธิ :</label>
                        </div>
                    </div>
                    <div class="col-xs-8 col-sm-4 col-md-3">
                        <div class="form-group">
                            <input type="text" class="form-control text-right" id="txtNetPrice" name="txtNetPrice" placeholder="จำนวนเงินสุทธิ" disabled value="0.00">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="txtkey" value="<?php echo $_POST['txtkey']; ?>" />