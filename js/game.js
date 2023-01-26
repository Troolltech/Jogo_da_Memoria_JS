const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanTime = document.querySelector('.timer');

const lisdCardImage = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
    'jessica2',
    'meeseeks2'

];

let firtsCard = '';
let secundCard = '';

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

function ckeckEndGame(){
    const disabledCards = document.querySelectorAll('.disabled-card');

    
    setTimeout(() => {
        if(disabledCards.length == 24){
            alert(`Parebens ${localStorage.getItem('player')} voce ganhou e seu tempo foi de ${spanTime.innerHTML}ms`)
            clearInterval(this.tempo)
        }
    }, 400)
}

function checkCads() {
    const firstCardAttribute = firtsCard.getAttribute('data-cardName');
    const secundCardAttribute = secundCard.getAttribute('data-cardName');

    if (firstCardAttribute == secundCardAttribute) {
        firtsCard.firstChild.classList.add('disabled-card');
        secundCard.firstChild.classList.add('disabled-card');

        firtsCard = '';
        secundCard = '';

        ckeckEndGame()
    } else {
        setTimeout(() => {
            firtsCard.classList.remove('reveal-card');
            secundCard.classList.remove('reveal-card');

            firtsCard = '';
            secundCard = '';
        }, 500)
    }
}

function revealCard({ target }) {
    if (target.parentNode.className.includes('reveal-card')) return


    if (firtsCard == '') {
        target.parentNode.classList.add('reveal-card')
        firtsCard = target.parentNode;
    } else if (secundCard == '') {
        target.parentNode.classList.add('reveal-card')
        secundCard = target.parentNode;
        checkCads();
    }
}

const createCard = (nameImage) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${nameImage}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-cardName', nameImage)

    return card;
};

function startTime(){
    this.tempo = setInterval(()=>{
        const timer = Number(spanTime.innerHTML) ;
        spanTime.innerHTML = timer + 1
    }, 1000)
}

function loadGame() {
    const duplicateCards = [...lisdCardImage, ...lisdCardImage].sort(() => Math.random() - 0.5)

    duplicateCards.forEach((e) => {
        const card = createCard(e);

        grid.appendChild(card);
    });
}

window.onload = () =>{
    const namePlayer = localStorage.getItem('player');

    spanPlayer.innerHTML = namePlayer

    loadGame();
    startTime();
}