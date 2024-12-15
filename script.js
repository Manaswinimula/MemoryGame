const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let time = 0;
let gameInterval;

// Card values (you can customize this)
const cardValues = ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍓', '🍓', '🍉', '🍉', '🍍', '🍍', '🍓', '🍓', '🍋', '🍋'];

// Shuffle the card values
function shuffle(array) {
  let currentIndex = array.length, randomIndex, temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Start the game by generating the cards
function startGame() {
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `<i>${value}</i>`;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  // Start the timer
  gameInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = time;
  }, 1000);
}

// Flip a card when clicked
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    score++;
    scoreDisplay.textContent = score;
    matchedPairs++;
    if (matchedPairs === cardValues.length / 2) {
      clearInterval(gameInterval);
      alert('You win! Game Over.');
    }
  } else {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  }

  flippedCards = [];
}

// Initialize the game when the page loads
startGame();