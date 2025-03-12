document.addEventListener("DOMContentLoaded", function() {
const hiddenWords = document.querySelectorAll('.hidden-word');
const codeSlots = document.querySelectorAll('.code-slot');
const title = document.querySelector("#title");
const background = document.querySelector("#background");

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
    proceedButton.innerHTML = `<a href="level2.html">PROSSEGUIR</a>`;
    proceedButton.style.position = "fixed";
    proceedButton.style.bottom = "10px";
    proceedButton.style.right = "10px";
    proceedButton.style.padding = "10px 20px";
    proceedButton.style.backgroundColor = "#54121E";
    proceedButton.style.color = "white";
    proceedButton.style.border = "none";
    proceedButton.style.borderRadius = "5px";
    proceedButton.style.cursor = "pointer";
    background.appendChild(proceedButton);
}

function confetes() {
    const confete = document.createElement("img");
    confete.id = "confetes-gif";
    confete.src = "assets/confetti (1).gif"
    confete.style.position = "absolute";     // Defina a posição como absoluta ou fixa se necessário
    confete.style.top = "50%";               // Ajuste a posição para onde você quer
    confete.style.left = "50%";              // Ajuste a posição
    confete.style.transform = "translate(-50%, -50%)";  // Centralize a imagem
    confete.style.transparence
    confete.style.zIndex = "1000";           // Garantir que o gif fique visível acima de outros elementos
    background.appendChild(confete);
}

hiddenWords.forEach(word => {
    word.addEventListener('dragstart', dragStart);
});

codeSlots.forEach(slot => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.textContent);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData('text');
    if (e.target.dataset.correctWord === draggedWord) {
        e.target.textContent = draggedWord;
        e.target.classList.add("filled-slot");
        checkCompletion();
    } else {
        title.innerHTML = "Errado, tente novamente";
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
}

function checkCompletion() {
    const filledSlots = document.querySelectorAll('.filled-slot');
    if (filledSlots.length === codeSlots.length) {
        createProceedButton();
        title.innerHTML = "Parabéns! Você conseguiu"
        confetes();
    }
}
});

proceedButton.addEventListener("click", function() {
    
});

function createHint() {
    const hint = document.createElement("img");
    hint.id = "hint__authors";
    hint.src = "assets/Padre Antonio Vieira.png";
}