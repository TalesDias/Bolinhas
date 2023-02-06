import * as U from './utils'

//Interatividade com o mouse
const mousePos = {x: 20, y: 20, ativado: false}
addEventListener('mousemove', (ev) => {
    mousePos.x = ev.clientX;
    mousePos.y = ev.clientY;
});
addEventListener('mousedown', (_) => {
    mousePos.ativado = !mousePos.ativado;
});

//É possível alterar a janela por aqui
const bordas = {
    maxX: null,
    minX: null,
    maxY: null,
    minY: null
}

function init(_bordas){
    bordas.maxX = _bordas.maxX;
    bordas.minX = _bordas.minX;
    bordas.maxY = _bordas.maxY;
    bordas.minY = _bordas.minY;
}

let global_id = 0;

const Bolinha = function (initPosX, initPosY, cor, raio) {
    this.id = global_id;
    global_id += 1;
    this.raio = raio ? raio : 7;
    this.autoAssign = cor === null || cor === undefined;
    this.cor = cor ? cor : 'red';

    this.pos = {
        x: initPosX,
        y: initPosY
    }
    this.vel = {
        x: U.random(2,-2),
        y: U.random(2,-2)
    }
}

Bolinha.prototype.draw = function (ctx) {
    //Se nenhuma cor for determinada, muda de acordo coma velocidade
    if (this.autoAssign){
        let vel = Math.abs(this.vel.y) + Math.abs(this.vel.x);
        this.cor = `hsl(${100 - Math.min(vel*17, 150 )}, 95%, 40%)`;
    }

    //Desenha a bolinha
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.raio, 0, Math.PI * 2, false);
    ctx.fillStyle = this.cor;
    ctx.fill();
    ctx.restore();
}

Bolinha.prototype.update = function (bolinhas){

    //Velocidade Máxima: 6
    this.vel.x = Math.min(6,this.vel.x);
    this.vel.y = Math.min(6,this.vel.y);

    //Atrito da bolinha ao andar
    this.vel.x *= 0.999;   
    this.vel.y *= 0.999;

    //Move a bolinha
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    //lida com colisões na parede
    if (this.pos.y - this.raio < bordas.minY || this.pos.y + this.raio > bordas.maxY){
        this.vel.y = -this.vel.y;
        this.pos.y += this.vel.y;
    }
    if (this.pos.x - this.raio < bordas.minX || this.pos.x + this.raio > bordas.maxX){
        this.vel.x = -this.vel.x;
        this.pos.x += this.vel.x;
    }

    //verifica interações com o mouse
    if(mousePos.ativado){
        const ang = U.arctan(this.pos, mousePos);
        const distSq = Math.pow(U.distance(this.pos, mousePos),2);
        const oposAng = (ang + Math.PI);
        this.vel.x -= 100*Math.cos(oposAng)/(distSq+0.001);
        this.vel.y -= 100*Math.sin(oposAng)/(distSq+0.001);
    }

    //faz cada bolinha ser repelida por todas as outras
    bolinhas.forEach(bola => {
        if(bola.id !== this.id){
            const ang = U.arctan(this.pos, bola.pos);
            const distSq = Math.pow(U.distance(this.pos, bola.pos), 2);
            const oposAng = (ang + Math.PI);

            //A constante 100 aqui é totalmente arbitraria
            this.vel.x -= 100*Math.cos(oposAng)/(distSq+0.01);
            this.vel.y -= 100*Math.sin(oposAng)/(distSq+0.01); 
        }
    });

}

module.exports = {Bolinha, init}