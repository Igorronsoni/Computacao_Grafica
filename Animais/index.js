var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var cow;
var dog;
var deer;
var chicken;
var panda;
var pterodactil;

var lastLook = null;
var looking = false;

async function olhar(target) {
    if (looking) return;
    looking = true

    pos = new THREE.Vector3(lastLook.position.x, lastLook.position.y, lastLook.position.z)
    lastLook = target

    while (1) {
        let canbreak=true;

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
        vaca: () => { olhar(cow) },
        cachorro: () => { olhar(dog) },
        veado: () => { olhar(deer) },
        galinha: () => { olhar(chicken) },
        panda: () => { olhar(panda) },
        pterodactil: () => { olhar(pterodactil) }
        
    };    

    gui.add(param, 'vaca')
    gui.add(param, 'cachorro')
    gui.add(param, 'veado')
    gui.add(param, 'galinha')
    gui.add(param, 'panda')
    gui.add(param, 'pterodactil')

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
    objLoader = new THREE.OBJLoader();
 
    objLoader.load( // Carrega arquivo de animal
        'assets/Cow.obj', 
        function(object){
            cow = object;

            cow.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x003484");
                        }
                    });

                    cow.scale.x = 3;
                    cow.scale.y = 3;
                    cow.scale.z = 3;

                    cow.position.z = 40;
                    cow.position.x = 70;
                    cow.position.y = 0;

                    cow.castShadow = true;

            scene.add(cow);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "pronto!");
        },
        function (error){
            console.log("error: " + error);
        } 
    );

    objLoader.load( // Carrega arquivo de animal
        'assets/dog.obj', 
        function(object){
            dog = object;

            dog.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0x003484");
                        }
                    });

                    dog.scale.x = 0.3;
                    dog.scale.y = 0.3;
                    dog.scale.z = 0.3;

                    dog.position.x = -70
                    dog.position.z = 80
                    dog.position.y = 2


                    dog.rotation.z += Math.PI;
                    dog.rotation.x += -Math.PI/2;

                    dog.castShadow = true;

                    scene.add(dog);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " pronto!");
        },
        function (error){
            console.log("error: " + error);
        } 
    );

    objLoader.load( // Carrega arquivo de animal
        'assets/Deer.obj', 
        function(object){
            deer = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xfa02ed");
                        }
                    });

            deer.scale.x = 5;
            deer.scale.y = 5;
            deer.scale.z = 5;

            deer.rotation.y = Math.PI*1.25

            deer.position.y = 0
            deer.position.z = -5
            deer.position.x = -10

            deer.castShadow = true;

            scene.add(deer); 
                    },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " pronto!");
        },
        function (error){
            console.log("error: " + error);
        } 
    );

    objLoader.load( // Carrega arquivo de animal
        'assets/Chicken.obj', 
        function(object){
            chicken = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xff0000");
                        }
                    });

                    chicken.scale.x = 3;
                    chicken.scale.y = 3;
                    chicken.scale.z = 3;

                    chicken.position.x = -100
                    chicken.position.z = -4
                    chicken.position.y = 0

                    chicken.castShadow = true;

            scene.add(chicken); 
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " pronto!");
        },
        function (error){
            console.log("error: " + error);
        } 
    );

    objLoader.load( // Carrega arquivo de animal
        'assets/Panda.obj', 
        function(object){
            panda = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xaa2355");
                        }
                    });

            panda.scale.x =3;
            panda.scale.y = 3;
            panda.scale.z = 3;

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
            console.log((andamento.loaded / andamento.total *100) + " pronto!");
        },
        function (error){
            console.log("error: " + error);
        }
    );

    objLoader.load( // Carrega arquivo de animal
        'assets/Pterodactyl.obj',
        function(object){
            pterodactil = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex("0xaaaa00");
                        }
                    });

            pterodactil.scale.x = 2;
            pterodactil.scale.y = 2;
            pterodactil.scale.z = 2;

            pterodactil.position.z = 0;
            pterodactil.position.x = 40;
            pterodactil.position.y = 90;


            pterodactil.rotation.y = Math.PI*1.3;

            pterodactil.castShadow = true;

            scene.add(pterodactil);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " pronto!");
        },
        function (error){
            console.log("error: " + error);
        } 
    );


}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 180 );

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