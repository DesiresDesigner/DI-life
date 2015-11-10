'use strict';
$(document).ready(function() {

    var className;
    var subclassName;

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        className = $(event.target).attr('for');
        $('#step3').slideUp(400, function(){});
        $('iframe').hide();
        $('#generated_result').slideUp(400, function(data){});

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
        subclassName = this.value;
        $('iframe').hide();
        $('#generated_result').slideUp(400, function(data){});
        $('#step3').slideDown(400, function(data){

            $.ajax({
            dataType: "json",
            url: "/properties/" + data,
            success: function(result){
                $("#prop_boxes").html("");
                $.each( result, function( key, val ) {
                    const name = val['fields']['name'];
                    $("#prop_boxes").append(`<div><input type="checkbox" value="${name}" />${name}</div>`);
                })
             }
            });


        } (this.value));

    });

    $('#get_recipe_btn').click(function() {
        $('#waiting_result_animation').show();

        var search_settings_array = [];
        search_settings_array.push(className);
        search_settings_array.push(subclassName);

        var form = $("#prop_boxes");
         $( "#prop_boxes div input" ).each(function(index, element) {
             if (element.checked)
                search_settings_array.push(element.value);

         });

        console.log(search_settings_array);
        var myJsonString = JSON.stringify(search_settings_array);
        console.log(myJsonString);

         $.ajax({
             url: "/create",
             type: "GET",
             data: {'data': myJsonString},
             success: function(result){
                $('#waiting_result_animation').hide();

                var algorythm_array = result.split(";");

                var recipe_algorythm = "";
                for (var i = 0; i < algorythm_array.length; i += 1)
                    recipe_algorythm += algorythm_array[i] + "<br>";

                $('#generated_result').html("<H2> We are ready to reveal to you the secret of such organism! </H2> <p>" + recipe_algorythm + "</p>");

                $('#generated_result').slideDown(400, function(data){});

                const iframe = document.createElement('iframe');
                iframe.src = 'http://www.plasmid.com/order_preps/';
                iframe.style.width = '100%';
                iframe.style.height = '1000px';
                const gresult = document.getElementById('generated_result');
                gresult.appendChild(iframe);
                $(gresult).show();
                $('#waiting_result').hide();
                iframe.onload = function (e) {
                    setTimeout(function () {}, 4000);

                    for( i = 0; i < 20; ++i) {
                        jQuery.event.trigger({ type : 'keypress', which : character.charCodeAt() });
                    }
                };
            }
         });
    });
});