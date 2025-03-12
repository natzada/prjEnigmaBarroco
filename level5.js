const gridSize = 16;
const validWords = ["BARROCO", "SUBLIME", "CONTRASTE", "EXAGERO", "DECORATIVO", "INTENSIDADE", "IRONIA", "RELIGIOSIDADE", "METAFORA"];
let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(''));
const title = document.getElementById("title");

// Função para remover a imagem de introdução
function removeIntroImage() {
    const introImage = document.getElementById('introImage');
    introImage.style.opacity = 0;
    setTimeout(() => {
        introImage.style.display = 'none';
    }, 1000);
}

document.addEventListener('click', removeIntroImage);

function createProceedButton() {
    const proceedButton = document.createElement("button");
    proceedButton.id = "proceed-btn";
    proceedButton.innerHTML = `PROSSEGUIR`;
    proceedButton.style.position = "fixed";
    proceedButton.style.bottom = "10px";
    proceedButton.style.right = "10px";
    proceedButton.style.padding = "10px 20px";
    proceedButton.style.backgroundColor = "#54121E";
    proceedButton.style.color = "white";
    proceedButton.style.border = "none";
    proceedButton.style.borderRadius = "5px";
    proceedButton.style.cursor = "pointer";
    proceedButton.style.zIndex = 100;

    proceedButton.addEventListener("click", function(event) {
        window.location.href = "final.html";
    });

    document.body.appendChild(proceedButton);
}

function confetes() {
    const confete = document.createElement("img");
    confete.id = "confetes-gif";
    confete.src = "assets/confetti (1).gif";
    confete.style.position = "absolute"; // Defina a posição como absoluta ou fixa se necessário
    confete.style.top = "50%"; // Ajuste a posição para onde você quer
    confete.style.left = "50%"; // Ajuste a posição
    confete.style.transform = "translate(-50%, -50%)"; // Centralize a imagem
    confete.style.zIndex = "1000"; // Garantir que o gif fique visível acima de outros elementos
    document.body.appendChild(confete);
}

// Função para preencher células vazias com letras aleatórias
function fillEmptyCells() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Gera uma letra aleatória entre A-Z
            }
        }
    }
}

// Função para desenhar a grade do caça-palavras
function drawGrid() {
    const table = document.getElementById('puzzleGrid');
    grid.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const td = document.createElement('td');
            td.textContent = cell;
            td.dataset.row = rowIndex;
            td.dataset.col = cellIndex;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

// Função para misturar aleatoriamente as palavras
function shuffleWords() {
    validWords.forEach(word => {
        let placed = false;
        while (!placed) {
            const vertical = Math.random() < 0.5;
            const rowStart = Math.floor(Math.random() * gridSize);
            const colStart = Math.floor(Math.random() * gridSize);
            const stepR = vertical ? 1 : 0;
            const stepC = vertical ? 0 : 1;
            let fits = true;

            for (let i = 0; i < word.length; i++) {
                const r = rowStart + i * stepR;
                const c = colStart + i * stepC;
                if (r >= gridSize || c >= gridSize || (grid[r][c] !== '' && grid[r][c] !== word[i])) {
                    fits = false;
                    break;
                }
            }

            if (fits) {
                for (let i = 0; i < word.length; i++) {
                    const r = rowStart + i * stepR;
                    const c = colStart + i * stepC;
                    grid[r][c] = word[i];
                }
                placed = true;
            }
        }
    });
}

// Função para exibir as palavras para serem encontradas
function displayWords() {
    const wordsDiv = document.getElementById('wordsList');
    validWords.forEach((word, index) => {
        const wordElement = document.createElement('p');
        wordElement.textContent = word;
        wordElement.id = `word${index}`;
        wordElement.className = 'word';
        wordsDiv.appendChild(wordElement);
    });
}

// Funções para manipular seleção de palavras
let selectedCells = [];

function handleCellSelection() {
    document.querySelectorAll('#puzzleGrid td').forEach(cell => {
        cell.addEventListener('mousedown', () => {
            selectedCells = [cell];
            cell.classList.add('highlight');
        });
        cell.addEventListener('mouseenter', () => {
            if (selectedCells.length > 0 && !selectedCells.includes(cell)) {
                selectedCells.push(cell);
                cell.classList.add('highlight');
            }
        });
    });

    document.addEventListener('mouseup', () => {
        checkWord();
        selectedCells.forEach(cell => cell.classList.remove('highlight'));
        selectedCells = [];
    });
}

// Função para verificar se a palavra selecionada é válida
function checkWord() {
    const word = selectedCells.map(cell => cell.textContent).join('');
    validWords.forEach(validWord => {
        if (validWord === word) {
            selectedCells.forEach(cell => cell.classList.add('found'));
            document.getElementById(`word${validWords.indexOf(validWord)}`).classList.add('found-word');
        }
    });
    checkAllWordsFound(); // Chamar função de verificação aqui
}

// Função para verificar se todas as palavras foram encontradas
function checkAllWordsFound() {
    const allFound = validWords.every((word, index) => document.getElementById(`word${index}`).classList.contains('found-word'));
    if (allFound) {
        title.innerHTML = "Parabéns, você conseguiu!";
        createProceedButton();
        confetes();
    }
}

shuffleWords();
fillEmptyCells();
drawGrid();
displayWords();
handleCellSelection();
