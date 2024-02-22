const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const progressBar = document.getElementById("progress-bar");

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;
const updateInterval = 1000; 

function atualizarIconePlayPause() {
  const icone = taTocando ? "bi-pause-circle-fill" : "bi-play-circle-fill";
  botaoPlayPause.className = icone;
}

function tocarOuPausarFaixa() {
  taTocando = !taTocando;
  atualizarIconePlayPause();
  taTocando ? audio.play() : audio.pause();
}

function alterarCapitulo(incremento) {
  capitulo = (capitulo + incremento - 1 + quantidadeCapitulos) % quantidadeCapitulos + 1;
  audio.src = `books/dom-casmurro/${capitulo}.mp3`;
  nomeCapitulo.innerText = `Capítulo ${capitulo}`;
  if (taTocando) audio.play();
}

function atualizarBarraProgresso() {
  const progresso = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progresso}%`;
}

botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", () => alterarCapitulo(-1));
botaoProximoCapitulo.addEventListener("click", () => alterarCapitulo(1));
audio.addEventListener("ended", () => alterarCapitulo(1));
audio.addEventListener("timeupdate", atualizarBarraProgresso);
