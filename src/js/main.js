import * as dat from 'dat.gui';
import * as E from './eletron';


//Inicialização das variáveis globais
const canvas = document.getElementById("canvas_id");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext("2d");
const gui = new dat.GUI()

E.init({
    maxX: window.innerWidth,
    minX: 0,
    maxY: window.innerHeight,
    minY: 0
});

//Criando as bolinhas
const TAM = 60;
let bolinhas = [];
for(let i = 0; i <TAM; ++i) {
    bolinhas.push(new E.Bolinha(canvas.width/2, canvas.height/2));
}

//Adicionando controles
const ctr = {pause:false, value: 20}
gui.add(ctr, 'pause');
//gui.add(ctr, 'value', 1, 25, 0.01);


//funcão principal
function animate() {
    requestAnimationFrame(animate);

    if(ctr.pause) return;

    // Limpa a tela
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'hsla(204, 20%, 15%, 0.1)';
    ctx.fill();

    //Atualiza as bolinhas
    for (let i = 0; i <TAM; ++i) {
        bolinhas[i].update(bolinhas);
    }
    for (let i = 0; i <TAM; ++i) {
        bolinhas[i].draw(ctx);
    }
}
animate();
