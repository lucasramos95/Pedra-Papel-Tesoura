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
    console.log(`resultado: ${elementosDoJogo.resultadoJogo.textContent}`);

    //manter o placar do jogo
    localStorage.setItem('placar', JSON.stringify(placar));
}

//esconder tela do jogo e mostrar tela de resultado
function renderizarTelaResultado () {
    elementosDoJogo.jogoInterface.style.display = 'none';
    elementosDoJogo.resultadoInterface.style.display = 'grid';
    elementosDoJogo.selecaoJogadorBtn.style.display = 'none'; //esconde escolha da CPU
    elementosDoJogo.resultadoJogo.style.display = 'none'; //esconde resultado da interface

//adiciona botão selecionado para seleção do jogador
elementosDoJogo.selecaoJogadorBtn.classList.add(`${selecaoJogadorBtn}`);
console.log(`Sua escolha: ${selecaoJogadorBtn}`);

//adiciona escolha da CPU depois de um delay
setTimeout( function() {
    elementosDoJogo.selecaoCpuBtn.classList.add(`${selecaoCpuBtn}`);
    console.log(`Cpu escolhe: ${selecaoJogadorBtn}`);
    elementosDoJogo.carregamentoPonto.style.display = 'none';
    elementosDoJogo.selecaoCpuBtn.style.display = 'grid';
    //mostrar resultado depois o delay
    setTimeout( function() {
        printarResultado();
        elementosDoJogo.resultadoInterface.style.display = 'initial';
        elementosDoJogo.resultadoInterface.style.gridTemplateArea = 'resultBox'
        //redimensionar interface do resultado para visualizar caixa de resultado
        let janelaTamanho = janela.matchMedia('(min-width: 992px)');
        if (janelaTamanho.matches) {
            elementosDoJogo.resultadoInterface.style.width = '80%';
            elementosDoJogo.resultadoInterface.style.gridTemplateColumns = '1fr 1fr 1fr';
        }
    }, 500)
}, 3000)
}

//jogar outra rodada quando botão 'Jogar Novamente' é clicado
elementosDoJogo.jogarNovamente.addEventListener('click', renderizarTelaJogo);

//esconder tela de resultado e 'resetar' tudo para tela do jogo
function renderizarTelaJogo() {
    elementosDoJogo.jogoInterface.style.display = '';
    elementosDoJogo.resultadoInterface.style.display = '';
    elementosDoJogo.resultadoInterface.style.width = '';
    elementosDoJogo.resultadoInterface.style.gridTemplateColumns = '';
    elementosDoJogo.selecaoJogadorBtnBtn.classList.remove(`${selecaoJogadorBtn}`);
    elementosDoJogo.selecaoCpuBtnBtn.classList.remove(`${selecaoJogadorBtn}`);
    elementosDoJogo.selecaoJogadorBtnBtn.classList.remove('É vencedor');
    elementosDoJogo.selecaoCpuBtnBtn.classList.remove('É vencedor');
    elementosDoJogo.carregamentoPonto.style.display = '';
}

//'resetar' placar quando botão resetar é clicado
elementosDoJogo.jogoReseta.addEventListener('click', jogoReseta);

function resetaJogo() {
    placar = 0;
    elementosDoJogo.jogoPlacar.textContent = placar;
    localStorage.clear();
}
