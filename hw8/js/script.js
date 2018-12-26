/*
Marittya Keu
marittya_keu@student.uml.edu
GUI Programming 1 Homework 6

Description: Javascript page that creates dynamic multiplication table.
Grabs users input from a form and uses values in a double for loop to do
the multiplcation.
*/

var table = document.getElementById('table1');

function doSomething(vstart, vend, hstart, hend) {

  $("#table1").css("visibility", "visible");

  /*
   build up header variable on the top to prepend to main table variable
  */
  var temp = "";
  var head = '<tr> <th class="firstth"></th>';
  for (var k = vstart; k <= vend; k++) {
    head += '<th class="thead">' + (k) + '</th>';
  }
  head += '</tr>';

  /*
  Dynamic multiplcation table
  the first loop populates the rows and the
  second for loop populates the columns
  */
  for (var i = hstart; i <= hend; i++) {
    var row = "<tr>" + '<th class="thead2">' + i + '</th>';
    for (var j = vstart; j <= vend; j++) {
      row += '<td>' + (i * j) + '</td>';
    }
    temp += row + '</tr>';
  }

  // concatenate variables to pass to DOM update
  var result = "<table>" + head + temp + "</table>";
  table.innerHTML = result;

  // reset values so when user clicks the submit again
  result = "";
  head = "";
  temp = "";
  $("#hend").css("border", "null");
  $("#hstart").css("border", "null");
  $("#vstart").css("border", "null");
  $("#vend").css("border", "null");
}

/*
Function "hides" the table element by changing display visibility
*/
function clearForm() {
  resetForm();
  $("#table1").css("visibility", "hidden");
}


// removes error message labels created by jQuery form validator
function resetForm() {
  $("#vend-error").remove();
  $("#vstart-error").remove();
  $("#hend-error").remove();
  $("#hstart-error").remove();
  $("#vstartslide").slider("value", 0);
  $("#vendslide").slider("value", 0);
  $("#hstartslide").slider("value", 0);
  $("#hendslide").slider("value", 0);
}

// custom function to validate if end value is greater than start
$.validator.addMethod('minStrict',
  function (value, element, param) {
    var $otherElement = $(param);
    return parseInt(value, 10) > parseInt($otherElement.val(), 10);

  });

$(function () {
  $('#dynamicForm').validate({
    rules: {
      hstart: {
        required: true,
        number: true,
        min: 1,
        max: 100
      },
      hend: {
        required: true,
        number: true,
        min: 1,
        max: 100,
        minStrict: "#hstart"
      },
      vstart: {
        required: true,
        number: true,
        min: 1,
        max: 100
      },
      vend: {
        required: true,
        number: true,
        min: 1,
        max: 100,
        minStrict: "#vstart"
      }
    },
    messages: {
      hstart: {
        required: "Field is required",
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 100'
      },
      hend: {
        required: "Field is required",
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 100',
        minStrict: 'Input value must be greater than the starting value'
      },
      vstart: {
        required: "Field is required",
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 100'
      },
      vend: {
        required: "Field is required",
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 100',
        minStrict: 'Input value must be greater than the starting value'
      }
    },
    submitHandler: function (e) {
      var vs = parseInt($('#vstart').val());
      var ve = parseInt($('#vend').val());
      var hs = parseInt($('#hstart').val());
      var he = parseInt($('#hend').val());
      doSomething(vs, ve, hs, he);
      return false;
    }
  });


  function slideBar(idName, inputID) {
    $(idName).slider({
      min: 1,
      max: 100,
      slide: function (event, ui) {
        $(inputID).val(ui.value);
        
      }
    });
  }

  function updateInput(idName, inputID) {
    $(inputID).focusout(function () {
      $(idName).slider("value", $(this).val());
    });
  }


  slideBar("#hstartslide", "#hstart");
  slideBar("#hendslide", "#hend");
  slideBar("#vstartslide", "#vstart");
  slideBar("#vendslide", "#vend");
  updateInput("#hstartslide", "#hstart");
  updateInput("#hendslide", "#hend");
  updateInput("#vstartslide", "#vstart");
  updateInput("#vendslide", "#vend");


});

function saveTable() {
  var tabCount = $("#tabs li").length + 1;
  var hor_start = $('#hstart').val();
  var hor_end = $('#hend').val();
  var vert_start = $('#vstart').val();
  var vert_end = $('#vend').val();


  if (tabCount > 6) {
    alert("You can only save up to 6 tabs. Please delete one.");
    return false;
  }
  $("#tabs").tabs();
  var title = "<li class='tab'><a href='#tab-" + tabCount + "'> tab" + tabCount + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";



  
  // Add a new Title bar.
  $("div#tabs ul").append(title);

  // Add the current multiplication table.
  $("div#tabs").append('<div id="tab-' + tabCount + '">' + $("#table1").html() + '</div>');

  // Refresh the tabs div so that the new tab shows up.
  $("#tabs").tabs("refresh");
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
    var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelID ).remove();

  
    try {
      $( "#tabs" ).tabs("refresh");
    }
    catch (e) {
    }
   
    if( $('div#tabs ul li.tab').length == 0) {
      try {
        $("#tabs").tabs("destroy");
      }
      catch (e) {
      }

      return false;   
    }
});
}