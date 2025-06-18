const easyBtn = document.getElementById('easy-btn');
const main = document.getElementById('main');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const title = document.getElementById('title');
const showCount = document.getElementById('count');

let flippedCards = [];
let canFlip = true;
let count = 0;
let totalPairs = 0;
let totalCards = 0;

let cardEasy = ['🍎','🍎','🍐','🍐','🍊','🍊','🍋‍🟩','🍋‍🟩',
                 '🍌','🍌','🍉','🍉','🍇','🍇','🍓','🍓',]
let cardMedium = ['🍎','🍎','🍐','🍐','🍊','🍊','🍋‍🟩','🍋‍🟩',
                 '🍌','🍌','🍉','🍉','🍇','🍇','🍓','🍓',
                 '🫐','🫐','🍈','🍈','🍒','🍒','🍑','🍑',
                 '🥭','🥭','🍍','🍍','🥥','🥥','🥝','🥝',
                 '🍅','🍅','🍆','🍆']
let cardHard = ['🍎','🍎','🍐','🍐','🍊','🍊','🍋‍🟩','🍋‍🟩',
                 '🍌','🍌','🍉','🍉','🍇','🍇','🍓','🍓',
                 '🫐','🫐','🍈','🍈','🍒','🍒','🍑','🍑',
                 '🥭','🥭','🍍','🍍','🥥','🥥','🥝','🥝',
                 '🍅','🍅','🍆','🍆','🥑','🥑','🥦','🥦',
                 '🫛','🫛','🥬','🥬','🥒','🥒','🌶','🌶',
                 '🫑','🫑','🌽','🌽','🥕','🥕','🫒','🫒',
                 '🧄','🧄','🫚','🫚','🥐','🥐','🥖','🥖',]

function shuffle(array) { //Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function generateCardEasy(){
  levelSelected = "easy";
  count = 20;
  totalPairs = 8; // 4x4 grid
  totalCards = 16;
  showCount.innerHTML = `Count: ${count}`
  levelEasy();

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  easyBtn.style.display ="none";
  mediumBtn.style.display ="none";
  hardBtn.style.display ="none";
  title.style.display = "none";

}
function generateCardMedium(){
  levelSelected = "medium";
  count = 45;
  totalPairs = 8;
  showCount.innerHTML = `Count: ${count}`
  levelMedium();

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  easyBtn.style.display ="none";
  mediumBtn.style.display ="none";
  hardBtn.style.display ="none";
  title.style.display = "none";

}
function generateCardHard(){
  levelSelected = "hard";
  totalPairs = 16; // 8x8 grid
  count = 78;
  showCount.innerHTML = `Count: ${count}`
  levelHard();

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });

  easyBtn.style.display ="none";
  mediumBtn.style.display ="none";
  hardBtn.style.display ="none";
  title.style.display = "none";

}

function flipCard(){

  if (this.classList.contains('flipped')) return;
  if (!canFlip || flippedCards.length >= 2) return;

  const backElement = this.querySelector('.back');
  const frontElement = this.querySelector('.front');

  backElement.style.display = "flex";
  frontElement.style.display = "none";

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkMatch, 1000);
    }

}
function checkMatch(){

  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector('.back').dataset.value;
  const value2 = card2.querySelector('.back').dataset.value;

  if (value1 === value2) {
    flippedCards = [];
    totalPairs--;
    console.log(totalPairs);
    if (totalPairs <= 0){
      main.style.display = 'flex';
      showCount.style.display = "none";
      main.innerHTML = `<div class="message-div">
                          <p class="message">You Win</p>
                          <div class="option">
                            <p class="restart" onclick="restartGame();">Restart</p>
                            <p class="menu" onclick="location.reload();">Main Menu</p>
                          </div> 
                        </div>`
    }
  } else { 
    flippedCards.forEach(card => {

    card.classList.remove('flipped');

    const backElement = card.querySelector('.back');
    const frontElement = card.querySelector('.front');

    backElement.style.display = "none";
    frontElement.style.display = "flex";
    });
    flippedCards = [];
    
    count--;

    showCount.innerHTML = `Count: ${count}`

    if (count <= 0){
      main.style.display = 'flex';
      showCount.style.display = "none";
      main.innerHTML =  `<div class="message-div">
                          <p class="message">You Lose</p>
                          <div class="option">
                            <p class="restart" onclick="restartGame();">Restart</p>
                            <p class="menu" onclick="location.reload();">Main Menu</p>
                          </div>  
                        </div>`
    
    }
  }  
  canFlip = true;
}

function levelEasy(){
  cardEasy = shuffle(cardEasy);
  console.log(cardEasy)
  main.classList.add('easy');
  for (let card in cardEasy){
    main.innerHTML += `<div class="card">
                        <div class="front"></div>
                        <div data-value="${cardEasy[card]}" class="back">${cardEasy[card]}</div>
                      </div>`;
  }
}
function levelMedium(){
  cardMedium = shuffle(cardMedium);
  main.classList.add('medium');
  for (let card in cardMedium){
    main.innerHTML += `<div class="card">
                        <div class="front"></div>
                        <div data-value="${cardMedium[card]}" class="back">${cardMedium[card]}</div>
                      </div>`;
  }
}
function levelHard(){
  cardHard = shuffle(cardHard);
  main.classList.add('hard');
  for (let card in cardHard){
    main.innerHTML += `<div class="card">
                        <div class="front"></div>
                        <div data-value="${cardHard[card]}" class="back">${cardHard[card]}</div>
                      </div>`;
  }
}
function restartGame(){
  const messageDiv = document.querySelector('.message-div')
  if (levelSelected === "easy") {
    messageDiv.style.display = "none";
    showCount.style.display = "";
    main.style.display = 'grid';
    levelSelected = "";
    generateCardEasy();}
  if (levelSelected === "medium") {
    messageDiv.style.display = "none";
    showCount.style.display = "";
    main.style.display = 'grid';
    levelSelected = "";
    generateCardMedium();}
  if (levelSelected === "hard") {
    messageDiv.style.display = "none";
    showCount.style.display = "";
    main.style.display = 'grid';
    levelSelected = "";
    generateCardHard();}
}
easyBtn.addEventListener("click", generateCardEasy);
mediumBtn.addEventListener("click", generateCardMedium);
hardBtn.addEventListener("click", generateCardHard);
