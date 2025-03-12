document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#next-btn");
    const title = document.querySelector("#title");
    const titleWhite = document.querySelector("#title-white");

    button.addEventListener("click", intro2);

    function intro2() {
        title.style.fontSize = "20px";
        title.style.color = "#D7DEDC";
        titleWhite.style.color = "#D7DEDC";
        titleWhite.style.fontSize = "20px";
    }
    // const userName = document.querySelector("#name");
    // const name = userName.ariaValueMax;
    const pages = [
        {
            title: "Bem-vindo ao Enigma Barroco!",
            content: `Prepare-se para viajar ao <span class="destaque">século XVI</span>, uma época cheia de conflitos religiosos e grandes mudanças.<br>
                                Em 1517, Martinho Lutero pregou suas 95 teses na porta da Igreja de Todos os Santos em Wittemberg, criticando a venda de<br> indulgências pela Igreja Católica. <span class="destaque">A Reforma Protestante começou</span> e a Igreja Católica respondeu com a Contrarreforma.<br><br><br>
                                Você tem como objetivo <span class="destaque">resolver enigmas</span>, decifrar mensagens e explorar a arte barroca para descobrir os segredos desses<br> movimentos históricos. Sua missão é entender o que motivou Lutero, como a Igreja reagiu e como isso moldou a cultura da época.<br>
                                Você vai encarar questões sobre indulgências, simonia, dogmas cristãos, heresia e muito mais. A cada resposta certa, você estará<br> mais próximo de se tornar um <span class="destaque">expert no Barroco</span>.<br><br><br>
                                Boa sorte, explorador dos mistérios do passado!<br>
                                Que seu desejo por conhecimento <span class="destaque">ilumine</span> seu caminho.`,
            buttonText: "PRÓXIMO"
        },
        {
            title: "Preparado?",
            content: `<br><button id="page2">
            <a href="level1.html">SIM</a>
            </button>`,
            buttonText: "NÃO, VOLTAR"
        }   
    ];

    let currentPage = 0;

    button.addEventListener("click", function() {
        if (currentPage < pages.length) {
            title.innerHTML = pages[currentPage].title;
            titleWhite.innerHTML = pages[currentPage].content;
            button.textContent = pages[currentPage].buttonText;

            // Altere o tamanho da fonte e adicione a transição
            title.style.fontSize = "25px";
            titleWhite.style.fontSize = "20px";
            
            title.style.transition = "opacity 3s, font-size 1s";
            titleWhite.style.transition = "opacity 3s, font-size 1s";
    
            // Defina a opacidade para 0 inicialmente
            title.style.opacity = "0";
            titleWhite.style.opacity = "0";
    
            // Use setTimeout para atrasar a mudança de opacidade para 1
            setTimeout(function() {
                title.style.opacity = "1";
                titleWhite.style.opacity = "1";
            }, 50);

            currentPage++;
        } if (currentPage == pages.length){
            currentPage = 0;
        }

        if (currentPage == 2) {
            currentPage = 0;
        }
    });
});