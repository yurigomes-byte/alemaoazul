// Variáveis para simular os sensores da fazenda
let umidadeSolo = 45;
let nivelCisterna = 80;
let statusSistema = "Equilíbrio";

// Variáveis de interface
let corStatus;

function setup() {
  // Cria uma tela ideal para visualização em computadores ou tablets
  createCanvas(800, 500);
  corStatus = color(46, 204, 113); // Verde para indicar OK
}

function draw() {
  background(245, 247, 250); // Fundo cinza claro moderno
  
  // --- TÍTULO DO DASHBOARD ---
  fill(44, 62, 80);
  textSize(24);
  textFont('Helvetica');
  textStyle(BOLD);
  text("AGRINHO 2026 - Dashboard AgroSustentável", 40, 50);
  
  textSize(14);
  textStyle(NORMAL);
  fill(127, 140, 141);
  text("Monitoramento em tempo real para o equilíbrio ambiental", 40, 75);

  // --- LÓGICA DE INTERAÇÃO (Simulando Sensores com o Mouse) ---
  // O movimento do mouse na tela altera os valores para demonstração na banca
  umidadeSolo = constrain(floor(map(mouseX, 0, width, 0, 100)), 0, 100);
  nivelCisterna = constrain(floor(map(mouseY, height, 0, 0, 100)), 0, 100);

  // Regras de negócio sustentável (Análise de Dados)
  if (umidadeSolo < 30 && nivelCisterna < 20) {
    statusSistema = "ALERTA: Escassez Crítica!";
    corStatus = color(231, 76, 60); // Vermelho
  } else if (umidadeSolo > 80) {
    statusSistema = "AVISO: Desperdício de Água!";
    corStatus = color(241, 196, 15); // Amarelo
  } else {
    statusSistema = "SISTEMA EM EQUILÍBRIO";
    corStatus = color(46, 204, 113); // Verde
  }

  // --- CARD 1: STATUS GERAL ---
  desenharCard(40, 110, 720, 60);
  fill(corStatus);
  rect(40, 110, 15, 60, 4, 0, 0, 4); // Barra lateral de status
  
  fill(44, 62, 80);
  textSize(16);
  textStyle(BOLD);
  text("Status do Ecossistema:", 70, 145);
  fill(corStatus);
  text(statusSistema, 250, 145);

  // --- CARD 2: SENSOR DE UMIDADE DO SOLO ---
  desenharCard(40, 200, 340, 240);
  fill(44, 62, 80);
  textSize(18);
  text("Umidade do Solo", 70, 240);
  
  // Gráfico em arco (Gauge) da umidade
  noFill();
  stroke(220, 225, 230);
  strokeWeight(15);
  arc(210, 330, 120, 120, PI, TWO_PI);
  
  // Arco preenchido dinâmico
  stroke(52, 152, 219); // Azul para água
  let anguloUmidade = map(umidadeSolo, 0, 100, PI, TWO_PI);
  arc(210, 330, 120, 120, PI, anguloUmidade);
  
  // Texto do valor
  noStroke();
  fill(44, 62, 80);
  textSize(28);
  textAlign(CENTER);
  text(umidadeSolo + "%", 210, 335);
  
  textSize(12);
  fill(127, 140, 141);
  text(umidadeSolo < 30 ? "Solo Seco (Irrigando)" : "Solo Ideal", 210, 360);
  textAlign(LEFT); // Reseta alinhamento

  // --- CARD 3: RESERVATÓRIO DE ÁGUA DA CHUVA ---
  desenharCard(420, 200, 340, 240);
  fill(44, 62, 80);
  textSize(18);
  text("Cisterna (Água da Chuva)", 450, 240);
  
  // Desenho do tanque de água
  fill(230, 235, 240);
  rect(450, 270, 80, 130, 8);
  
  // Água dentro do tanque (dinâmica)
  fill(41, 128, 185);
  let alturaAgua = map(nivelCisterna, 0, 100, 0, 120);
  rect(450, 400 - alturaAgua, 80, alturaAgua, 0, 0, 8, 8);
  
  // Informações textuais ao lado do tanque
  fill(44, 62, 80);
  textSize(28);
  text(nivelCisterna + "%", 560, 330);
  textSize(12);
  fill(127, 140, 141);
  text("Capacidade Utilizada", 560, 350);
  text("Mova o mouse na tela", 560, 380);
  text("para testar os sensores.", 560, 395);
}

// Função auxiliar para desenhar os cards de fundo com sombra leve
function desenharCard(x, y, w, h) {
  push();
  noStroke();
  fill(0, 0, 0, 15); // Sombra simulada
  rect(x + 2, y + 2, w, h, 8);
  fill(255); // Fundo do card branco
  rect(x, y, w, h, 8);
  pop();
}