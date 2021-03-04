//Variaveis da bolinha
let xBolinha = 300; //centro da bolinha
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2; 

//Variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilhaSonora;

let chanceDeErrar = 0;

function preload(){
  trilhaSonora = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilhaSonora.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
    incluiPlacar();
    marcaPonto();
  verificaColisaoRaqueteBorda();
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){ //acrescenta o raio para a borda da bolinha ser considerada ao inves do centro X
    velocidadeXBolinha *= -1; 
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
    if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar();
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function colisaoMinhaRaqueteBiblioteca (){
     colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function colisaoRaqueteOponenteBiblioteca() {
    colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaqueteBorda(){

    if (yRaquete < 0) {
        yRaquete = 0;
    } if (yRaquete + raio > height) {
      yRaquete = 400 - raio;
    }
}