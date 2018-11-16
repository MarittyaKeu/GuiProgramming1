var table = document.getElementById('table1');

function doSomething() {
  document.getElementById("table1").style.visibility = "visible";
    // get values from user inputs
    var hstart = document.getElementById('hstart').value;
    var hend = document.getElementById('hend').value;
    var vstart = document.getElementById('vstart').value;
    var vend = document.getElementById('vend').value;


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


    /*
    Validate to check if the the end value is greater than start value
    */
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


    /*
    Added a max number value restriction to 350
    */
    if (hend > 350) {
      document.getElementById("hend").style.border = "3px solid red";

    }

    if (vend > 350) {
      document.getElementById("vend").style.border = "3px solid red";
    }

    if(hend > 350 || vend > 350) {
      alert('Please enter a value less than 350');
      return;
    }



    /*
     build up header variable on the top to prepend to main table variable
    */
    var temp = "";
    var head = '<tr> <th class="firstth"></th>';
    for(var k= vstart; k <= vend; k++) {
      head += '<th class="thead">' + (k) + '</th>';
    }
    head += '</tr>';

    /*
    Dynamic multiplcation table
    the first loop populates the rows and the
    second for loop populates the columns
    */
    for(var i = hstart; i <= hend; i++) {
      var row = "<tr>" + '<th class="thead2">' + i + '</th>' ;
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


/*
Function "hides" the table element by changing display visibility
*/
function clearForm() {
  document.getElementById("table1").style.visibility = "hidden";
}
