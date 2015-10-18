'use strict';
$(document).ready(function() {

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');

        console.log("/species/" + className);
        $.ajax({
            dataType: "json",
            url: "/species/" + className,
            success: function(result){

                $("#choose_subclass").html("<option disabled selected> -- select an organism -- </option>");
                $("#choose_subclass").selectpicker('refresh');

                $.each( result, function( key, val ) {
                    var appending;
                    if (val["fields"]["friendly_name"] == null)
                        appending = val["fields"]["name"];
                    else
                        appending = val["fields"]["friendly_name"];

                    $("#choose_subclass")
                        .append($("<option></option>")
                        .attr("value", appending)
                        .text(appending))
                        .selectpicker('refresh');

                });
            }
        });


        $('#step2').slideDown(400, function(){});
    });

    $('#choose_subclass').change(function() {
        var subclassName = this.value;
        $('#step3').slideDown(400, function(data){

            $.ajax({
            dataType: "json",
            url: "/properties/" + data,
            success: function(result){
                console.log(result);
                $("#prop_boxes").html("");
                $.each( result, function( key, val ) {
                    console.log(val);

                    $("#prop_boxes").append('<div><input type="checkbox" value="'
                        + val['fields']['name']
                        +  '" />'
                        + val['fields']['name']
                        + '</div>');
                })
             }
            });


        } (this.value));

    });

    $('#get_recipe_btn').click(function() {
        /*$('#waiting_submit').slideUp(400, function(){
            $('#waiting_result').show();
        });*/
        $('#waiting_result_animation').show();
    });

});