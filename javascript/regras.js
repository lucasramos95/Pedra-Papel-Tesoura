var modal = document.querySelector('.regras-modal');
var btn = document.querySelector('.regras-btn');
var fechar = document.querySelector('.regras-modal-conteudo-fechar');

//mostras/esconder regras do jogo
function alternarModal () {
    modal.classList.toggle('show-modal');
}

//esconder regras quando o usuário clica fora da janela do modal
function janelaClique (event) {
    if(event.target === modal){
        alternarModal();
    }
}
    
//adicionar função quando os botões/janela são clicados
btn.addEventListener('click', alternarModal);
fechar.addEventListener('click', alternarModal);
window.addEventListener('click', janelaClique); 