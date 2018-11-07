// ADD NEW ITEM TO END OF LIST
var node = document.createElement('li');
var textNode = document.createTextNode('cream');
node.appendChild(textNode);

document.getElementById('page').appendChild(node);



// ADD NEW ITEM START OF LIST
var firstitem = document.createElement('li');
var firstText = document.createTextNode('kale');
firstitem.appendChild(firstText);

var list = document.getElementById('page');
list.insertBefore(firstitem, list.childNodes[4]);



// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listelement = document.querySelectorAll('li');

// traverse list elements and change class name to cool
for(var i = 0; i < listelement.length; i++) {
    listelement[i].className += 'cool';
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var head = document.querySelector('h2')

var heading = head.firstChild.nodeValue;

head.innerHTML =  heading + '<span>' + listelement.length + '</span>';


