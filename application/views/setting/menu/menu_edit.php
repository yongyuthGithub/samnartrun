<?php echo js_asset('views/setting/menu/menu_edit.js') ?>
<div class="row">
    <form id="form_menuedit">
        <div class="col-xs-12">
            <div class="form-group">
                <label for="txtMenu">Menu Name :</label>
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-folder-open" style="min-width: 20px;"></i></div>
                    <input type="text" class="form-control" id="txtMenu" name="txtMenu" placeholder="Input Menu Name">
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="form-group">
                <label for="txtDescription">Description :</label>
                <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-paint-brush" style="min-width: 20px;"></i></div>
                    <textarea class="form-control" id="txtDescription" name="txtDescription" placeholder="Input Description"></textarea>
                </div>
            </div>
        </div>
    </form>
</div>