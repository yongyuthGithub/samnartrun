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
</script>
<div class="page-header">
    <h1>ข้อมูลAdmin <small>ข้อมูลAdmin</small></h1>
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
<div class="panel-footer">
    ......
</div>
</div>