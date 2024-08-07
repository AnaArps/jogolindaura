const blob = document.querySelector('.blob');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.querySelector('.score');

let score = 0;
let isGameOver = false;

const jump = () => {
    if (isGameOver) return; // Não permitir pulo se o jogo estiver terminado

    blob.classList.add('jump');
    blob.src = './img/robsonpulando.gif'; // Caminho do gif quando o personagem pula

    setTimeout(() => {
        blob.classList.remove('jump');
        blob.src = './img/robsoncorrendo2.gif'; // Retorna para o gif padrão de corrida após o pulo
    }, 300); // Reduzir a duração do pulo para 300ms
}

const updateScore = () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

const gameOver = () => {
    isGameOver = true;
    clearInterval(loop);

    pipe.style.animation = 'none';
    blob.style.animation = 'none';

    blob.src = './img/game-over.png';
    blob.style.width = '100px'; // Ajustar o tamanho da imagem de game over
    blob.style.marginLeft = '-50px'; // Centralizar horizontalmente

    // Ajustar a posição vertical
    blob.style.bottom = '0';
    blob.style.transition = 'bottom 0.3s';

    setTimeout(() => {
        blob.style.bottom = '50%';
    }, 50);
}

const resetGame = () => {
    isGameOver = false;
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    blob.style.bottom = '0';
    blob.src = './img/robsoncorrendo2.gif';
    blob.style.width = '200px'; // Voltar ao tamanho padrão do personagem
    blob.style.marginLeft = '0'; // Resetar o margin left

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const blobPosition = +window.getComputedStyle(blob).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && blobPosition < 80) {
            gameOver();
        } else {
            updateScore();
        }
    }, 10);
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 && isGameOver) { // Tecla espaço para reiniciar o jogo
        resetGame();
    } else if (event.keyCode === 32) { // Tecla espaço para pular se o jogo não estiver terminado
        jump();
    }
});

// Iniciar o jogo
let loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const blobPosition = +window.getComputedStyle(blob).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && blobPosition < 80) {
        gameOver();
    } else {
        updateScore();
    }
}, 10);
