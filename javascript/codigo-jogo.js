const elementosDoJogo = {
    jogoInterface: document.querySelector('.opcoes-jogo'),
    jogoBotoes: Array.from(document.querySelector('.opcoes-jogo').children),
    jogoPlacar: document.querySelector('.placar-caixa-pontos'),
    resultadoInterface: document.querySelector('.resultado-jogo'),
    resultadoJogo: document.querySelector('.resultado-do-jogo'),
    selecaoJogadorBtn: document.querySelector('.escolha-do-jogador'),
    selecaoCpuBtn: document.querySelector('.escolha-da-cpu'),
    resultadoInterfaceJogo: document.querySelector('.resultado-caixa'),
    jogarNovamente: document.querySelector('.btn-jogar-novamente'),
    carregamentoPonto: document.querySelector('.ponto-carregamento'),
    jogoReseta: document.querySelector('.resetar-btn')
};

let selecaoCpu,selecaoJogador;
let resultado = false;

//preservar o placar na atualização da página
let placar = localStorage.getItem('placar')?(JSON.parse(localStorage.getItem('placar'))):0;
console.log('placar:', placar);
elementosDoJogo.jogoPlacar.textContent = placar;

//jogar o round quando o botão de jogo é clicado
for(let elem of elementosDoJogo.jogoBotoes) {
    elem.addEventListener('click', jogarTurno);
}

function computadorJogaTurno() {
    let selecaoAleatoria = Math.floor(Math.random() * elementosDoJogo.jogoBotoes.length);
    selecaoCpu = elementosDoJogo.jogoBotoes[selecaoAleatoria].className;
    return selecaoCpu;
}

function jogarTurno(event) {
    selecaoJogador = event.currentTarget.className;
    selecaoCpu = computadorJogaTurno();
    obterResultado(selecaoCpu,selecaoJogador);
    renderizarTelaResultado();
}



//comparar seleções e obter resultado
function obterResultado(selecaoJogador, selecaoCpu) {
    if (selecaoJogador === selecaoCpu) {
        resultado = undefined;
    } else if (selecaoJogador === 'pedra-btn' && selecaoCpu === 'pedra-btn') {
        resultado = true;
    } else if (selecaoJogador === 'pedra-btn' && selecaoCpu === 'tesoura-btn') {
        resultado = true;
    } else if (selecaoJogador === 'tesoura-btn' && selecaoCpu === 'papel-btn') {
        resultado = true;
    } else {
        resultado = false;
    }
        return resultado;
}

//''printar'' resultado e acrescer placar para vitória, decrescer placar para derrota
function printarResultado() {
    switch(resultado) {
        case undefined:
            elementosDoJogo.resultadoJogo.textContent = 'Empate';
            break;
        case true:
            elementosDoJogo.selecaoJogadorBtn.classList.add('é-o-vencedor');
            elementosDoJogo.resultadoJogo.textContent = 'Você Venceu!';
            placar++;
            elementosDoJogo.jogoPlacar.textContent = placar;
            break;
        case false:
            elementosDoJogo.resultadoJogo.textContent = 'Você Perdeu';
            elementosDoJogo.selecaoCpuBtn.classList.add('é-o-vencedor');
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
    elementosDoJogo.resultadoInterface.style.display = 'none'; //esconde resultado da interface

//adiciona botão selecionado para seleção do jogador
elementosDoJogo.selecaoJogadorBtn.classList.add(`${selecaoJogador}`);
console.log(`Sua escolha: ${selecaoJogador}`);

//adiciona escolha da CPU depois de um delay
setTimeout( function() {
    elementosDoJogo.selecaoCpuBtn.classList.add(`${selecaoCpu}`);
    console.log(`Cpu escolhe: ${selecaoCpu}`);
    elementosDoJogo.carregamentoPonto.style.display = 'none';
    elementosDoJogo.selecaoCpuBtn.style.display = 'grid';
    //mostrar resultado depois o delay
    setTimeout( function() {
        printarResultado();
        elementosDoJogo.resultadoInterfaceJogo.style.display = 'initial';
        elementosDoJogo.resultadoInterfaceJogo.style.gridTemplateArea = 'resultBox'
        //redimensionar interface do resultado para visualizar caixa de resultado
        let janelaTamanho = window.matchMedia('(min-width: 992px)');
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
    elementosDoJogo.selecaoJogadorBtn.classList.remove(`${selecaoJogador}`);
    elementosDoJogo.selecaoCpuBtn.classList.remove(`${selecaoJogador}`);
    elementosDoJogo.selecaoJogadorBtn.classList.remove('É-vencedor');
    elementosDoJogo.selecaoCpuBtn.classList.remove('É-vencedor');
    elementosDoJogo.carregamentoPonto.style.display = '';
}

//'resetar' placar quando botão resetar é clicado
elementosDoJogo.jogoReseta.addEventListener('click', resetaJogo);

function resetaJogo() {
    placar = 0;
    elementosDoJogo.jogoPlacar.textContent = placar;
    localStorage.clear();
}
