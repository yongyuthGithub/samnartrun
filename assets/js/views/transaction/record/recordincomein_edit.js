$(function () {
    var form_incomeinedit = $('#form_incomeinedit');
    var form_incomeinedit_C = $.modelDialog(form_incomeinedit);

    var _formdata = form_incomeinedit_C.data('data');
    if (_formdata.key === Guid) {

    } else {
        form_incomeinedit.find('#txtDetail').val(_formdata.Detial);
        form_incomeinedit.find('#txtAmount').val(_formdata.Amount);
    }

    form_incomeinedit_C.find('#btn-ok').on({
        click: function () {
            form_incomeinedit.submit();
        }
    });

    form_incomeinedit.myValidation({
        funsuccess: function () {
            form_incomeinedit_C.data('fun')(form_incomeinedit_C);
        },
        btnactive: [
            form_incomeinedit_C.find('#btn-ok')
        ],
        fields: {
            txtDetail: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุรายละเอียด'
                    }
                }
            },
            txtAmount: {
                icon: false,
                validators: {
                    notEmpty: {
                        message: '* ระบุจำนวนเงิน'
                    },
                    regexp: {//***Custom Patter
                        regexp: regexpDecimal,
                        message: '* ระบุเป็นตัวเลขเท่านั้น'
                    }
                }
            }
        }
    });
});
