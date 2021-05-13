var scene;
var camera;
var renderer;

var cone;
var esfera;

var velesfera = [1,0.5];
var velcone = [-1,-1];

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 500;

    criaCone();
    criaesfera();
};

function render(){
    requestAnimationFrame(render);

    animaCone();
    animaesfera();

    renderer.render(scene, camera)
};

function animaesfera(){
    if (esfera.position.x >= 360 || esfera.position.x <= -360) {
        this.velesfera[0] = velesfera[0] * -1;
    }
    if (esfera.position.y >= 150 || esfera.position.y <= -150) {
        this.velesfera[1] = velesfera[1] * -1;
    }

    this.esfera.position.x += velesfera[0];
    this.esfera.position.y += velesfera[1];
}

function animaCone(){
    if (cone.position.x >= 360 || cone.position.x <= -360) {
        this.velcone[0] = velcone[0] * -1;
    }
    if (cone.position.y >= 140 || cone.position.y <= -140) {
        this.velcone[1] = velcone[1] * -1;
    }

    this.cone.position.x += velcone[0];
    this.cone.position.y += velcone[1];
}

function criaCone(){    
    const radius =  10;  
    const height = 40;  
    const radialSegments = 64;  
    const heightSegments = 64;  
    const openEnded = true;  
    const thetaStart = 6;  
    const thetaLength = 6.3;  

    const geometry = new THREE.ConeGeometry(
        radius, height,
        radialSegments, heightSegments,
        openEnded,
        thetaStart, thetaLength);

    const material = new THREE.MeshBasicMaterial( {color: "red"} );
    cone = new THREE.Mesh( geometry, material );
    scene.add( cone );
}

function criaesfera(){
    let geometria = new THREE.SphereGeometry(25,25,25);
    let material = new THREE.MeshBasicMaterial({color:'green'});

    esfera = new THREE.Mesh(geometria, material)
    scene.add(esfera);
};

init();
render()
