/* 
    Marittya Keu
    GUI Programming 1
    Homework 9
    File: script.css
*/

let putBack = false; 
let firstTile = true;
let gameStart = false; 
let value; 
let draggableId; 
let objValue; 
let letterID; 
let adjacentTile = false;
let originalValue, originalId; 
let originalDropOutID; 
let totalGameScore = 0; 
let totalPlayScore = 0; 
let multiplier = 0; 
let revert = false; 


let json = (function () { 
    var json = null;
    $.ajax({
        'async': false,
        'url': "js/pieces.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var letters = [];
var playedLetter = []; 

$(document).ready(function () {


    generateTable();

    function getWords(id, words, orentation = true) { 
        let bidn, fidn, bvalue, fvalue, la, lb, next, prev;
        next = prev = 1;
        bidn = fidn = id.slice(1);
        la = lb = id.slice(0, 1);
        do {
            if (orentation) { 
                bidn = parseInt(bidn) - prev;
                fidn = parseInt(fidn) + next;
            } else { 
                la = String.fromCharCode(parseInt(la.charCodeAt(0)) - prev);
                lb = String.fromCharCode(parseInt(lb.charCodeAt(0)) + next);
            }
            bvalue = $("#" + la + bidn).attr("value");
            fvalue = $("#" + lb + fidn).attr("value");
            if (bvalue !== undefined) {
                words = bvalue + words;
            } else {
                prev = 0;
            }
            if (fvalue !== undefined) {
                words = words + fvalue;
            } else {
                next = 0;
            }
        } while (bvalue !== undefined || fvalue !== undefined);
        return words;
    }


    let dropout = false;
    $(".snap").droppable({ 

        out: function () {
            if (!dropout) { 
                originalValue = $(this).attr("value");
                originalDropOutID = $(this).attr("id");
                $(this).removeAttr("value");
                dropout = true;
            }

        },
        drop: function (event, ui) {
            let id = $(this).attr("id");
            let cls = $(this).attr("class");
            let star = $("#h7").attr("value"); 
            dropout = false;

            if (cls.slice(5, 16) === "letterStand") {
                putBack = true;
            } else {
                putBack = false;
            }

            if (id !== "h7" && star === undefined) {
            } else {
                if (($(this).attr("value")) !== undefined) {
                    revert = true;
                    $("#" + originalDropOutID).attr("value", originalValue);
                } else {

                    gameStart = true;
                    let sindex;  
                    for (let i = 0; i < letters.length; i++) {
                        if (value === letters[i].letter) {
                            objValue = letters[i];  
                            sindex = i;
                            break;
                        }
                    }
                    letters.splice(sindex, 1); 
                    originalId = id;
                    changeBlankTile(draggableId);
                    $(this).attr("value", value); 
                    checkDictoinary(id, value);  
                    calculatePlayScore(value, cls.slice(9, 11));  
                }
            }

            ui.draggable.position({  
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 20, "linear");
                }
            })

        }
    })

    $(".snapRack").droppable({
        out: function () {
        },
        drop: function (event, ui) {
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 20, "linear");
                }
            })
        }
    })

    function checkDictoinary(id, value) {
        let hw = getWords(id, value); 
        let vw = getWords(id, value, false); 

        if (hw.length > 1 || vw.length > 1) {
            adjacentTile = true; 
        } else {
            adjacentTile = false;
        }
    }

    function changeBlankTile(id) { 
        if (value === "_") {
            let alphabet;
            let pattern = /^[a-zA-Z]/g; 
            let index;

            let valid = false;
            do {
                alphabet = prompt("Please enter letters only");
                if (alphabet === null || alphabet === "") {} else {
                    if (alphabet.match(pattern)) {
                        alphabet = alphabet.toUpperCase();
                        for (let i = 0; i < json.pieces.length; i++) {
                            if (alphabet === json.pieces[i].letter) {
                                index = i;
                                break;
                            }
                        }
                        if (index === undefined) { 
                            alert( alphabet + " ran out. Try another letter.");
                        } else {
                            json.pieces[index].quantity--
                            if (json.pieces[index].quantity === 0) {
                                json.pieces.splice(index, 1);
                            }


                            let image = "url('images/" + alphabet + ".jpg')";
                            value = alphabet;
                            $("#" + id).css("background-image", image); 
                            $("#" + id).attr("value", alphabet);
                            $("#" + originalId).attr("value", alphabet);
                            valid = true;
                        }
                    }
                }
            } while (valid === false);
        }
    }


    function calculatePlayScore(value, cls) {
        let index = (value === "_") ? 26 : parseInt(value.charCodeAt(0)) - 65;
        let playscore = parseInt(json.value[index].value);

        if (cls === "tl") {
            playscore *= 3;
        } else if (cls === "dl") {
            playscore *= 2;
        }
        totalPlayScore += playscore;

        if (cls === "tw") {
            multiplier += 3;
        } else if (cls === "dw") {
            multiplier += 2;
        }
        totalGameScore += totalPlayScore;
    }

    function generateTable() {

        let table = $("<table>").attr("id", "gtable");
        let tbody = $("<tbody>");

        for (let i = 0; i < 15; i++) {
            let tr = $("<tr>");
            for (j = 0; j < 15; j++) {
                let td = $("<td>");
                td.addClass("gth snap").text("");
                td.attr("id", getLetter(i) + j);
                setBoardClass(i, j, td);
                tr.append(td);
            }
            tbody.append(tr);
        }
        table.append(tbody);
        $("#table").append(table);
    }


    function getLetter(i) {
        const a = 97;
        return String.fromCharCode(a + i);
    }

    function getLetterPosition(l) { 
        for (let i = 0; i < json.pieces.length; i++) {
            if (l === json.pieces[i].letter) {
                return i;
            }
        }
        return undefined;
    }


    function readJson(filePath) {  
        $.getJSON(filePath, function (data) {
            console.log(data);
        });

    }; 


    var tileID = [];
    let uniqueNum = 0;

    var availableLetter = 100;  

    function generateLetter() { 
        let p = (availableLetter >= (7 - letters.length)) ? 7 : letters.length + availableLetter; 
        for (let i = letters.length; i < p; i++) {

            let randomIndex = getRandomIndex();
            let letter = (json.pieces[randomIndex].letter).toUpperCase();
            let valueIndex = (letter === "_") ? 26 : parseInt(letter.charCodeAt(0)) - 65;
            let obj = { 
                "letter": letter,
                "value": json.value[valueIndex].value
            };
            json.pieces[randomIndex].quantity--;  
            letters.push(obj);
            availableLetter--; 
            if (json.pieces[randomIndex].quantity <= 0) {
                json.pieces.splice(randomIndex, 1); 
            }
        }
    }
    generateLetter(); 
    reRackLetter(); 


    function reRackLetter() { 
        let exist = false;
        for (let i = 0; i < tileID.length; i++) { 
            let id = tileID[i];
            exist = false;
            for (let j = 0; j < playedLetter.length; j++) {
                if (id === playedLetter[j]) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                $("#" + id).remove();
            }
        }
        playedLetter.length = 0;
        tileID.length = 0;

        for (let i = 0; i < letters.length; i++) {
            let image = "url('images/" + letters[i].letter + ".jpg')";
            let tiles = $("<div>").addClass("tiles");

            let id = "#" + getLetter(i);
            tiles.css("background-image", image);
            tiles.attr("value", letters[i].letter);
            tiles.attr("id", "tile" + uniqueNum);
            tileID.push("tile" + uniqueNum);
            uniqueNum++;

            $(tiles).appendTo(id).draggable({
                snap: ".snap",
                snapMode: "inner",
                revert: function (event, ui) {
                    if (putBack) {
                        return false; 
                    }
                    if (gameStart) { 
                        if (firstTile) {
                            firstTile = false;
                            $(this).draggable("disable");
                            playedLetter.push($(this).attr("id"));
                            return false; 
                        } else {
                            if (revert) { 
                                revert = false;
                                return true;
                            }
                            if (adjacentTile) {
                                playedLetter.push($(this).attr("id"));
                                return false;
                            } else {
                                $("#" + originalId).removeAttr("value");
                                $("#" + originalDropOutID).attr("value", originalValue);
                                letters.push(objValue); 
                                alert("need to be in straight line . revert first 1");
                                $("#play").attr("disabled", "disabled");
                                return true; 
                            }
                        }
                    } else {
                        alert("Please start the game from the star tile ");

                        return true;
                    }
                },
                drag: function () {
                    draggableId = $(this).attr("id");  
                    value = $(this).attr("value");  
                }

            });
        }
    }


    $("#play").click(function () {
        console.log(playedLetter);
        if (!gameStart || playedLetter.length <= 0) {
            alert("Please place letter on the board to play");
        } else {
            multiplier = (multiplier === 0) ? 1 : multiplier;
            let currentScore = parseInt($("#score").text()) + totalPlayScore * multiplier;
            $("#score").text(currentScore);
            for (let i = 0; i < playedLetter.length; i++) {
                $("#" + playedLetter[i]).draggable("disable");
            }
            swap();
        }
    });

    function swap() {
        for (let i = 0; i < letters.length; i++) {
            let l = letters[i].letter;
            let index = getLetterPosition(l);
            if (index === undefined) {
                let obj = {
                    "letter": l,
                    "quantity": 1
                }
                json.pieces.push(obj);
            } else {
                json.pieces[index].quantity = json.pieces[index].quantity + 1; 
            }
            availableLetter++;
        }
        letters.length = 0;
        $("#availableLetter").text(availableLetter);
        generateLetter();
        reRackLetter();
        $(this).prop("disabled", true);
    }

    function getRandomIndex() {
        return parseInt(Math.random() * 37 % json.pieces.length);
    }


    function setBoardClass(i, j, td) {
        switch (i) {
            case 0:
            case 14:
                if (j === 0 || j === 7 || j === 14) {
                    td.addClass("tw");
                } else if (j === 3 || j === 11) {
                    td.addClass("dl");
                }
                break;
            case 1:
            case 13:
                if (j === 1 || j === 13) {
                    td.addClass("dw");
                } else if (j === 5 || j === 9) {
                    td.addClass("tl");
                }
                break;
            case 2:
            case 12:
                if (j === 2 || j === 12) {
                    td.addClass("dw");
                } else if (j === 6 || j === 8) {
                    td.addClass("dl");
                }
                break;
            case 3:
            case 11:
                if (j === 0 || j === 7 || j === 14) {
                    td.addClass("dl");
                } else if (j === 3 || j === 11) {
                    td.addClass("dw");
                }
                break;
            case 4:
            case 10:
                if (j === 4 || j === 10) {
                    td.addClass("dw");
                }
                break;
            case 5:
            case 9:
                if (j === 1 || j === 5 || j === 9 || j === 13) {
                    td.addClass("tl");
                }
                break;
            case 6:
            case 8:
                if (j === 2 || j === 6 || j === 8 || j === 12) {
                    td.addClass("dl");
                }
                break;
            default:
                if (j === 0 || j === 14) {
                    td.addClass("tw");
                } else if (j === 3 || j === 11) {
                    td.addClass("dl");
                } else if (j === 7) {
                    td.addClass("star");
                }
        }
    }
});