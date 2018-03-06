<?php echo css_asset('views/transaction/record/record_edit.css'); ?>
<?php echo js_asset('views/transaction/record/record_edit.js'); ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_recordedit">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                    <div class="form-group">
                        <label for="txtDocID">เลขที่เอกสาร :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-credit-card" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control" id="txtDocID" name="txtDocID" placeholder="เลขที่เอกสาร">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                    <div class="form-group">
                        <label for="txtDocDate">วันที่เอกสาร :</label>
                        <div class="input-group date" id="divDate">
                            <input type='text' class="form-control text-center" id="txtDocDate" name="txtDocDate" placeholder="วันเอกสาร" onkeydown="return false;" />
                            <span class="input-group-addon">
                                <span class="fa fa-calendar"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdCarF">รถลากส่วนหัว :</label>
                        <select id="cmdCarF" name="cmdCarF" class="form-control selectpicker show-menu-arrow"
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
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdCarS">รถลากส่วนหาง :</label>
                        <select id="cmdCarS" name="cmdCarS" class="form-control selectpicker show-menu-arrow"
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
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdCustomerF">ลูกค้าต้นทาง :</label>
                        <select id="cmdCustomerF" name="cmdCustomerF" class="form-control selectpicker show-menu-arrow"
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
                    <div class="form-group">
                        <label for="cmdBranchF">สาขาต้นทาง :</label>
                        <select id="cmdBranchF" name="cmdBranchF" class="form-control selectpicker show-menu-arrow"
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
                    <div class="row">
                        <div class="form-group col-md-8 col-md-offset-4">
                            <label for="txtMileageF">เลขไมล์ต้นทาง :</label>
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                                <input type="text" class="form-control text-right" id="txtMileageF" name="txtMileageF" placeholder="เลขไมล์ต้นทาง">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div class="form-group">
                        <label for="cmdCustomerS">ลูกค้าปลายทาง :</label>
                        <select id="cmdCustomerS" name="cmdCustomerS" class="form-control selectpicker show-menu-arrow"
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
                    <div class="form-group">
                        <label for="cmdBranchS">สาขาปลายทาง :</label>
                        <select id="cmdBranchS" name="cmdBranchS" class="form-control selectpicker show-menu-arrow"
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
                    <div class="row">
                        <div class="form-group col-md-8 col-md-offset-4">
                            <label for="txtMileageS">เลขไมล์ปลายทาง :</label>
                            <div class="input-group">
                                <div class="input-group-addon"><i class="fa fa-tachometer" style="min-width: 20px;"></i></div>
                                <input type="text" class="form-control text-right" id="txtMileageS" name="txtMileageS" placeholder="เลขไมล์ปลายทาง">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label for="txtProduct">รายละเอียดสินค้าที่ขนส่ง :</label>
                        <textarea class="form-control" name="txtProduct" id="txtProduct" placeholder="รายละเอียดสินค้าทีทำการขนส่ง"></textarea>
                    </div>
                </div>
            </div>  
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-sm-offset-6 col-md-4 col-md-offset-8">
                    <div class="form-group">
                        <label for="txtTotal">ค่าบริการ :</label>
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-btc" style="min-width: 20px;"></i></div>
                            <input type="text" class="form-control text-right" id="txtTotal" name="txtTotal" placeholder="ค่าบริการจัดส่ง">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#IncomeIn">รายรับอื่นๆ</a></li>
                        <li><a data-toggle="tab" href="#IncomeOut">รายการจ่ายอื่นๆ</a></li>
                        <li><a data-toggle="tab" href="#Fule">รายการเติมน้ำมัน</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="IncomeIn" class="tab-pane fade in active" style="padding-top: 20px;">
                            <div id="form_incomein">

                            </div>
                        </div>
                        <div id="IncomeOut" class="tab-pane fade in" style="padding-top: 20px;">
                            <div id="form_incomeout">

                            </div>
                        </div>
                        <div id="Fule" class="tab-pane fade in" style="padding-top: 20px;">
                            <div id="form_fule">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>