var timer_id = null; // variavel que armazena a chamada da função timeout

function iniciarJogo(){
  var nivel_jogo = document.getElementById('nivel-jogo').value;

  window.location.href = "jogo.html?" + nivel_jogo;
}

function playGame(){
  var url = window.location.search;
  var nivel_jogo = url.replace("?","");

  var tempo_segundos = 0;
  var qtde_baloes = 50;

  switch (nivel_jogo) {
    case '1':
      tempo_segundos = 120
      break;

    case '2':
        tempo_segundos = 60
        break;

    case '3':
      tempo_segundos = 30
      break;

    default:
      tempo_segundos = 120
  }

  document.getElementById('cronometro').innerHTML = tempo_segundos;

  criar_baloes(qtde_baloes);
  document.getElementById("qtde_baloes_inteiros").innerHTML = qtde_baloes;
  document.getElementById("qtde_baloes_estourados").innerHTML = 0;

  contagem_tempo(tempo_segundos);
}

function contagem_tempo(tempo_segundos){

  --tempo_segundos;

  if(tempo_segundos == -1){
    clearTimeout(timer_id); // para a execução da função de setTimeout
    game_over();
    return false;
  }

  document.getElementById("cronometro").innerHTML = tempo_segundos;

  timer_id = setTimeout("contagem_tempo(" + tempo_segundos + ")", 1000);
}

function criar_baloes(qtde_baloes){
  for (var i = 0; i < qtde_baloes; i++) {
    var balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = "10px";
    balao.id = "balao_"+i;

    balao.onclick = function(){
      estourarBalao(this);
    }

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourarBalao(e){
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png"
    pontuacao(+1)
}

function pontuacao(qtde){

  var qtde_baloes_inteiros = document.getElementById('qtde_baloes_inteiros').innerHTML;
  var qtde_baloes_estourados = document.getElementById('qtde_baloes_estourados').innerHTML;

  qtde_baloes_inteiros = parseInt(qtde_baloes_inteiros);
  qtde_baloes_estourados = parseInt(qtde_baloes_estourados);

  qtde_baloes_inteiros = (qtde_baloes_inteiros - qtde);
  qtde_baloes_estourados = (qtde_baloes_estourados + qtde);

  document.getElementById('qtde_baloes_inteiros').innerHTML = qtde_baloes_inteiros;
  document.getElementById('qtde_baloes_estourados').innerHTML = qtde_baloes_estourados;

  status_jogo(qtde_baloes_inteiros);
}

function status_jogo(qtde_baloes_inteiros){
  if (qtde_baloes_inteiros == 0){
    stopGame();
    alert('Parabéns você conseguiu estourar todos os balões a tempo!');
  }
}

function stopGame(){
  clearTimeout(timer_id);
}

function game_over(){
  remove_eventos_baloes();
  alert("Fim do jogo, você não conseguiu estourar todos os balões a tempo")
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('balao_'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('balao_'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
