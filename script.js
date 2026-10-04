
const gameCards = [
    { id: 1, img: 'images/comet.jpg' },
    { id: 1, img: 'images/comet.jpg' },

    { id: 2, img: 'images/earth.jpg' },
    { id: 2, img: 'images/earth.jpg' },

    { id: 3, img: 'images/jupiter.jpg' },
    { id: 3, img: 'images/jupiter.jpg' },

    { id: 4, img: 'images/moon.jpg' },
    { id: 4, img: 'images/moon.jpg' },

    { id: 5, img: 'images/rocket.jpg' },
    { id: 5, img: 'images/rocket.jpg' },

    { id: 6, img: 'images/spaceship.jpg' },
    { id: 6, img: 'images/spaceship.jpg' },

    { id: 7, img: 'images/sun.jpg' },
    { id: 7, img: 'images/sun.jpg' },

    { id: 8, img: 'images/ufo.jpg' },
    { id: 8, img: 'images/ufo.jpg' },
];

function createBodyContent() {

    const divBody = document.createElement('div');
    divBody.classList.add('div-body');

    const header = document.createElement('header');

    const nav = document.createElement('nav');
    nav.classList.add('nav-header');

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('button');
    newGameButton.classList.add('new-game-button');

    const textNewGame = document.createElement('span');
    textNewGame.textContent = 'Новая игра';

    newGameButton.append(textNewGame);

    const leadersButton = document.createElement('button');
    leadersButton.classList.add('button');
    leadersButton.classList.add('leader-game-button');

    const textLeaders = document.createElement('span');
    textLeaders.textContent = 'Лидеры';

    leadersButton.append(textLeaders);

    nav.append(newGameButton, leadersButton);
    header.append(nav);

    const main = document.createElement('main');

    const divInfo = document.createElement('div');
    divInfo.classList.add('div-info');

    const divMoves = document.createElement('div');
    divMoves.classList.add('div-moves');
    divMoves.classList.add('counter');

    const textMoves = document.createElement('span');
    textMoves.textContent = 'Всего ходов:';

    const numberMoves = document.createElement('span');
    numberMoves.classList.add('number-movies');
    numberMoves.textContent = '0';

    divMoves.append(textMoves, numberMoves);

    const h1 = document.createElement('h1');
    h1.textContent = 'Memory game';

    const divPairs = document.createElement('div');
    divPairs.classList.add('div-pairs');
    divPairs.classList.add('counter');

    const textPairs = document.createElement('span');
    textPairs.textContent = 'Найдено пар:';

    const numberPairs = document.createElement('span');
    numberPairs.classList.add('number-pairs');
    numberPairs.textContent = '0';

    const divGame = document.createElement('div');
    divGame.classList.add('game-boards');

    const dialog = document.createElement('dialog');
    dialog.classList.add('dialog');

    const h2Modal = document.createElement('h2');
    h2Modal.classList.add('h2-modal');

    const divH2Modal = document.createElement('div');
    divH2Modal.classList.add('div-h2-modal');

    const divDialog = document.createElement('div');
    divDialog.classList.add('div-dialog');

    const dialogCloseButton = document.createElement('button');
    dialogCloseButton.classList.add('dialog-close-btn');
    dialogCloseButton.classList.add('dialog-close-button');
    dialogCloseButton.textContent = 'Закрыть';

    const dialogDivButton = document.createElement('div');
    dialogDivButton.classList.add('dialog-div-button');
    dialogDivButton.append(dialogCloseButton);

    divH2Modal.append(h2Modal);

    dialog.append(divH2Modal, divDialog, dialogDivButton);

    divPairs.append(textPairs, numberPairs);

    divInfo.append(divMoves, h1, divPairs);

    main.append(divInfo, divGame);

    divBody.append(header, main, dialog);

    document.body.append(divBody);

    dialogCloseButton.addEventListener('click', closeModal);
    dialog.addEventListener('click', closeModalOutside);

}

createBodyContent();

function shuffle(array) {
    let m = array.length, t, i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function createBoard() {

    const boards = document.querySelector('.game-boards');
    shuffle(gameCards);

    gameCards.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = value.id;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = value.img;
        frontFace.alt = 'card';

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');

        card.append(frontFace, backFace);

        boards.append(card);
    })
}

createBoard();

const gameBoards = document.querySelector('.game-boards');

let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;
let countMoves = 0;
let countPairs = 0;

function startGame() {

    const cards = [...document.querySelectorAll('.card')];

    shuffle(cards);

    firstCard = null;
    secondCard = null;
    hasFlippedCard = false;
    lockBoard = false;

    countMoves = 0;
    countPairs = 0;

    const numberMoves = document.querySelector('.number-movies');
    numberMoves.textContent = '0';

    const numberPairs = document.querySelector('.number-pairs');
    numberPairs.textContent = '0';

    cards.forEach(card => {
        gameBoards.append(card);
        card.classList.remove('flip');
        card.removeEventListener('click', flipCard);
        card.addEventListener('click', flipCard);
    });
}

const newGameButton = document.querySelector('.new-game-button');
newGameButton.addEventListener('click', () => {
    startGame();
});

startGame();

function flipCard() {
    if (lockBoard) return;
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        this.classList.add('flip');
        firstCard = this;
    } else {
        if (this === firstCard) return;
        this.classList.add('flip');
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    const numberMoves = document.querySelector('.number-movies');
    const numberPairs = document.querySelector('.number-pairs');

    if (firstCard.dataset.id === secondCard.dataset.id) {
        countMoves++;
        countPairs++;
        numberMoves.textContent = `${countMoves}`;
        numberPairs.textContent = `${countPairs}`;
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard = null;
        secondCard = null;
        hasFlippedCard = false;

        if (countPairs === 8) {
            openModal('victory');
            saveToLocalstorage(countMoves);
        }
    } else {
        countMoves++;
        numberMoves.textContent = `${countMoves}`;
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard = null;
            secondCard = null;
            hasFlippedCard = false;
            lockBoard = false;
        }, 1000);
    }
}

function closeModal() {
    const modal = document.querySelector('dialog');
    modal.close();
}

function closeModalOutside(event) {
    const modal = document.querySelector('dialog');
    const rect = modal.getBoundingClientRect();

    const isClickOutside = (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    );

    if (isClickOutside) {
        modal.close();
    }
}

function openModal(type) {
    const modal = document.querySelector('dialog');
    const divDialog = document.querySelector('.div-dialog');

    if (type === 'victory') {
        showVictoryModal(divDialog);
    }

    if (type === 'leader') {
        showLeaderModal(divDialog);
    }

    modal.showModal();
}

function showVictoryModal(divDialog) {

    const dialogCloseButton = document.querySelector('.dialog-close-button');
    dialogCloseButton.classList.replace('button', 'dialog-close-btn');

    divDialog.textContent = '';

    const modal = document.querySelector('dialog');

    const h2Modal = document.querySelector('.h2-modal');
    h2Modal.textContent = 'Победа';

    const numberMoves = document.querySelector('.number-movies');

    const modelDivMoves = document.createElement('div');
    modelDivMoves.classList.add('model-div-moves');
    modelDivMoves.classList.add('modal-counter');

    const modelTextMoves = document.createElement('span');
    modelTextMoves.textContent = 'Всего ходов:';

    const modelNumberMoves = document.createElement('span');
    modelNumberMoves.classList.add('model-number-movies');
    modelNumberMoves.textContent = numberMoves.textContent;

    const dialogNewGameButton = document.createElement('button');
    dialogNewGameButton.classList.add('button');
    dialogNewGameButton.textContent = 'Новая игра';

    modelDivMoves.append(modelTextMoves, modelNumberMoves);

    divDialog.prepend(modelDivMoves, dialogNewGameButton);

    dialogNewGameButton.addEventListener('click', () => {
        startGame();
        modal.close();
    });
}

const leadersButton = document.querySelector('.leader-game-button');
leadersButton.addEventListener('click', () => {
    openModal('leader');
});

function showLeaderModal(divDialog) {

    const dialogCloseButton = document.querySelector('.dialog-close-button');
    dialogCloseButton.classList.replace('dialog-close-btn', 'button');
    divDialog.textContent = '';

    let jsonLeaders = localStorage.getItem('leaders');
    const h2Modal = document.querySelector('.h2-modal');
    h2Modal.textContent = 'Таблица лидеров';

    const modelDivLeaders = document.createElement('div');
    modelDivLeaders.classList.add('model-div-leaders');

    if (jsonLeaders === null) {
        modelDivLeaders.textContent = 'Пока нет результатов';
    } else {
        let arrLeaders = JSON.parse(jsonLeaders);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const trHead = document.createElement('tr');
        const thRank = document.createElement('th');
        const thCount = document.createElement('th');
        const thData = document.createElement('th');

        thRank.textContent = 'Место';
        thCount.textContent = 'Ходы';
        thData.textContent = 'Дата игры';

        arrLeaders.forEach(leader => {
            const trBody = document.createElement('tr');

            Object.values(leader).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                trBody.append(td);

            });

            tbody.append(trBody);

        });

        trHead.append(thRank, thCount, thData);
        thead.append(trHead);
        table.append(thead, tbody);
        modelDivLeaders.append(table);

    }

    divDialog.append(modelDivLeaders);

}

function saveToLocalstorage(countMoves) {
    let jsonLeaders = localStorage.getItem('leaders');

    if (jsonLeaders === null) {
        let arrLeaders = [
            {
                index: 1,
                count: countMoves,
                data: new Date().toLocaleDateString('ru-RU')
            }
        ];
        localStorage.setItem('leaders', JSON.stringify(arrLeaders));
    } else {
        let arrLeaders = JSON.parse(jsonLeaders);
        if (arrLeaders.length > 9) arrLeaders.pop();
        let newLeader = {
            index: '',
            count: countMoves,
            data: new Date().toLocaleDateString('ru-RU')
        };
        arrLeaders.push(newLeader);

        arrLeaders.sort((a, b) => {
            if (a.count !== b.count) {
                return a.count - b.count;
            }

            return parseDate(a.data) - parseDate(b.data);
        });

        arrLeaders.forEach((leader, index) => {
            leader.index = index + 1;
        });

        localStorage.setItem('leaders', JSON.stringify(arrLeaders));
    }
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split('.');

    return new Date(year, month - 1, day);
}