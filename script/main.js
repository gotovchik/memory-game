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

function createCard(nums, index) {
  const cardNumber = document.createElement("p");
  cardNumber.textContent = nums[index];
  cardNumber.classList.add("card__number");
  const card = document.createElement("div");
  const cardFront = document.createElement("div");
  const cardBack = document.createElement("div");
  const cardQuestion = document.createElement("p");
  cardQuestion.textContent = "?";
  card.classList.add("card");
  card.id = nums[index];
  cardFront.classList.add("card__front");
  cardQuestion.classList.add("card__question");
  cardFront.append(cardQuestion);
  cardBack.classList.add("card__back");
  cardBack.append(cardNumber);
  card.append(cardFront);
  card.append(cardBack);
  card.classList.add("flip");
  return card;
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

function cleanField() {
  document.getElementById("game");
  game.innerHTML = "";
  game.classList.remove("easy");
  game.classList.remove("mid");
  game.classList.remove("hard");
  game.classList.remove("game__result");
}

function startGame(count = 8) {
  let firstCard = null;
  let secondCard = null;
  let clickable = false;

  cleanField();
  const game = document.getElementById("game");
  game.classList.add(setDifficulty(count));
  const nums = shuffle(createNumbersArray(count));
  for (let index = 0; index < nums.length; index++) {
    const card = createCard(nums, index);
    game.append(card);
    setTimeout(() => {
      card.classList.remove("flip");
      clickable = true;
    }, 5000);
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (clickable && !card.classList.contains("success")) {
        card.classList.add("flip");
        if (firstCard === null) {
          firstCard = index;
        } else {
          if (index != firstCard) {
            secondCard = index;
            clickable = false;
          }
        }

        if (
          firstCard !== null &&
          secondCard !== null &&
          firstCard !== secondCard
        ) {
          if (cards[firstCard].id === cards[secondCard].id) {
            setTimeout(() => {
              cards[firstCard].classList.add("success");
              cards[secondCard].classList.add("success");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          } else {
            setTimeout(() => {
              cards[firstCard].classList.remove("flip");
              cards[secondCard].classList.remove("flip");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          }
        }
        if (
          Array.from(cards).every((card) => card.className.includes("flip"))
        ) {
          setTimeout(() => {
            cleanField();
            const congrat = document.createElement("p");
            congrat.textContent =
              "Поздравляю! Вы выиграли!\n Хотите заново? Выберите сложность.";
            congrat.classList.add("game__congratulations");
            game.classList.add("game__result");
            game.append(congrat);
          }, 2000);
        }
      }
    });
  });
}

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    startGame();
  });
})();
