// Initialize score count in sessionStorage
if (!sessionStorage.getItem('playerScore')) {
    sessionStorage.setItem('playerScore', '0');
}
if (!sessionStorage.getItem('computerScore')) {
    sessionStorage.setItem('computerScore', '0');
}

// Display score values on the top
const computerScoreElement = document.getElementById('computerScore');
const playerScoreElement = document.getElementById('playerScore');
computerScoreElement.textContent = sessionStorage.getItem('computerScore');
playerScoreElement.textContent = sessionStorage.getItem('playerScore');

const buttons = document.getElementById('Btns');
buttons.addEventListener('mouseup', startRound);

function startRound(e) {
    // randomly creates a string ('rock', 'scissors', or 'paper')
    const computerChoice = getComputerChoice();
    // gets clicked btn's data-hand value ('rock', 'scissors', or 'paper')
    const playerChoice = e.target.getAttribute('data-hand');

    const computerHand = document.getElementById('computerHand');
    const playerHand = document.getElementById('playerHand');

    // hide buttons after click
    buttons.style['display'] = 'none';

    function animateSwap() {
        computerHand.setAttribute('src', './static/img/ai-arm/ai-arm-down.png');
        playerHand.setAttribute('src', './static/img/human-arm/human-arm-down.png');

        setTimeout(() => {
            computerHand.setAttribute('src', './static/img/ai-arm/ai-arm-up.png');
            playerHand.setAttribute('src', './static/img/human-arm/human-arm-up.png');
        }, 200);
    }

    function repeatAnimation(totalRepetitions, interval) {
        let repetitions = 0;

        function runAnimation() {
            animateSwap();
            repetitions++;

            if (repetitions < totalRepetitions) {
                setTimeout(runAnimation, interval);
            }
        }
        runAnimation();
    }

    repeatAnimation(3, 600);

    setTimeout(() => {
        computerHand.setAttribute(
            'src',
            `./static/img/ai-arm/ai-arm-${computerChoice}.png`
        );
        playerHand.setAttribute(
            'src',
            `./static/img/human-arm/human-arm-${playerChoice}.png`
        );
    }, 1500);

    setTimeout(() => {
        setRoundResult(computerChoice, playerChoice);
    }, 2000);
}

function setRoundResult(computerChoice, playerChoice) {
    const resultTextContainer = document.querySelector('.resultBox');
    // initially container's display: none
    resultTextContainer.style['display'] = 'flex';
    let resultTextTitle = resultTextContainer.firstElementChild;

    switch (true) {
        case computerChoice === playerChoice:
            resultTextTitle.textContent = 'DRAW!';
            break;
        case playerChoice === 'rock' && computerChoice === 'scissors':
        case playerChoice === 'paper' && computerChoice === 'rock':
        case playerChoice === 'scissors' && computerChoice === 'paper':
            let currentPlayerScore = sessionStorage.getItem('playerScore');
            currentPlayerScore = parseInt(currentPlayerScore) + 1;
            sessionStorage.setItem('playerScore', `${currentPlayerScore}`);
            resultTextTitle.textContent = 'YOU WIN!';

            if (currentPlayerScore >= 5) {
                gameResult('GAME WON!');
            }
            break;
        case computerChoice === 'rock' && playerChoice === 'scissors':
        case computerChoice === 'paper' && playerChoice === 'rock':
        case computerChoice === 'scissors' && playerChoice === 'paper':
            let currentComputerScore = sessionStorage.getItem('computerScore');
            currentComputerScore = parseInt(currentComputerScore) + 1;
            sessionStorage.setItem('computerScore', `${currentComputerScore}`);
            resultTextTitle.textContent = 'YOU LOSE!';

            if (currentComputerScore >= 5) {
                gameResult('GAME OVER!');
            }
            break;
        default:
            return 'Something went wrong';
    }
}

// returns randomly 'rock', 'paper', or 'scissors' string.
function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;

    switch (randomChoice) {
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
        default:
            console.warn('Something went wrong!');
    }
}

const gameResult = (message) => {
    let resultTitle = document.querySelector('.resultTitle');
    resultTitle.textContent = message;
    sessionStorage.clear();
    nextRoundButton.style.display = 'none';
};

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
});

const nextRoundButton = document.getElementById('nextRoundButton');
nextRoundButton.addEventListener('click', () => {
    location.reload();
});
