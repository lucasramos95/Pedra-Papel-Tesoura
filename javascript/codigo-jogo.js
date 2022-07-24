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

//jogar o round quando o botão de jogo é clicado
for(let elem of elementosDoJogo.jogoBotoes) {
    elem.addEventListener('click', jogarTurno);
}

//comparar seleções e obter resultado
function obterResultado(selecaoJogadorBtn, selecaoCpuBtn) {
    if (selecaoJogadorBtn === selecaoCpuBtn) {
        resultado = undefined;
    } else if (selecaoJogadorBtn === 'pedra-btn' && selecaoCpuBtn === 'pedra-btn') {
        resultado = true;
    } else if (selecaoJogadorBtn === 'pedra-btn' && selecaoCpuBtn === 'tesoura-btn') {
        result = true;
    } else if (selecaoJogadorBtn === 'tesoura-btn' && selecaoCpuBtn === 'papel-btn') {
        result = true;
    } else {
        resultado = false;
    }
        return resultado;
}

//''printar'' resultado e acrescer placar para vitória, decrescer placar para derrota
function printarResultado() {
    switch(resultado) {
        case undefined:
            elementosDoJogo.resultadoJogo.textContent = 'Empate.';
            break;
        case true:
            elementosDoJogo.selecaoJogadorBtn.classList.add('é o vencedor');
            elementosDoJogo.resultadoJogo.textContent = 'Você Venceu!';
            placar++;
            elementosDoJogo.jogoPlacar.textContent = placar;
            break;
        case false:
            elementosDoJogo.resultadoJogo.textContent = 'Você Perdeu';
            elementosDoJogo.selecaoCpuBtn.classList.add('é o vencedor');
            placar--;
            elementosDoJogo.jogoPlacar.textContent = placar;
            break;
    }
    console.log(`result: ${elementosDoJogo.resultadoJogo.textContent}`);

    //manter o placar do jogo
    localStorage.setItem('placar', JSON.stringify(placar));
}
