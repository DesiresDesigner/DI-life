'use strict';
$(document).ready(function() {

    const anim = document.getElementById('waiting_result_animation');

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');
        $('#step3').slideUp(400, function(){});
        var iframes = document.getElementsByTagName('iframe');
        if (iframes.length > 0) {
            document.getElementById('generated_result').removeChild(iframes[0]);
        }
        $('#generated_result').hide();
        $('#waiting_result_animation').hide();
        $('#waiting_result').show();

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
            const gresult = document.getElementById('generated_result');
            gresult.appendChild(iframe);
            $(gresult).show();
            $('#waiting_result').hide();
            iframe.onload = function (e) {
                setTimeout(function () {
                    //document.getElementById('custcol_prepname1').value = '555';
                }, 4000);
                //console.log(iframe.innerHTML);
                //setInterval(function () {
                //    jQuery.event.trigger({ type : 'keypress', which : 9 });
                //}, 500);
                //for (var i = 0; i < 17; ++i) {
                //    jQuery.event.trigger({ type : 'keypress', which : 17 });
                //}
            };
        });
});