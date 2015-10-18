$(document).ready(function() {

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');
        $('#step2').slideDown(400, function(){});
    });

    $('#choose_subclass').change(function(event) {
        var subclassName = this.value;
        $('#step3').slideDown(400, function(){
            /*$('#get_recipe_btn').on("click", function() {
                alert("click");
            });*/
        });
    });

    $('#get_recipe_btn').click(function() {
        /*$('#waiting_submit').slideUp(400, function(){
            $('#waiting_result').show();
        });*/
        $('#waiting_result_animation').show();
    });

});