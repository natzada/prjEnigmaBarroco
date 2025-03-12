let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;
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

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

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
        window.location.href = "level3.html"; // Redire ciona corretamente
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

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;
    
    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
        {
            mudarStyleLetra("tecla-" + letra, false);
            comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
        {
            document.getElementById(tecla).style.background = "#C71585";
            document.getElementById(tecla).style.color = "#ffffff";
        }
        else{
            document.getElementById(tecla).style.background = "#008000";
            document.getElementById(tecla).style.color = "#ffffff";
        }
    }
    
    function comparalistas(letra){
        const pos = palavraSecretaSorteada.indexOf(letra)
        if(pos < 0){
            tentativas--;
            carregaImagemForca();
            
            if(tentativas == 0){
                abreModal("OPS!", "Não foi dessa vez... Tente novamente.");
                mostrarBotaoProsseguir(true);
            }
        }
        else{
            mudarStyleLetra("tecla-" + letra, true);
            for(i = 0; i < palavraSecretaSorteada.length; i++){
                if(palavraSecretaSorteada[i] == letra){
                    listaDinamica[i] = letra;
                }
            }
        }
        
        let vitoria = true;
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] != listaDinamica[i]){
                vitoria = false;
            }
        }

        if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu... Avance para a próxima fase.");
        tentativas = 0;
        createProceedButton();
        confetes();
    }
}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('assets/forca01.png')";
            break;
            case 4:
                document.getElementById("imagem").style.background  = "url('assets/forca02.png')";
                break;
                case 3:
                    document.getElementById("imagem").style.background  = "url('assets/forca03.png')";
                    break;
                    case 2:
                        document.getElementById("imagem").style.background  = "url('assets/forca04.png')";
                        break;
                        case 1:
                            document.getElementById("imagem").style.background  = "url('assets/forca05.png')";
                            break;
                            case 0:
                                document.getElementById("imagem").style.background  = "url('assets/forca06.png')";
            break;
            default:
                document.getElementById("imagem").style.background  = "url('assets/forca.png')";
                break;
            }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;
    
    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;
        
        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    } else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;
        
        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
}

window.onclick = function(event){ 
    if (event.target == modal) {
        modal.style.display = "none";
    }  
}

function carregaListaAutomatica(){
    palavras = [
        {
            nome: "BENTO TEIXEIRA",
            categoria: "AUTORES"
        }
    ];
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    } else {
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            mostrarBotaoProsseguir(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}