// Global variables of the system
var scene, camera, renderer, loader;

// Useful
var loadObj = new Object();
var proximaMovimentacao = new Object();
var mousePos = {
	x: 0,
	y: 0
};
var velMouse = 3;
var velocidade = 0.4;
var visualiza = 'Sol';

// Useful Functions
/* Luz da cena */ 
var lightInScene = function(){
    var light = new THREE.PointLight(0xffffff, 2);
    light.position.set(0,0,10)
    scene.add(light);
}
/* Transformação de valores */
var paraRadianos = function(angulo){
	return angulo * (Math.PI/180);
};

// Visão dos planetas pela GUI
var olhar =  function(target) {
    var distanciaSegura = {
        x: target.position.x,
        y: target.position.y,
        z: 4 * target.scale.z + target.position.z
    }

    camera.position.set(distanciaSegura.x,distanciaSegura.y,distanciaSegura.z)
}

// Carregamento de modelos
var searchPlanet = function(nome){
    switch (nome){
        case 'Sol':
            return {
                path: 'Sol/Sol.glb',
                velocidade: 0.04,
                rotx: 0,
                roty: 1,
                rotz: 0 
             };
        case 'Mercurio':
            return {
                path: 'Mercurio/Mercurio.glb',
                velocidade: 0.009,
                rotx: 0,
                roty: 1,
                rotz: 0 
            };
        case 'Venus':
            return {
                path: 'Venus/Venus.glb',
                velocidade: -0.008,
                rotx: 0,
                roty: 1,
                rotz: 0 
            };
        case 'Terra':
            return {
                path: 'Terra/Terra.glb',
                velocidade: 0.05,
                rotx: 1,
                roty: 1,
                rotz: 0 
            };
        case 'Marte':
            return {
                path: 'Marte/Marte.glb',
                velocidade: 0.01,
                rotx: 1,
                roty: 1,
                rotz: 0 
            };
        case 'Jupiter':
            return {
                path: 'Jupiter/Jupiter.glb',
                velocidade: 0.30,
                rotx: 0,
                roty: 1,
                rotz: 0 
            };
        case 'Saturno':
            return {
                path: 'Saturno/Saturno.glb',
                velocidade: 0.055,
                rotx: 1,
                roty: 1,
                rotz: 0 
            };
        case 'Urano':
            return {
                path: 'Urano/Urano.glb',
                velocidade: 0.08,
                rotx: 1,
                roty: 0,
                rotz: 0 
            };
        case 'Netuno':
            return {
                path: 'Netuno/Netuno.glb',
                velocidade: -0.06,
                rotx: 1,
                roty: 1,
                rotz: 0 
            };
        case 'Plutao':
            return {
                path: 'Plutao/Plutao.glb',
                velocidade: 0.008,
                rotx: 0,
                roty: 1,
                rotz: 0 
            };
        
        case 'Lua':
            return {
                path: 'Terra/Lua/Lua.glb',
                velocidade: 0.1,
                rotx: 0,
                roty: 1,
                rotz: 0 
            };
    }
}

// Função responsavel por fazer os planetas realizarem o fenomeno de rotação e translação
const movimentacao = function(planet){
    objPlan = searchPlanet(planet);
    var velPlaneta = objPlan.velocidade;

    // Rotação
    if (objPlan.rotx != 0){ loadObj[planet].rotation.x += velPlaneta * velocidade; }
    if (objPlan.roty != 0){ loadObj[planet].rotation.y += velPlaneta * velocidade; }
    if (objPlan.rotz != 0){ loadObj[planet].rotation.z += velPlaneta * velocidade; }
    
    if (planet != 'Sol'){
        // Verificação de onde o planeta está
        if (loadObj[planet].position.z >= -1 && loadObj[planet].position.z <= 1){
            if (loadObj[planet].position.x > 0){
                proximaMovimentacao[planet].x = -1;
                proximaMovimentacao[planet].z = -1;
            }else{
                proximaMovimentacao[planet].x = 1;
                proximaMovimentacao[planet].z = 1;
            }
        }else if (loadObj[planet].position.x >= -1 && loadObj[planet].position.x <= 1){
            if (loadObj[planet].position.z > 0){
                proximaMovimentacao[planet].x = 1;
                proximaMovimentacao[planet].z = -1;
            }else{
                proximaMovimentacao[planet].x = -1;
                proximaMovimentacao[planet].z = 1;
            }   
        }

        // Translação
        loadObj[planet].position.x += proximaMovimentacao[planet].x * ((velPlaneta * velocidade) + 1)
        loadObj[planet].position.z += proximaMovimentacao[planet].z * ((velPlaneta * velocidade) + 1)
    
        // Movimenta a camera
        if (planet == visualiza){
            olhar(loadObj[planet])
        }
    }
}

// Carrega os Planetas
var loadCelestialBodies = function() {
    // Sol
    loader.load('models/'.concat(searchPlanet('Sol').path), function(gltf){
        loadObj['Sol'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Sol'].scale.x *= 284.95;
        loadObj['Sol'].scale.y *= 284.95;
        loadObj['Sol'].scale.z *= 284.95;
        olhar(loadObj['Sol'])
    });
    // Mercurio
    loader.load('models/'.concat(searchPlanet('Mercurio').path), function(gltf){
        loadObj['Mercurio'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Mercurio'].position.z += (5.8 * 100);
        proximaMovimentacao['Mercurio'] = {
            x: -1,
            z: -1
        };
    });
    // Venus
    loader.load('models/'.concat(searchPlanet('Venus').path), function(gltf){
        loadObj['Venus'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Venus'].position.x += (10.8 * 100);
        loadObj['Venus'].scale.x *= 2.48;
        loadObj['Venus'].scale.y *= 2.48;
        loadObj['Venus'].scale.z *= 2.48;
        proximaMovimentacao['Venus'] = {
            x: -1,
            z: -1
        };;
    });
    // Lua
    // loader.load('models/'.concat(searchPlanet('Lua').path), function(gltf){
    //     loadObj['Lua'] = gltf.scene;
    //     scene.add(gltf.scene);
    //     loadObj['Lua'].position.x += (15 + 2 * 100);
    //     loadObj['Lua'].scale.x *= 0.71;
    //     loadObj['Lua'].scale.y *= 0.71;
    //     loadObj['Lua'].scale.z *= 0.71;
    //     proximaMovimentacao['Lua'] = {
    //         x: -1,
    //         z: -1
    //     };;
        
    //     // pivo.add(loadObj['Lua']);

    // });
    // Terra
    loader.load('models/'.concat(searchPlanet('Terra').path), function(gltf){
        loadObj['Terra'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Terra'].position.z -= (15 * 100);
        loadObj['Terra'].rotation.z -= 0.3;
        loadObj['Terra'].scale.x *= 2.61;
        loadObj['Terra'].scale.y *= 2.61;
        loadObj['Terra'].scale.z *= 2.61;
        proximaMovimentacao['Terra'] = {
            x: -1,
            z: -1
        };
    });
    
    // Marte
    loader.load('models/'.concat(searchPlanet('Marte').path), function(gltf){
        loadObj['Marte'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Marte'].position.x += (23 * 100);
        loadObj['Marte'].rotation.z -= 0.3;
        loadObj['Marte'].scale.x *= 1.39;
        loadObj['Marte'].scale.y *= 1.39;
        loadObj['Marte'].scale.z *= 1.39;
        proximaMovimentacao['Marte'] = {
            x: -1,
            z: -1
        };
    });
    // Jupiter
    loader.load('models/'.concat(searchPlanet('Jupiter').path), function(gltf){
        loadObj['Jupiter'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Jupiter'].position.x += (78 * 100);
        loadObj['Jupiter'].scale.x *= 29.31;
        loadObj['Jupiter'].scale.y *= 29.31;
        loadObj['Jupiter'].scale.z *= 29.31;
        proximaMovimentacao['Jupiter'] = {
            x: -1,
            z: -1
        };
    });
    // Saturno
    loader.load('models/'.concat(searchPlanet('Saturno').path), function(gltf){
        loadObj['Saturno'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Saturno'].position.x += (143 * 100);
        loadObj['Saturno'].rotation.z -= 0.3;
        loadObj['Saturno'].scale.x *= 24.71;
        loadObj['Saturno'].scale.y *= 24.71;
        loadObj['Saturno'].scale.z *= 24.71;
        proximaMovimentacao['Saturno'] = {
            x: -1,
            z: -1
        };
    });
    // Urano
    loader.load('models/'.concat(searchPlanet('Urano').path), function(gltf){
        loadObj['Urano'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Urano'].position.z -= (287 * 100);
        loadObj['Urano'].rotation.z += 4.74;
        loadObj['Urano'].scale.x *= 20.95;
        loadObj['Urano'].scale.y *= 20.95;
        loadObj['Urano'].scale.z *= 20.95;
        proximaMovimentacao['Urano'] = {
            x: -1,
            z: -1
        };
    });
    // Netuno
    loader.load('models/'.concat(searchPlanet('Netuno').path), function(gltf){
        loadObj['Netuno'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Netuno'].position.x += (450 * 100);
        loadObj['Netuno'].scale.x *= 20.31;
        loadObj['Netuno'].scale.y *= 20.31;
        loadObj['Netuno'].scale.z *= 20.31;
        proximaMovimentacao['Netuno'] = {
            x: -1,
            z: -1
        };
    });
    // Plutão
    loader.load('models/'.concat(searchPlanet('Plutao').path), function(gltf){
        loadObj['Plutao'] = gltf.scene;
        scene.add(gltf.scene);
        loadObj['Plutao'].position.x += (592 * 100);
        loadObj['Plutao'].scale.x *= 0.47;
        loadObj['Plutao'].scale.y *= 0.47;
        loadObj['Plutao'].scale.z *= 0.47;
        proximaMovimentacao['Plutao'] = {
            x: -1,
            z: -1
        };
    });
        
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Animação de rotação e translação
        for (var body in loadObj){
            if (loadObj[body]){ 
                movimentacao(body) 
            }
        }
    }
    animate();
}
// Gui
var guiFunction = function(){
    const gui = new dat.GUI();

    param = {
        Sol: () => { olhar(loadObj['Sol']); visualiza = 'Sol' },
        Mercurio: () => { olhar(loadObj['Mercurio']); visualiza = 'Mercurio' },
        Venus: () => { olhar(loadObj['Venus']); visualiza = 'Venus' },
        Terra: () => { olhar(loadObj['Terra']); visualiza = 'Terra' },
        Marte: () => { olhar(loadObj['Marte']); visualiza = 'Marte'},
        Jupiter: () => { olhar(loadObj['Jupiter']); visualiza = 'Jupiter' },
        Saturno: () => { olhar(loadObj['Saturno']); visualiza = 'Saturno' },
        Urano: () => { olhar(loadObj['Urano']); visualiza = 'Urano' },
        Netuno: () => { olhar(loadObj['Netuno']); visualiza = 'Netuno' },
        Plutao: () => { olhar(loadObj['Plutao']);  visualiza = 'Plutao' },

        // Lua: () => { olhar(loadObj['Lua']);  visualiza = 'Lua' },
        //Satelite: () => { olhar(loadObj['Lua']) }        
    };    

    gui.add(param, 'Sol')
    gui.add(param, 'Mercurio')
    gui.add(param, 'Venus')
    gui.add(param, 'Terra')
    gui.add(param, 'Marte')
    gui.add(param, 'Jupiter')
    gui.add(param, 'Saturno')
    gui.add(param, 'Urano')
    gui.add(param, 'Netuno')
    gui.add(param, 'Plutao')

    // gui.add(param, 'Lua')
    // gui.add(param, 'Satelite')

    gui.open();
   
};

// Movimentação com mouse
// var onMouseMove = function(e){
	
// 	let diferencaMovimento = {
// 		x: e.offsetX - mousePos.x,
// 		y: e.offsetY - mousePos.y
// 	}
	
// 	if (click){
//         console.log(diferencaMovimento)
// 		let angulosQuaternion = new THREE.Quaternion().setFromEuler(
// 		new THREE.Euler (	paraRadianos(diferencaMovimento.y) * 0.5,
// 							paraRadianos(diferencaMovimento.x) * 0.5,
// 							0,
// 							'XYZ')
// 		);
// 		camera.quaternion.multiplyQuaternions(angulosQuaternion, camera.quaternion);
// 	}
// 	mousePos = {
// 		x: e.offsetX,
// 		y: e.offsetY
// 	}
// }
// var onMouseClick = function(e){
// 	click = true;
// };
// var onMouseUnclick = function(e){
// 	click = false;
// };
var onMouseWheel = function(e){
    console.log(camera.position.z)
    if (camera.position.z > 1.70 && e.deltaY < 0){
	    camera.position.z -= velMouse;
    }else if (e.deltaY > 0){
        camera.position.z += velMouse;
    }
}

var init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 5, window.innerWidth / window.innerHeight, 1, 10000 );
    renderer = new THREE.WebGLRenderer();
    loader = new THREE.GLTFLoader();

    // Assignments
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
	
    // Movimentação camera
    document.addEventListener('mousewheel', onMouseWheel);
	// document.addEventListener('mousemove', onMouseMove);
	// document.addEventListener('mousedown', onMouseClick);
	// document.addEventListener('mouseup', onMouseUnclick);

    lightInScene();
    loadCelestialBodies();

    guiFunction();
}    

window.onload = this.init();
