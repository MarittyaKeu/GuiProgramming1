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

  $("#table1").css("visibility","visible");

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
  var result = head + temp;
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

}

// custom function to validate if end value is greater than start
$.validator.addMethod('minStrict', function (value, el, param2) {
  return value > $(param2).val();
}, 'Invalid value');

$(function () {
  $('#dynamicForm').validate({
    rules: {
      hstart: {
        required: true,
        number: true,
        min: 0,
        max: 350
      },
      hend: {
        required: true,
        number: true,
        min: 0,
        max: 350,
        minStrict: "#hstart"
      },
      vstart: {
        required: true,
        number: true,
        min: 0,
        max: 350
      },
      vend: {
        required: true,
        number: true,
        min: 0,
        max: 350,
        minStrict: "#vstart"
      }
    },
    messages: {
      hstart: {
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 350'
      },
      hend: {
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 350',
        minStrict: 'Input value must be greater than the starting value'
      },
      vstart: {
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 350'
      },
      vend: {
        number: 'Please use numbers only',
        min: 'Minimum value must be greater than 0',
        max: 'Maximum value cannot be greater than 350',
        minStrict: 'Input value must be greater than the starting value'
      }
    },
    submitHandler: function (e) {
      var vs = $('#vstart').val();
      var ve = $('#vend').val();
      var hs = $('#hstart').val();
      var he = $('#hend').val();

      doSomething(vs, ve, hs, he);
    }
  });
});