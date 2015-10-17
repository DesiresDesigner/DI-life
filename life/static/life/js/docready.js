$(document).ready(function() {

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');
        $('#step2').show();
    });

    $('#choose_subclass').change(function(event) {
        var subclassName = this.value;
        $('#step3').show();
    });
});