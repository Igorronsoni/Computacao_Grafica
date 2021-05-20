var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var vaca;
var elefante;
var cachorro;
var ovelha;
var veado;
var camelo;
var galinha;
var panda;
var pterodactil;
var girafa;

var lastLook = null;
var looking = false;

async function olhar(target) {
    if (looking) return;
    looking = true

    pos = new THREE.Vector3(lastLook.position.x, lastLook.position.y, lastLook.position.z)
    lastLook = target

    while (1) {
        let canbreak=true;

        console.log(pos)

        if (Math.abs(target.position.y-pos.y)>0.01) {
            canbreak = false;
            pos.y=(target.position.y+pos.y)/2
        }

        if (Math.abs(target.position.x-pos.x)>0.01) {
            canbreak = false;
            pos.x=(target.position.x+pos.x)/2
        }

        if (Math.abs(target.position.z-pos.z)>0.01) {
            canbreak = false;
            pos.z=(target.position.z+pos.z)/2
        }

        camera.lookAt(pos)

        renderer.render( scene, camera );

        if (canbreak) break;

        await new Promise(r => setTimeout(r, 25));
    }

    looking = false
}

var guiFunction = function(){
    const gui = new dat.GUI();

    param = {
        vaca: () => {olhar(vaca)},
        elefante: () => {olhar(elefante)},
        cachorro: () => {olhar(cachorro)},
        ovelha: () => {olhar(ovelha)},
        veado: () => {olhar(veado)},
        camelo: () => {olhar(camelo)},
        galinha: () => {olhar(galinha)},
        panda: () => {olhar(panda)},
        pterodactil: () => {olhar(pterodactil)},
        girafa: () => {olhar(girafa)}
    };    

    gui.add(param, 'vaca')
    gui.add(param, 'elefante')
    gui.add(param, 'cachorro')
    gui.add(param, 'ovelha')
    gui.add(param, 'veado')
    gui.add(param, 'camelo')
    gui.add(param, 'galinha')
    gui.add(param, 'panda')
    gui.add(param, 'pterodactil')
    gui.add(param, 'girafa')

    gui.open();
   
};

var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        new THREE.MeshBasicMaterial({map : groundTexture})
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    fbxLoader = new THREE.FBXLoader();
 
    fbxLoader.load(
        'assets/models/teste.fbx', 
        function(object){
            vaca = object;

            // object.traverse( function ( child ) {
            //             if ( child instanceof THREE.Mesh ) {
            //                 child.material.map = textureLoader.load("assets/textura/textures.png");
            //                 child.material.shininess = 0;
            //             }
            //         });

            vaca.scale.x = 0.15;
            vaca.scale.y = 0.15;
            vaca.scale.z = 0.15;

            vaca.position.z = 40;
            vaca.position.x = 70;
            vaca.position.y = 0;

            vaca.castShadow = true;

            scene.add(vaca);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Vaca 1 pronto!");
        },
        function (error){
            console.log("Error vaca 1: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Elephant.FBX', 
        function(object){
            elefante = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material.map = textureLoader.load("assets/textura/UV Elephant.png");
                    child.material.shininess = 0;
                }
            });

            elefante.scale.x = 0.04;
            elefante.scale.y = 0.04;
            elefante.scale.z = 0.04;

            elefante.position.z = 300;
            elefante.position.x = 100;
            elefante.position.y = 0;
            
            elefante.rotation.y = Math.PI
            
            elefante.castShadow = true;

            scene.add(elefante);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Elefante pronto!");
        },
        function (error){
            console.log("Error elefante: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Labrador.fbx', 
        function(object){
            cachorro = object;

            cachorro.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/UV Labrador.png");
                            child.material.shininess = 0;
                        }
                    });

            cachorro.scale.x = 0.03;
            cachorro.scale.y = 0.03;
            cachorro.scale.z = 0.03;

            cachorro.position.x = -70
            cachorro.position.z = 80
            cachorro.position.y = 2


            cachorro.rotation.y += Math.PI/2;

            cachorro.castShadow = true;

            scene.add(cachorro);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Cachorro 1 pronto!");
        },
        function (error){
            console.log("Error cachorro 1: " + error);
        }
    );

    fbxLoader.load(
        'assets/models/Sheep.fbx', 
        function(object){
            ovelha = object;

            ovelha.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material.map = textureLoader.load("assets/textura/UVSheep.png");
                    child.material.shininess = 0;
                }
            });

            ovelha.scale.x = 0.07;
            ovelha.scale.y = 0.07;
            ovelha.scale.z = 0.07;

            ovelha.position.x = -200
            ovelha.position.z = 200
            ovelha.position.y = 2


            ovelha.rotation.y += Math.PI/2;

            ovelha.castShadow = true;

            scene.add(ovelha);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Ovelha pronto!");
        },
        function (error){
            console.log("Error ovelha: " + error);
        }
    );

    fbxLoader.load(
        'assets/models/Deer.fbx', 
        function(object){
            veado = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/UV Deer.png");
                            child.material.shininess = 0;
                        }
                    });

            veado.scale.x = 0.08;
            veado.scale.y = 0.08;
            veado.scale.z = 0.08;

            veado.rotation.y = Math.PI*1.25

            veado.position.y = 0
            veado.position.z = -5
            veado.position.x = -40

            veado.castShadow = true;

            scene.add(veado); 
            
            console.log(veado)
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "Veado 1 pronto!");
        },
        function (error){
            console.log("Error veado 1: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Camel_low.FBX', 
        function(object){
            camelo = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material.map = textureLoader.load("assets/textura/UVcamel.png");
                    child.material.shininess = 0;
                }
            });

            camelo.scale.x = 10;
            camelo.scale.y = 10;
            camelo.scale.z = 10;

            camelo.rotation.y = Math.PI

            camelo.position.z = 100;
            camelo.position.x = -300;
            camelo.position.y = 0;

            camelo.castShadow = true;

            scene.add(camelo); 
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Camelo pronto!");
        },
        function (error){
            console.log("Error Camelo: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Chicken.fbx', 
        function(object){
            galinha = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/UV Chicken.png");
                            child.material.shininess = 0;
                        }
                    });

            galinha.scale.x = 0.03;
            galinha.scale.y = 0.03;
            galinha.scale.z = 0.03;

            galinha.position.x = -100
            galinha.position.z = 4
            galinha.position.y = 2

            galinha.castShadow = true;

            scene.add(galinha); 
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Galinha pronto!");
        }, 
        function (error){
            console.log("Error galinha: " + error);
        }  
    );

    fbxLoader.load(
        'assets/models/Panda.fbx',  
        function(object){
            panda = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/Panda_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            panda.scale.x = 0.06;
            panda.scale.y = 0.06;
            panda.scale.z = 0.06;

            panda.position.z = -5;
            panda.position.x = 10;
            panda.position.y = 0;


            panda.rotation.y -= 0.5;

            panda.castShadow = true;

            scene.add(panda);
            lastLook = panda;
            olhar(panda);
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Panda pronto!");
        },
        function (error){
            console.log("Error panda: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Pterodactyl.fbx',
        function(object){
            pterodactil = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/UV Pterodactyl.png");
                            child.material.shininess = 0;
                        }
                    });

            pterodactil.scale.x = 0.05;
            pterodactil.scale.y = 0.05;
            pterodactil.scale.z = 0.05;

            pterodactil.position.z = 0;
            pterodactil.position.x = 40;
            pterodactil.position.y = 90;


            pterodactil.rotation.y = Math.PI*1.3;

            pterodactil.castShadow = true;

            scene.add(pterodactil);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Ptero pornto!");
        },
        function (error){
            err = error
            console.log("Error ptero: " + error);
        } 
    );

    fbxLoader.load(
        'assets/models/Giraffe.fbx', 
        function(object){
            girafa = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = textureLoader.load("assets/textura/Giraffe_UV.png");
                            child.material.shininess = 0;
                        }
                    });

            girafa.scale.x = 0.1;
            girafa.scale.y = 0.1;
            girafa.scale.z = 0.1;

            girafa.position.z = 80;
            girafa.position.x = 200;
            girafa.position.y = 13;


            girafa.rotation.y = Math.PI*1.3;

            girafa.castShadow = true;

            scene.add(girafa);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " Girrafa pronto!");
        },
        function (error){
            err = error
            console.log("Error girafa: " + error);
        } 
    );
}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 600 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    loadObj();

    camera.position.z = 100;
    camera.position.y = 30;

    spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
    spotLight.position.set( 100, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );
    
    scene.add(new THREE.AmbientLight( 0xffffff ));


    criaGround();

    guiFunction();

    render();
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}