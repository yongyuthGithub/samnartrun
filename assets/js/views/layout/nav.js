$(function () {
    var form_sumbit = $('#form_sumbit');
    
    if($('#loginUrl').length===0){
        form_sumbit.prop('action',mvcPatch('home/chkLoginCookie')).submit();
    }    
});

