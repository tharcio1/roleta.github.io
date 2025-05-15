const canvas = document.getElementById('roleta');
const ctx = canvas.getContext('2d');
const btnRodar = document.getElementById('rodar');

const opcoes = ["Prêmio A", "Prêmio B", "Prêmio C", "Prêmio D", "Prêmio E"];
const cores = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33C4"];

let anguloAtual = 0;
const grauPorOpcao = 360 / opcoes.length;

function desenharRoleta() {
  for (let i = 0; i < opcoes.length; i++) {
    const anguloInicio = (i * grauPorOpcao) * Math.PI / 180;
    const anguloFim = ((i + 1) * grauPorOpcao) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, anguloInicio, anguloFim);
    ctx.fillStyle = cores[i];
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(anguloInicio + (anguloFim - anguloInicio) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(opcoes[i], 140, 10);
    ctx.restore();
  }
}

btnRodar.addEventListener('click', () => {
  const voltas = Math.floor(Math.random() * 3) + 3;
  const opcaoEscolhida = Math.floor(Math.random() * opcoes.length);

  // Cálculo correto do ângulo final (girando horário):
  const anguloFinal = (voltas * 360) + (360 - (opcaoEscolhida * grauPorOpcao) - (grauPorOpcao / 2));

  canvas.style.transition = 'transform 4s ease-out';
  anguloAtual = anguloFinal;
  canvas.style.transform = `rotate(${anguloAtual}deg)`;

  setTimeout(() => {
    // Correção definitiva do índice visual após rotação:
    const indiceReal = (opcaoEscolhida) % opcoes.length;
    const premio = opcoes[indiceReal - 1];
    alert(`Você ganhou: ${premio}!`);
  }, 4000);
});

desenharRoleta();
