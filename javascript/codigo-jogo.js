const elementosDoJogo = {
    jogoInterface: document.querySelector('.jogo-interface'),
    jogoBotoes: Array.from(document.querySelector('.opcoes-jogo').children),
    jogoPlacar: document.querySelector('.placar-caixa-pontos'),
    resultadoInterface: document.querySelector('.resultado-jogo'),
    resultadoJogo: document.querySelector('.resultado-do-jogo'),
    selecaoJogadorBtn: document.querySelector('.escolha-do-jogador'),
    selecaoCpuBtn: document.querySelector('.escolha-da-cpu'),
    resultadoInterface: document.querySelector('.resultado-caixa'),
    jogarNovamente: document.querySelector('.btn-jogar-novamente'),
    carregamentoPonto: document.querySelector('.carregamento'),
    jogoReseta: document.querySelector('.resetar-btn')
};

let selecaoCpuBtn,selecaoJogadorBtn;
let resultado = false;

//preservar o placar na atualização da página
let placar = localStorage.getItem('placar')?(JSON.parse(localStorage.getItem('placar'))):0;
console.log('placar:', placar);
elementosDoJogo.jogoPlacar.textContent = placar;

function computadorJogaTurno() {
    let selecaoAleatoria = Math.floor(Math.random() * elementosDoJogo.jogoBotoes.length);
    selecaoCpuBtn = elementosDoJogo.jogoBotoes[selecaoAleatoria].className;
    return selecaoCpuBtn;
}

function jogarTurno(event) {
    selecaoJogadorBtn = event.currentTarget.className;
    selecaoCpuBtn = computadorJogaTurno();
    obterResultado(selecaoCpuBtn,selecaoJogadorBtn);
}



