"use strict";

function createNumbersArray(count) {
  const nums = [];
  let num = 1;
  while (count-- > 0) {
    nums.push(num);
    nums.push(num++);
  }

  return nums;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
}

function setDifficulty(count) {
  let difficulty = "easy";
  switch (count) {
    case 12:
      difficulty = "mid";
      break;
    case 24:
      difficulty = "hard";
  }
  return difficulty;
}

function startGame(count = 8) {
  cleanField();
  const game = document.getElementById("game");
  game.classList.add(setDifficulty(count));
  const nums = shuffle(createNumbersArray(count));
  for (let index = 0; index < nums.length; index++) {
    const cardNumber = document.createElement("p");
    cardNumber.textContent = nums[index];
    cardNumber.classList.add("card__number");
    const card = document.createElement("div");
    card.classList.add("card");
    card.append(cardNumber);
    game.append(card);
  }
}

function cleanField() {
  document.getElementById("game");
  game.innerHTML = "";
  game.classList.remove("easy");
  game.classList.remove("mid");
  game.classList.remove("hard");
}

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    startGame();
  });
})();
