/*
O nome do nosso personagem é Rodolfo
*/ 

// Partes do corpo
class Braco{
	criaJunta(x,y,z,cor){
		return new THREE.Mesh(new THREE.SphereGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}

	criaOsso(x,y,z,cor){
		return new THREE.Mesh(new THREE.BoxGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}
}

class Tronco{
	criaTronco(x,y,z,cores){
		return new THREE.Mesh(new THREE.BoxGeometry(x,y,z), cores);
	}
}

class Perna{
	criaPerna(x,y,z,cor){
		return new THREE.Mesh(new THREE.BoxGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}

	criaJunta(x,y,z,cor){
		return new THREE.Mesh(new THREE.SphereGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}
}

class Cabeca{
	criaCabeca(x,y,z,cor){
		return new THREE.Mesh(new THREE.SphereGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}
}

class Corpo {
	constructor(){
		// Cores disponiveis
		this.white = new THREE.Color(255,255,255);
		this.red = new THREE.Color(1,0,0);
		this.green = new THREE.Color(0,1,0);
		this.blue = new THREE.Color(0,0,1);
		// Conjunto de cores
		this.materials = [
			new THREE.MeshBasicMaterial({color: this.blue}),
			new THREE.MeshBasicMaterial({color: this.blue}),
			new THREE.MeshBasicMaterial({color: this.blue}),
			new THREE.MeshBasicMaterial({color: this.blue}),
			new THREE.MeshBasicMaterial({color: this.green}),
			new THREE.MeshBasicMaterial({color: this.red})
		],

		this.bracoD = new Braco();
		this.bracoE = new Braco();
		this.pernaD = new Perna();
		this.pernaE = new Perna();

		// Montando corpo
		// Braços
		this.braco_direito = this.bracoD.criaOsso(1,3,1,this.red);
		this.braco_esquerdo = this.bracoE.criaOsso(1,3,1, this.red);
		this.ombro_direito = this.bracoD.criaJunta(1,32,32,this.white);
		this.ombro_esquerdo = this.bracoE.criaJunta(1,32,32,this.white);
		this.cutovelo_direito = this.bracoD.criaJunta(1,32,32, this.white);
		this.cutovelo_esquerdo = this.bracoE.criaJunta(1,32,32, this.white);
		this.antebraco_direito = this.bracoD.criaOsso(1,3,1,this.red);
		this.antebraco_esquerdo = this.bracoD.criaOsso(1,3,1,this.red);

		// Cabeca e tronco
		this.tronco = new Tronco().criaTronco(4,7,2,this.materials);
		this.cabeca = new Cabeca().criaCabeca(2,32,32,this.blue);
		
		// Pernas
		this.junta_perna_direita = this.pernaD.criaJunta(1,32,32,this.white);
		this.junta_perna_esquerda = this.pernaE.criaJunta(1,32,32,this.white);
		this.perna_direita = this.pernaD.criaPerna(1,5,1, this.green);
		this.perna_esquerda = this.pernaE.criaPerna(1,5,1,this.green);

		// Pivos
		this.p_ombro_direito = new THREE.Group();
		this.p_ombro_esquerdo = new THREE.Group();
		this.p_junta_perna_direita = new THREE.Group();
		this.p_junta_perna_esquerda = new THREE.Group();
		this.p_cutovelo_direito = new THREE.Group();
		this.p_cutovelo_esquerdo = new THREE.Group();

		// Dicionario de partes do corpo
		this.puppet = this.montar();
	}

	/*
	@ Nome: Montar
	@ Descrição: Gera o personagem
	*/
	montar(){
		// Adiciona as partes do corpo ao dicionario
		let personagem = [];
		
		personagem["tronco"] = this.tronco;
		personagem["cabeca"] = this.cabeca;
		personagem["ombro_direito"] = this.ombro_direito;
		personagem["ombro_esquerdo"] = this.ombro_esquerdo;
		personagem["p_ombro_direito"] = this.p_ombro_direito;
		personagem["p_ombro_esquerdo"] = this.p_ombro_esquerdo;
		personagem["braco_direito"] = this.braco_direito;
		personagem["braco_esquerdo"] = this.braco_esquerdo;
		personagem["junta_perna_direita"] = this.junta_perna_direita;
		personagem["perna_direita"] = this.perna_direita;
		personagem["cutovelo_direito"] = this.cutovelo_direito;
		personagem["cutovelo_esquerdo"] = this.cutovelo_esquerdo;
		personagem["p_cutovelo_direito"] = this.p_cutovelo_direito;
		personagem["p_cutovelo_esquerdo"] = this.p_cutovelo_esquerdo;		
		personagem["antebraco_direito"] = this.antebraco_direito;
		personagem["antebraco_esquerdo"] = this.antebraco_esquerdo;

		// Adiciona as partes do corpo para o tronco 
		this.tronco.add(this.cabeca);
		this.tronco.add(this.ombro_direito);
		this.tronco.add(this.ombro_esquerdo);
		this.tronco.add(this.junta_perna_direita);
		this.tronco.add(this.junta_perna_esquerda);

		this.ombro_direito.add(this.p_ombro_direito); // Pivo ombro-tronco
		this.ombro_esquerdo.add(this.p_ombro_esquerdo); // Pivo ombro-troco
		this.p_ombro_direito.add(this.braco_direito); // Braço direito-ombro
		this.p_ombro_esquerdo.add(this.braco_esquerdo); // Braço esquerdo-ombro
		this.braco_direito.add(this.cutovelo_direito); // Cutovelo direito
		this.braco_esquerdo.add(this.cutovelo_esquerdo); // Cutovelo esquerdo
		this.cutovelo_direito.add(this.p_cutovelo_direito); // Pivo cutovelo direito
		this.cutovelo_esquerdo.add(this.p_cutovelo_esquerdo); // Pivo cutovelo esquerdo
		this.p_cutovelo_direito.add(this.antebraco_direito); // Antebraco direito
		this.p_cutovelo_esquerdo.add(this.antebraco_esquerdo); // Antebraco esquerdo

		this.junta_perna_direita.add(this.p_junta_perna_direita); // Pivo junta perna direita
		this.p_junta_perna_direita.add(this.perna_direita); // Perna direita
		this.junta_perna_esquerda.add(this.p_junta_perna_esquerda); // Pivo junta perna esquerda
		this.p_junta_perna_esquerda.add(this.perna_esquerda); // Perna esquerda
		
		// Posiciona as partes do corpo
		// Cabeca
		this.cabeca.position.y = this.tronco.position.y + 6;
		// Ombros
		this.ombro_direito.position.y = this.tronco.position.y + 3;
		this.ombro_direito.position.x = this.tronco.position.x + 3;
		this.ombro_esquerdo.position.y = this.tronco.position.y + 3;
		this.ombro_esquerdo.position.x = this.tronco.position.x - 3;
		// Braços
		this.braco_direito.position.y -= 2;
		this.braco_esquerdo.position.y -= 2;
		// Cutovelos
		this.cutovelo_direito.position.y = this.braco_direito.position.y;
		this.cutovelo_esquerdo.position.y = this.braco_esquerdo.position.y;
		// Antebraços
		this.antebraco_direito.position.y -= 2;
		this.antebraco_esquerdo.position.y -= 2;
		// Juntas
		this.junta_perna_direita.position.y = this.tronco.position.y - 4.3;
		this.junta_perna_direita.position.x = this.tronco.position.x - 1.5;
		this.junta_perna_esquerda.position.y = this.tronco.position.y - 4.3;
		this.junta_perna_esquerda.position.x = this.tronco.position.x + 1.5;
		// Pernas
		this.perna_direita.position.y -= 2.5;
		this.perna_esquerda.position.y -= 2.5;  

		return personagem;
	}
}

// Variavei Globais
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 150);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;

// Mouse
var mousePos = {
	x: 0,
	y: 0
};
var click = false;

// Teclas
var teclas = {
	key_q: false,
	key_r: false,
	key_space: false
}

// Instancia o nosso personagem
const corpo = new Corpo();

// Funções necessarias
// Função extra para a transformação do valore recebido para radianos
var paraRadianos = function(angulo){
	return angulo * (Math.PI/180);
};

// Eventos do mouse 
var onMouseMove = function(e){
	
	let diferencaMovimento = {
		x: e.offsetX - mousePos.x,
		y: e.offsetY - mousePos.y
	}
	
	if (click){

		let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
							paraRadianos(diferencaMovimento.x)*0.5,
							0,
							'XYZ')
		);
		corpo.puppet["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, corpo.puppet["tronco"].quaternion);
	}
	mousePos = {
		x: e.offsetX,
		y: e.offsetY
	}
}
var onMouseClick = function(e){
	click = true;
};
var onMouseUnclick = function(e){
	click = false;
};
var onMouseWheel = function(e){
	corpo.puppet["tronco"].scale.x += (e.deltaY > 0)? -0.1 : 0.1;
	corpo.puppet["tronco"].scale.y += (e.deltaY > 0)? -0.1 : 0.1;
	corpo.puppet["tronco"].scale.z += (e.deltaY > 0)? -0.1 : 0.1;
}

// Eventos do teclado
var botaoUp = function(e){
	if (e.keyCode == 82){ //r
		teclas.key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		teclas.key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		teclas.key_q = false;
	}
}

var botaoDown = function(e){
	if (e.keyCode == 82){ //r
		teclas.key_r = true;
	}
	if (e.keyCode == 32){ //espaço
		teclas.key_space= true;
	}
	if (e.keyCode == 81){ //espaço
		teclas.key_q = true;
	}
}

/* 
@ Nome: animation
@ Descrição: Responsavel pela animação do personagem
*/
function animation(){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	if (teclas.key_space){ //movimento frente
		if (corpo.puppet["p_ombro_direito"].rotation.x < -2.83 || corpo.puppet["p_ombro_direito"].rotation.x > 1.3)
			velocidadeOmbroDireitoC*=-1;

		corpo.puppet["p_ombro_direito"].rotation.x += velocidadeOmbroDireitoC;
	}
	if (teclas.key_r){
		if (corpo.puppet["p_ombro_direito"].rotation.z < 0 || corpo.puppet["p_ombro_direito"].rotation.z > 1.4)
			velocidadeOmbroDireitoL*=-1;

			corpo.puppet["p_ombro_direito"].rotation.z += velocidadeOmbroDireitoL;
	}
	if (teclas.key_q){
		corpo.puppet["tronco"].rotation.y += 0.01;
	}
	
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function init(){	
	camera.position.z = 80;
	camera.position.x = 0;
	camera.position.y = 2;

	// Carrega o corpo para ser renderizado
	scene.add(corpo.tronco);
	animation();

	// Eventos do teclado
	document.addEventListener('keydown', botaoDown);
	document.addEventListener('keyup', botaoUp);
	
	// Eventos do mouse
	document.addEventListener('mousewheel', onMouseWheel);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mousedown', onMouseClick);
	document.addEventListener('mouseup', onMouseUnclick);
};

window.onload = this.init