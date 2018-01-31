<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<script type="text/javascript">
    $(function () {
        var form_sumbit = $('#form_sumbit');

        $('#btnEdit').on({
            click: function () {
                form_sumbit.prop('action', mvcPatch('Car/edit')).submit();
            }
        });
        $('#btnDelete').on({
            click: function () {
                var _data = new Object();
                _data.objID = newGuid();
                _data.objName = 'นาย ยงยุทธ จันทร์ลอย'
                _data.objStatus = true;
                _data.objDate = PHP_DateTime_To_JSON(new Date());
//                _data.objData_2 = PHP_JSON_To_DateTime(PHP_DateTime_To_JSON(new Date()));
//                _data.objData_3 = PHP_JSON_To_DateTime(PHP_DateTime_To_JSON(new Date()));

                $.reqData({
                    url: mvcPatch('Car/getTestjson'),
                    data: {v: JSON.stringify(_data)},
                    callback: function (data) {
//                        alert(JSON.stringify(data));
                    }
                });
//                form_sumbit.prop('action',$('#hidUrl').val()+'Car/edit').submit();
            }
        });
    })
</script>
<div class="page-header">
    <h1>ข้อมูลรถขนส่ง</h1><h4><small>ข้อมูลรถขนส่งภายในบริษัท (ส่วนหัว/ส่วนหาง)</small></h4>
</div>
<div class="col-12">
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'ข้อมูลรถ';
                        ?>
                    </h4>
                </div>
                <div class="col-xs-6 text-right">
                    <button type="button" class="btn btn-success" id="btnEdit"><i class="fa fa-newspaper-o" style="padding-right: 5px;"></i> New</button>
                    <button type="button" class="btn btn-primary" id="btnDelete"><i class="fa fa-android" style="padding-right: 5px;"></i> Delete</button>
                </div>
            </div>
        </div>
        <div class="panel-body">            
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
</div>
<!--<div class="panel-footer">
    ......
</div>-->