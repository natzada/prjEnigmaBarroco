window.addEventListener("scroll", function(){
    let header = document.querySelector('.header')
    header.classList.toggle('rolagem', window.scrollY > 80)
})
    
const playBtn = document.querySelector("#play-game");


playBtn.addEventListener('click', () => {
   window.location.href = "index.html";
})
