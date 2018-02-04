<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<!--<script type="text/javascript">
    $(function () {
        var form_sumbit = $('#form_sumbit');

        $('#btnEdit').on({
            click: function () {
                form_sumbit.prop('action', $('#hidUrl').val() + 'Admin/edit').submit();
            }
        });
        $('#btnDelete').on({
            click: function () {
                alert('ลบแล้ว');
//                form_sumbit.prop('action',$('#hidUrl').val()+'Car/edit').submit();
            }
        });
    })
</script>-->
<?php echo js_asset('views/admin/admin_main.js')?>
<div class="page-header">
    <h1>ข้อมูล Admin <small>จัดการข้อมูลผู้ใช้ระบบ</small></h1>
</div>
<div class="col-12">   
    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6 ">
                    <h4>
                        <?php
                        echo 'ข้อมูลAdmin';
                        ?>
                    </h4>
                </div>
                <div class="col-xs-6 text-right">
                    <div class="input-group">                        
                        <span class="input-group-btn">
                            <!--                            <div class="btn-group">-->
                            <button type="button" class="btn btn-success" id="btnEdit"><i class="fa fa-plus" style="padding-right: 5px;"></i> New</button>
                            <button type="button" class="btn btn-danger" id="btnDelete"><i class="fa fa-close" style="padding-right: 5px;"></i> Delete</button>
                            <!--                            </div>-->
                        </span>
                        <input id="email" type="text" class="form-control" name="txtSearch" id="txtSearch" placeholder="Search...">
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-body">            
            <div id="form_adminlist"></div>
        </div>
    </div>
</div>