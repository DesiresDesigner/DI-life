'use strict';
$(document).ready(function() {

    $('.selectpicker').selectpicker({
      //style: 'btn-warning',
      size: 4
    });

    $('#choose_class label').click(function(event) {
        var className = $(event.target).attr('for');

        const cs = document.getElementById('choose_subclass');
        let first = cs.options[0];
        cs.innerHTML = '';
        cs.appendChild(first);

        console.log("/species/" + className);
        $.ajax({
            dataType: "json",
            url: "/species/" + className,
            success: function(result){
                //console.log(result);
                $.each( result, function( key, val ) {
                    /*$.each(val.stars , function(k , v ){  // The contents inside stars
                        console.log(v);
                    });*/
                    //console.log(val["fields"]);
                    var appending;
                    if (val["fields"]["friendly_name"] == null)
                        appending = val["fields"]["name"];
                    else
                        appending = val["fields"]["friendly_name"];
                    //var append_option = "<option value='" + append + "'>" + append + "</option>";
                    //console.log(append_option);


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

    $('#choose_subclass').change(function(event) {
        var subclassName = this.value;
        $('#step3').slideDown(400, function(data){
            /*$('#get_recipe_btn').on("click", function() {
                alert("click");
            });*/

            $.ajax({
            dataType: "json",
            url: "/properties/" + data,
            success: function(result){
                console.log(result);
                $.each( result, function( key, val ) {
                    console.log(val);

                    $("#prop_boxes").append('<div><input type="checkbox" value="'
                        + val['fields']['name']
                        +  '" />'
                        + val['fields']['name']
                        + '</div>');
                })


                    //console.log(val["fields"]);\

                    //var appending;
                    //if (val["fields"]["friendly_name"] == null)
                    //    appending = val["fields"]["name"];
                    //else
                    //    appending = val["fields"]["friendly_name"];
                    //var append_option = "<option value='" + append + "'>" + append + "</option>";
                    //console.log(append_option);


                    //$("#choose_subclass")
                    //    .append($("<option></option>")
                    //    .attr("value", appending)
                    //    .text(appending))
                    //    .selectpicker('refresh');

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