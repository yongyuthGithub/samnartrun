<?php echo js_asset('views/Car/Car_Act_edit.js') ?>
<div class="panel panel-default">
    <div class="panel-body">
        <form id="form_CarActedit">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-xs-12">
                        <div class="col-xs-12 "> 
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtSDate">วันที่เริ่มพ.ร.บ:</label>
                                        <div class="input-group date" id="txtSDate">
                                            <input type='text' class="form-control text-center" id="txtSDate1" name="txtSDate11" placeholder="วันที่หมดอายุพ.ร.บ" onkeydown="return false;" />
                                            <span class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtEDate">วันที่หมดอายุพ.ร.บ:</label>
                                        <div class="input-group date" id="txtEDate">
                                            <input type='text' class="form-control text-center" id="txtEDate1" name="txtEDate11" placeholder="วันที่หมดอายุพ.ร.บ" onkeydown="return false;" />
                                            <span class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </span>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="txtCash">จำนวนเงิน:</label>
                                        <div class="input-group">
                                            <div class="input-group-addon"><i class="fa fa-map-marker" style="min-width: 20px;"></i></div>
                                            <input type="text" class="form-control" id="txtCash" name="txtCash" placeholder="จำนวนเงิน">
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