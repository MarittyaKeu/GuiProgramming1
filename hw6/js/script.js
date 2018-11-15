

var table = document.getElementById('table1');


function doSomething() {
    // get values from user inputs
    var hstart = document.getElementById('hstart').value;
    var hend = document.getElementById('hend').value;
    var vstart = document.getElementById('vstart').value;
    var vend = document.getElementById('vend').value;

    if (hend < hstart) {
      document.getElementById("hend").style.border = "3px solid red";
      alert("Horizontal end must be a greater value than start.")
      return;
    }

    if (vend < vstart) {
      document.getElementById("vend").style.border = "3px solid red";
      alert("Vertical end must be a greater value than start.")
      return;
    }

    // highlight input border red if any input field is empty
    if (vstart == "" ) {
      document.getElementById("vstart").style.border = "3px solid red";
    }

    if (vend == "" ) {
      document.getElementById("vend").style.border = "3px solid red";
    }

    if (hstart == "" ) {
      document.getElementById("hstart").style.border = "3px solid red";
    }

    if (hend == "" ) {
      document.getElementById("hend").style.border = "3px solid red";
    }

    // alerts user of empty fields
    if(vstart == "" || vend == "" || hend == "" || hstart == "") {
      alert("Please do not leave fields empty");
      return;
    }

    // validate inputs for numbers only
    if (isNaN(vstart) || isNaN(vend) || isNaN(hend) || isNaN(hstart)) {
      alert('Please insert valid numbers only.');
      return;
    }



    if (vstart )
    // build up header variable on the top
    // to prepend to main table variable
    var temp = "";
    var head = '<tr> <th></th>';
    for(var k= vstart; k <= vend; k++) {
      head += '<th>' + (k) + '</th>';
    }
    head += '</tr>';

    // dynamic multiplication table
    // first for loop is to populate row
    // second for loop is to populate column
    // build up a variable to create the tables, row, and column
    for(var i = hstart; i <= hend; i++) {
      var row = "<tr>" + '<th>' + i + '</th>' ;
      for(var j = vstart; j <= vend; j++) {
        row +=  '<td>' + (i * j) + '</td>';
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
  document.getElementById("hend").style.border = null;
  document.getElementById("hstart").style.border = null;
  document.getElementById("vstart").style.border = null;
  document.getElementById("vend").style.border = null;

}
