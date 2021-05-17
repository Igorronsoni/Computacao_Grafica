// Global variables of the system
var scene, camera, renderer, loader;

// Useful
var rotacao;
var loadObj = new Object();

// Useful Functions
var lightInScene = function(){
    var light = new THREE.PointLight(0xffffff, 2);
    light.position.set(0,0,10)
    scene.add(light);
}

var path = function(nome){
    switch (nome){
        case 'Sol':
            return 'Sol/Sol.glb';
        case 'Mercurio':
            return 'Mercurio/Mercurio.glb';
        case 'Venus':
            return 'Venus/Venus.glb';
        case 'Terra':
            return 'Terra/Terra.glb';
        case 'Marte':
            return 'Marte/Marte.glb';
        case 'Jupiter':
            return 'Jupiter/Jupiter.glb';
        case 'Saturno':
            return 'Saturno/Saturno.glb';
        case 'Urano':
            return 'Urano/Urano.glb';
        case 'Netuno':
            return 'Netuno/Netuno.glb';
        case 'Plutao':
            return 'Plutao/Plutao.glb';
        
        case 'Lua':
            return 'Terra/Lua/Lua.glb';
    }
}

var loadCelestialBodies = function() {
    // Sol
    loader.load('models/'.concat(path('Sol')), function(gltf){
        loadObj['Sol'] = gltf.scene;
        scene.add(gltf.scene);
    });
    // Mercurio
    loader.load('models/'.concat(path('Mercurio')), function(gltf){
        loadObj['Mercurio'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Mercurio'].position.x += 1;
    });
    // Venus
    loader.load('models/'.concat(path('Venus')), function(gltf){
        loadObj['Venus'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Venus'].position.x += 2;
    });
    // Terra
    loader.load('models/'.concat(path('Terra')), function(gltf){
        loadObj['Terra'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Terra'].position.x += 3;
    });
    // Lua
    loader.load('models/'.concat(path('Lua')), function(gltf){
        loadObj['Lua'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Lua'].position.x += 3.5;
    });
    // Marte
    loader.load('models/'.concat(path('Marte')), function(gltf){
        loadObj['Marte'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Marte'].position.x += 4;
    });
    // Jupiter
    loader.load('models/'.concat(path('Jupiter')), function(gltf){
        loadObj['Jupiter'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Jupiter'].position.x += 5;
    });
    // Saturno
    loader.load('models/'.concat(path('Saturno')), function(gltf){
        loadObj['Saturno'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Saturno'].position.x += 6;
    });
    // Urano
    loader.load('models/'.concat(path('Urano')), function(gltf){
        loadObj['Urano'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Urano'].position.x += 7;
    });
    // Netuno
    loader.load('models/'.concat(path('Netuno')), function(gltf){
        loadObj['Netuno'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Netuno'].position.x += 8;
    });
    // Plutão
    loader.load('models/'.concat(path('Plutao')), function(gltf){
        loadObj['Plutao'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Plutao'].position.x += 9;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        // Animação de rotação
        for (var body in loadObj){
            if (loadObj[body]){ loadObj[body].rotation.y += 0.01; }
        }
    }
    animate();
}

var init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    renderer = new THREE.WebGLRenderer();
    loader = new THREE.GLTFLoader();

    // Assignments
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Mexer camera
    camera.position.set(0,0,12)
    lightInScene();
    loadCelestialBodies();
}


init()
