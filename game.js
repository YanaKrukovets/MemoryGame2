
var activeColorButtons = new Array();
var activeColors = new Array();
var eventButtons = new Array();
var winner = false;
var timer;

function topNavIcon(event) {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
    if (event.target.id == "default") {
        x.className = "topnav";
    }
  }

function game() {
    window.clearTimeout(timer);
    eventButtons = [];
    activeColorButtons = [];
    activeColors = [];
    document.getElementById("sequence").innerHTML = "";
    play();
}

function play() {
    var color = getColor(),
        colorButton = document.getElementById(getButton(color));

    document.getElementById("turn").innerHTML = "Remember the sequence";
    activeColorButtons.push(colorButton);
    activeColors.push(color);
    animateButtons(0);
}

function animateButtons(i) {
    removeColor();
   
    if (i >= activeColorButtons.length) {
        startTimer();
        return;
    }
 
   activeColorButtons[i].addEventListener("webkitAnimationEnd", function() {
       animateButtons(i+1);  
    });
    
    activeColorButtons[i].classList.add(getClass(activeColors[i]));
}

function startTimer() {
    window.setTimeout(isWinner, 15000);
}

function isWinner() {
    if (!winner) {
        clearArrays();
    }
}

function clearArrays() {
    eventButtons = [];
    activeColorButtons = [];
    activeColors = [];
}

function changeOpacity(event) {
    document.getElementById("turn").innerHTML = "Your turn";
    event.target.classList.add("opac");
}

function removeOpacity(event) {
    event.target.classList.remove("opac");
}

function checkButton(event) {
    eventButtons.push(event.target);

    var eventLength = eventButtons.length,
        colorButtonsLength = activeColorButtons.length,
        turn = document.getElementById("turn"),
        sequence = document.getElementById("sequence");

    if (eventButtons[eventLength - 1] != activeColorButtons[eventLength - 1] && colorButtonsLength != eventLength) {
        turn.innerHTML = "Try again";
        sequence.innerHTML = "You remember " + (colorButtonsLength - 1) + " sequences";
        window.clearTimeout(timer);
        clearArrays();
        return;
    }
    if (colorButtonsLength == eventLength) {
        winner = activeColorButtons.every(function(element, index) {
            return element === eventButtons[index]; 
        });
        if (winner) {
            turn.innerHTML = "Good Job";
            window.clearTimeout(timer);
            eventButtons = [];
            window.setTimeout(play, 700);
        } else {
            turn.innerHTML = "Try again";
            sequence.innerHTML = "You remember " + (colorButtonsLength - 1) + " sequences";
            window.clearTimeout(timer);
            clearArrays();
        }    
    }
}

function getColorNumber() {
    return Math.floor(Math.random() * 4);
}

function getColor() {
    var buttons = ["green", "red", "blue", "yellow"];
    var number = getColorNumber();
    var button = buttons[number];
    
    if (button == activeColors[activeColors.length - 1]) {
        if (number < buttons.length - 1) {
            button = buttons[number + 1];
        } else {
            button = buttons[number - 1];
        }
    }

    return button;
}

function getButton(color) {
    return color + "-btn";
}

function getClass(color) {
    return "shine-" + color;
}

function removeColor() {
    var buttons = ["green", "red", "blue", "yellow"],
        classL, className;

    for (let i in buttons) {
        classL = document.getElementById(getButton(buttons[i])).classList;
        className = getClass(buttons[i]);

        if (classL.contains(className)) {
            classL.remove(className);    
        }
    }
}