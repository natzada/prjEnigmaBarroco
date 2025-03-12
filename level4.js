const answer = "INSURREICAO PERNAMBUCANA";
const btn = document.querySelector(".answer__button");
const title = document.querySelector("#title");
const container = document.querySelector(".container");

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
    proceedButton.style.zIndex = 100

    proceedButton.addEventListener("click", function(event) {
        window.location.href = "level5.html";
    });

    container.appendChild(proceedButton);
}

function confetes() {
    const confete = document.createElement("img");
    confete.id = "confetes-gif";
    confete.src = "assets/confetti (1).gif"
    confete.style.position = "absolute";     // Defina a posição como absoluta ou fixa se necessário
    confete.style.top = "50%";               // Ajuste a posição para onde você quer
    confete.style.left = "50%";              // Ajuste a posição
    confete.style.transform = "translate(-50%, -50%)";  // Centralize a imagem
    confete.style.transparence;
    confete.style.zIndex = "1000";           // Garantir que o gif fique visível acima de outros elementos
    container.appendChild(confete);
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const checkAnswer = () => {
    const input = normalizeString(document.getElementById("answer__input").value).toUpperCase();
    if (input === answer) {
        title.textContent = `Parabéns! Você acertou.`;
        createProceedButton();
        confetes();
    } else {
        title.textContent = `Errado! Tente novamente`;
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
}

btn.addEventListener('click', checkAnswer);
