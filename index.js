let numberOfSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("displayColor");
let messageDisplay = document.querySelector("#message");
let heading = document.querySelector("#heading");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy"
        ? (numberOfSquares = 3)
        : (numberOfSquares = 6);
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    //loop through all the squares for giving them different colors
    squares[i].style.backgroundColor = colors[i];
    //add click listender to squares
    squares[i].addEventListener("click", function() {
      //grab color of cliked square
      let clickedColor = this.style.backgroundColor;

      //compare color to picked
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        changeColors(clickedColor);
        heading.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again ?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numberOfSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  heading.style.backgroundColor = "steelblue";
  resetButton.textContent = "New Color";
  messageDisplay.textContent = "";
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

resetButton.addEventListener("click", function() {
  reset();
});