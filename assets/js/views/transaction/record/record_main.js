$(function () {
    var form_record = $('#form_record');

    form_record.find('#divSDate').dateTime().on('dp.change', function (e) {
//        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date.add(1,'days'));
        form_record.find('#divEDate').data("DateTimePicker").minDate(e.date);
    });
    form_record.find('#divEDate').dateTime().on('dp.change', function (e) {
//        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date.add(-1,'days'));

        form_record.find('#divSDate').data("DateTimePicker").maxDate(e.date);
    });
    
    form_record.find('#divSDate').dateTime().data("DateTimePicker").date(new Date());
});

