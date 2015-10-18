'use strict';
$(document).ready(function() {

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');
        $('#step3').slideUp(400, function(){});
        $('iframe').hide();

        console.log("/species/" + className);
        $.ajax({
            dataType: "json",
            url: "/species/" + className,
            success: function(result){

                $("#choose_subclass").html("<option disabled selected> -- select an organism -- </option>");

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
                });

                $("#choose_subclass").selectpicker('refresh');
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
                    const name = val['fields']['name'];
                    $("#prop_boxes").append(`<div><input type="checkbox" value="${name}" />${name}</div>`);
                })
             }
            });


        } (this.value));

    });

    $('#get_recipe_btn').click(function() {
        $('#waiting_result_animation').show();
            const iframe = document.createElement('iframe');
            iframe.src = 'http://www.plasmid.com/order_preps/';
            iframe.style.width = '100%';
            iframe.style.height = '1000px';
            const wresult = document.getElementById('waiting_result');
            wresult.replaceChild(iframe, wresult.getElementsByTagName('img')[0]);
            iframe.onload = function (e) {
                setTimeout(function () {
                    $('body').scrollTo(400);
                }, 4000);
            };
        });
});