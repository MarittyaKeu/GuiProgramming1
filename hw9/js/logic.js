/*
Marittya Keu
GUI Programming 1 Assignment 9

Description: JavaScript logic for Scrabble. Builds out the entire Scrabble board via tables
and adds extra classes to them base on tile score (double, triple, etc.). There are functions 
to calculate scores , rerack letters, etc.
*/
let putBack = false;
let firstTile = true;
let gameStart = false;
let value;
let objValue;
let letterID;
let adjacentTile = false;
let originalValue, originalId;
let draggableId;
let totalGameScore = 0;
let totalPlayScore = 0;
let multiplier = 0;

var letters = [];
//save the rack tile index to remove its child when swapping
var playedLetter = [];

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


$(function () {

    generateTable();
    function generateTable() {
        //create table and add id attribe 
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

    //input ASCII code , return Character
    function getLetter(i) {
        const a = 97;
        return String.fromCharCode(a + i);
    }

    function readJson(filePath) {
        $.getJSON(filePath, function (data) {
            console.log(data);
        });

    };

    var tileID = [];
    let uniqueNum = 0;
    var availableLetter = 100;

    //generate 7 letter and save to an array of objects
    function generateLetter() {
        let l = [];
        //logic for when are less than 7 letters left
        let p = (availableLetter >= (7 - letters.length)) ? 7 : letters.length + availableLetter;
        for (let i = letters.length; i < p; i++) {
            let randomIndex = getRandomIndex();
            //save the letter and its value
            let obj = {
                "letter": json.pieces[randomIndex].letter,
                "value": json.pieces[randomIndex].value
            };
            json.pieces[randomIndex].quantity--;
            letters.push(obj);
            availableLetter--;
        }
    }
    generateLetter();
    reRackLetter();

    //put the "7" letters in the array on the rack
    function reRackLetter() {
        let exist = false;

        //remove the tiles that is not played before getting new tiles
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
                revert: function (obj) {
                    if (putBack) {
                        return false;
                    }
                    if (gameStart) {
                        if (firstTile) {
                            firstTile = false;
                            $(this).draggable("disable");
                            $("#" + originalId).droppable("option", "disabled", true);
                            playedLetter.push($(this).attr("id"));
                            return false;
                        } else {
                            if (adjacentTile) {
                                playedLetter.push($(this).attr("id"));
                                return false;
                            } else {
                                if (originalValue === undefined) {
                                    $("#" + originalId).removeAttr("value");
                                } else {
                                    $("#" + originalId).attr("value", originalValue);
                                }
                                letters.push(objValue);
                                alert("Tile needs to be sequential.");
                                $("#play").attr("disabled", "disabled");
                                return true;
                            }
                        }
                    } else {
                        alert("Please start the game from the center star tile.");
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

    // when user want to change the their letter with the bag letter
    function swap() {
        for (let i = 0; i < letters.length; i++) {
            let l = letters[i].letter;
            let index = (l === "_") ? 26 : parseInt(l.charCodeAt(0)) - 65;
            json.pieces[index].quantity = json.pieces[index].quantity + 1;
            availableLetter++;
        }
        letters.length = 0;
        $("#availableLetter").text(availableLetter);
        generateLetter();
        reRackLetter();
        $(this).prop("disabled", true);
    }

    function getRandomIndex() {
        let index;
        do {
            index = parseInt(Math.random() * 37 % 27);
            if (availableLetter <= 7) {
                for (let i = 0; i < json.pieces.length; i++) {
                    if (json.pieces[i].quantity > 0) {
                        return i;
                    }
                }
            }
        } while (json.pieces[index].quantity <= 0);

        return index;
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


    // function checks if current word is vertical or horizontal and gets the most current word
    function getWords(id, words, orientation = true) {
        let bidn, fidn, bvalue, fvalue, la, lb, next, prev;
        next = prev = 1;
        bidn = fidn = id.slice(1);
        la = lb = id.slice(0, 1);
        do {
            if (orientation) {
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
                $(this).removeAttr("value");
                dropout = true;
            }
        },
        drop: function (event, ui) {
            let id = $(this).attr("id");
            let cls = $(this).attr("class");
            //check if the star tile is already used
            let star = $("#h7").attr("value");
            dropout = false;

            if (cls.slice(5, 16) === "letterStand") {
                putBack = true;
            } else {
                putBack = false;
            }

            if (id !== "h7" && star === undefined) {
                console.log(gameStart)
            } else {
                gameStart = true;
                originalValue = $("#" + id).attr("value");
                originalId = id;
                changeBlankTile(draggableId);
                $("#" + id).attr("value", value);
                checkDictoinary(id, value);
                calculatePlayScore(value, cls.slice(9, 11));
                
                let sindex;
                for (let i = 0; i < letters.length; i++) {
                    if (value === letters[i].letter) {
                        objValue = letters[i];
                        sindex = i;
                        break;
                    }
                }
                letters.splice(sindex, 1);
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
            let id = $(this).attr('id');
        },
        drop: function (event, ui) {
            let id = $(this).attr('id');
            let index = playedLetter.indexOf(id);
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
        //getting horizonal and veritcal words
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
                alphabet = prompt("Please enter letters only.");
                if (alphabet === null || alphabet === "") {} else {
                    if (alphabet.match(pattern)) {
                        alphabet = alphabet.toUpperCase();
                        index = alphabet.charCodeAt(0) - 65;
                        if (json.pieces[index].quantity <= 0) {
                            alert(alphabet + " ran out. Try a new letter.");
                        } else {
                            json.pieces[index].quantity--;
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


    $("#play").click(function () {
        let cls = $(this).attr("class");
        if (!gameStart || playedLetter.length <= 0) {
            alert("Place letter on the board to play");
        } else {
            multiplier = (multiplier === 0) ? 1 : multiplier;
            let currentScore = parseInt($("#score").text()) + totalPlayScore * multiplier;
            $("#score").text(currentScore);
            swap();
        }
    });

    function calculatePlayScore(value, cls) {
        //calculate the index of json
        let index = (value === "_") ? 26 : parseInt(value.charCodeAt(0)) - 65;

        //get the corresponding value from the json/bag 
        let playscore = parseInt(json.pieces[index].value);

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
})