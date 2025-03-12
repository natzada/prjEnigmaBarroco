const awnser = "OLINDA"
const btn = document.querySelector(".awnser__button");
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
    proceedButton.innerHTML = `<a href="level3.html" style="text-decoration: none; color: white;">PROSSEGUIR</a>`;
    proceedButton.style.position = "fixed";
    proceedButton.style.bottom = "10px";
    proceedButton.style.right = "10px";
    proceedButton.style.padding = "10px 20px";
    proceedButton.style.backgroundColor = "#54121E";
    proceedButton.style.color = "white";
    proceedButton.style.border = "none";
    proceedButton.style.borderRadius = "5px";
    proceedButton.style.cursor = "pointer";

    proceedButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "level4.html";
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
    confete.style.transparence
    confete.style.zIndex = "1000";           // Garantir que o gif fique visível acima de outros elementos
    container.appendChild(confete);
}

const checkAwnser = () => {
    const input = document.getElementById("awnser__input").value;
    if (input.toUpperCase() === awnser) {
        title.textContent = `Parábens! Você acertou.`;
        createProceedButton();
        confetes();
    } else {
        title.textContent = `Errado!, Tente novamente`;
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
}

btn.addEventListener('click', checkAwnser);