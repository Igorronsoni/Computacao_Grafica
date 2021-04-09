// Partes do corpo
class Braco{

	criaOmbro(x,y,z,cor){
		return new THREE.Mesh(new THREE.SphereGeometry(x,y,z), new THREE.MeshBasicMaterial({color: cor}));
	}
	
	criaBraco(x,y,z,cor){
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
		
		// Criação dos braços
		this.bracoG = new Braco();

		// Montando corpo
		this.braco_direito = this.bracoG.criaBraco(1,4,1,this.red);
		//braco_esquerdo = bracoG.criaBraco();
		this.ombro_direito = this.bracoG.criaOmbro(1,32,32,this.white);
		this.tronco = new Tronco().criaTronco(4,7,2,this.materials);
		this.cabeca = new Cabeca().criaCabeca(2,32,32,this.blue);
		//perna_direita = new Perna().criaPerna();
		//perna_esquerda = new Perna().criaPerna();

		// Pivos
		this.p_ombro_direito = new THREE.Group();

		// Dicionario de partes do corpo
		this.puppet = this.montar();
	}

	/*
	@ name: Monta
	@ Description: Gera o personagem
	*/
	montar(){
		// Adiciona as partes do corpo ao dicionario
		let personagem = [];
		
		personagem["tronco"] = this.tronco;
		personagem["cabeca"] = this.cabeca;
		personagem["ombro_direito"] = this.ombro_direito;
		personagem["p_ombro_direito"] = this.p_ombro_direito;
		personagem["braco_direito"] = this.braco_direito;

		// Adiciona as partes do corpo para o tronco 
		this.tronco.add(this.cabeca);
		this.tronco.add(this.ombro_direito);
				
		this.ombro_direito.add(this.p_ombro_direito); // Pivo ombro-tronco

		this.p_ombro_direito.add(this.braco_direito) // Braço direito-ombro


		// Posiciona as partes do corpo
		this.cabeca.position.y = this.tronco.position.y + 6;
		this.ombro_direito.position.y = this.tronco.position.y + 3;
		this.ombro_direito.position.x = this.tronco.position.y + 3;
		this.braco_direito.position.y -= 2.7;

		return personagem;
	}
}

var scene;
var camera;
var renderer;
// Instancia o nosso personagem
const corpo = new Corpo();

var init = function (){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 150);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera.position.z = 80;
	camera.position.x = 0;
	camera.position.y = 2;
	
	// Carrega o corpo para ser renderizado
	scene.add(corpo.tronco);
	animation();

	// Eventos do teclado
	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

	// Eventos do mouse
	document.addEventListener('mousewheel', onMouseWheel);
	document.addEventListener('mousemove', onMouseMove(corpo));
	document.addEventListener('mousedown', onMouseClick);
	document.addEventListener('mouseup', onMouseUp);

	
};

var clicando = false;
var mousePosAnterior = {
	x:0,
	y:0
}

var onMouseMove = function(e){
	let diferencaMovimento = {
		x: e.offsetX - mousePosAnterior.x,
		y: e.offsetY - mousePosAnterior.y
	}

	if (clicando){

		let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
							paraRadianos(diferencaMovimento.x)*0.5,
							0,
							'XYZ')
		);
		corpo.puppet["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, corpo.puppet["tronco"].quaternion);
	}
	mousePosAnterior = {
		x: e.offsetX,
		y: e.offsetY
	}
};

var onMouseClick = function(e){
	clicando = true;
};

var onMouseUp = function(e){
	clicando = false;
};

var onMouseWheel = function (e){
	//for (let el in elementos){
		corpo.puppet["tronco"].scale.x += (e.deltaY > 0)?-0.1:0.1;
		corpo.puppet["tronco"].scale.y += (e.deltaY > 0)?-0.1:0.1;
		corpo.puppet["tronco"].scale.z += (e.deltaY > 0)?-0.1:0.1;
}

var key_r = false;
var key_space = false;
var key_q = false;

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		key_q = false;
	}
}


var apertouButao =  function(e){

	if (e.keyCode == 82){ //r
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}
}

var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	if (key_space){ //movimento frente
		if (corpo.persomagem["p_ombro_direito"].rotation.x < -2.83 || corpo.puppet["p_ombro_direito"].rotation.x > 1.3)
			velocidadeOmbroDireitoC*=-1;

		corpo.puppet["p_ombro_direito"].rotation.x += velocidadeOmbroDireitoC;
	}
	if (key_r){
		if (corpo.puppet["p_ombro_direito"].rotation.z < 0 || corpo.puppet["p_ombro_direito"].rotation.z > 1.4)
			velocidadeOmbroDireitoL*=-1;

			corpo.puppet["p_ombro_direito"].rotation.z += velocidadeOmbroDireitoL;
	}
	if (key_q){
		corpo.puppet["tronco"].rotation.y += 0.01;
	}
	
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init