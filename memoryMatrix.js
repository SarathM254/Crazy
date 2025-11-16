// Basic structure for Memory Matrix
class MemoryMatrixGame {
    constructor(container) {
        this.container = container;
        this.cards = [];
        this.flippedCards = [];
        this.matchedCards = [];
        this.moves = 0;
        this.timer = 0;
        this.intervalId = null;

        this.cardData = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        this.shuffle(this.cardData);
        this.createGrid();
        this.startTimer();
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createGrid() {
        this.cardData.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = data;
            card.innerHTML = `<div class="card-inner"><div class="card-front"></div><div class="card-back">${data}</div></div>`;
            card.addEventListener('click', () => this.flipCard(card));
            this.container.appendChild(card);
            this.cards.push(card);
        });
    }

    flipCard(card) {
        if (this.flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.checkForMatch();
            }
        }
    }

    checkForMatch() {
        this.moves++;
        const [card1, card2] = this.flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            this.matchedCards.push(card1, card2);
            this.flippedCards = [];
            if (this.matchedCards.length === this.cardData.length) {
                this.endGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            this.timer++;
        }, 1000);
    }

    endGame() {
        clearInterval(this.intervalId);
        alert(`You won in ${this.moves} moves and ${this.timer} seconds!`);
    }
}
