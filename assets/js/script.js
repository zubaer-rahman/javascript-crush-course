function getAge(dateString) {
    var today = new Date();
    var DOB = new Date(dateString);
    var totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
    totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
    var years = today.getFullYear() - DOB.getFullYear();
    if (DOB.getMonth() > today.getMonth())
        years = years - 1;
    else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate())
            years = years - 1;

    var days;
    var months;

    if (DOB.getDate() > today.getDate()) {
        months = (totalMonths % 12);
        if (months == 0)
            months = 11;
        var x = today.getMonth();
        switch (x) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                var a = DOB.getDate() - today.getDate();
                days = 31 - a;
                break;
            }
            default: {
                var a = DOB.getDate() - today.getDate();
                days = 30 - a;
                break;
            }
        }

    }
    else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth())
            months = (totalMonths % 12);
        else
            months = (totalMonths % 12) + 1;
    }
    var age = years + ' years ' + months + ' months ' + days + ' days';
    return age;
}

function ageInDays () {
    document.getElementById("flex-box-result").innerHTML= '';
    let dob = prompt("What's your date of birth [yyyy/mm/dd] good friend?");
    
    let regexVar = new RegExp("([0-9]{4})\/([0-9]{2})\/([0-9]{2})");

    let opera = dob.split('/');
 
    let dd = parseInt(opera[2]);
    let mm  = parseInt(opera[1]);
    let yy = parseInt(opera[0]);

    if (yy == 0000 || (mm == 00 || mm > 12) || (dd == 00 || dd > 31)) {
        alert("Invalid DOB input!");
    }
    else if (regexVar.test(dob)) {
        let age = getAge(dob);
        let h1 = document.createElement("h1");
        let textAnswer = document.createTextNode(`You are ${age} days old!`)
        h1.setAttribute('id', 'ageInDays');
        h1.appendChild(textAnswer);
        document.getElementById("flex-box-result").appendChild(h1);

    }else alert("Enter valid DOB following the pattern yyyy/mm/dd");

}

function reset () {
     document.getElementById("ageInDays").remove();
}

const generateCat = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(data => showCat(data[0].url))
    .catch(err => console.log(err)) 
}

const showCat = (cat) => {
    document.getElementById("flex-cat-gen").innerHTML = '';
    let image = document.createElement("img");
    let div = document.getElementById("flex-cat-gen");
    image.src = cat;
    div.appendChild(image);
}

//Challenge3: Rock, Paper, Scissors
const rpsGame = (yourChoice) => {
   // console.log(yourChoice.id);
   let humanChoice, botChoice;
   humanChoice = yourChoice.id;

   botChoice = numToChoice(randToRpsInt());
   console.log("computerChoice", botChoice.id);

   let result = decideWinner(humanChoice, botChoice);
   console.log(result);

   let message = finalMessage(result);
   console.log(message);

   rpsFrontEnd(humanChoice, botChoice, message);


}

const randToRpsInt = () => {
    return Math.floor(Math.random() * 3);
}

const numToChoice = (num) => {
    return ['rock' , 'paper', 'scissor'] [num];
}

const decideWinner = (yourChoice, computerChoice) => {
    let rpsDatabase = {
        rock:{'rock': 0.5, 'paper': 0, 'scissor': 1},
        paper:{'rock': 1, 'paper': 0.5, 'scissor': 0},
        scissor:{'rock': 0, 'paper': 1, 'scissor': 0.5},
    }
    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
} 

const finalMessage = ([yourScore, computerScore]) => {
    console.log(yourScore);
    return yourScore === 0? {'message':'You lost!', 'color':'red'} :
           yourScore === 0.5? {'message':'You tied!', 'color':'yellow'} : {'message':'You won!', 'color':'green'}

}

const rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) => {
    let imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src = '" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 235, 1)'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src = '" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
//Challenge4: change the color of all buttons
const allButtons = document.getElementsByTagName('button');

const copyAllButtons = [];
for(let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1])
}

const buttonColorChange = (thingy) => {
    return thingy.value === 'Red'? buttonsRed() :
           thingy.value === 'Green'? buttonsGreen() :
           thingy.value === 'Random'? buttonsRandom() : buttonsColorReset();
}

const buttonsRed = () => {
    for(let i=0; i<allButtons.length; i++){
         allButtons[i].classList.remove(allButtons[i].classList[1]);
         allButtons[i].classList.add('btn-danger');
    }
}

const buttonsGreen = () => {
    for(let i=0; i<allButtons.length; i++){
         allButtons[i].classList.remove(allButtons[i].classList[1]);
         allButtons[i].classList.add('btn-success');
    }
}

const buttonsColorReset = () => {
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
   }

}

const buttonsRandom = () => {
    const choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for(let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[Math.floor(Math.random()*4)]);
   }
}

//challenge4: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7':7 , '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('assets/sounds/swish.m4a');
const winSound = new Audio('assets/sounds/cash.mp3');
const lossSound = new Audio('assets/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card = randomCard();
        updateScore(card, YOU);
        showCard(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

const randomCard = () => {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

const showCard = (card, activePlayer) => {
    if (activePlayer['score'] <= 21 ) {
        let cardImage = document.createElement('img');
        cardImage.src = `assets/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

const showScore = (activePlayer) => {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

const updateScore = (card, activePlayer) => {
    if (card === 'A') {
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else  activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }    
    else activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(let i=0; i<yourImages.length; i++) {
            yourImages[i].remove();
        }
    
        for(let i=0; i<dealerImages.length; i++) {
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
    
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = false;
    }
}
let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        updateScore(card, DEALER);
        showCard(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

// compute winner and return who just won

function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        //condition: higher score then dealer or when dealer busts but you're 21
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins'] ++ ;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses'] ++ ;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws'] ++ ;
        }

    // condition: when user busts but dealer doesn't 
    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        blackjackGame['losses'] ++ ;
        winner = DEALER;

    //condition: when you AND the dealer are busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws'] ++ ;
    }
    
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    if(blackjackGame['turnsOver'] === true) {
        let message, messageColor;

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
    
        } else if (winner ===DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
    
    
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You drew!";
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}