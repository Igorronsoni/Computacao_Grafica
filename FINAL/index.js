var scene, camera, renderer;
var ground;
var spotLight;

var velocity = 0.017;
var pivot;
var controls;

var textureLoader;
var loaded = false, loadedSound= false, dancing = true;
var homem;

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
    ground.position.y = -2;
    ground.receiveShadow = true;

    scene.add(ground);
};

var mixer

var loaderMan = function(){
    fbxLoader = new THREE.FBXLoader();
 
    fbxLoader.load(
        'assets/models/DancerMan.fbx', 
        function(object){
            object.castShadow = true;
            homem = object;

            homem.scale.x = 0.4;
            homem.scale.y = 0.4;
            homem.scale.z = 0.4;

            mixer = new THREE.AnimationMixer( homem );

            var action = mixer.clipAction( object.animations[ 0 ] );
            var clip = action.getClip();
            action.setLoop(THREE.Loop);
            action.enable = true
            action.play();

            homem.castShadow = true;
            loaded = true;

            scene.add(homem);    
        },
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + " homem pronto!");
        },
        function (error){
            console.log("Error homem: " + error);
        } 
    );
}
var sound;

const criaMusica = function() {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'assets/music/musica.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.3 );
        loadedSound = true
    });
}

var guiFunction = function(){
    const gui = new dat.GUI();

    param = {
        dancing: true,
        speed: 1,
        volume: 30,
        play: () => {sound.pause(); sound.play()},
        pause: () => {sound.pause()},
        restart: () => {sound.stop(); sound.play()}
    };

    let dance = gui.add(param, 'dancing').name("Dancing");
    dance.onChange(function (param){
        dancing = param
    })

    let speed = gui.add(param, 'speed').min(0.5).max(2).name("Speed");
    speed.onChange(function (OldValue){
        OldMax = 2; OldMin=0.5
        NewMax = 0.034; NewMin = 0.0085
        OldRange = (OldMax - OldMin)
        NewRange = (NewMax - NewMin)  
        NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin
        velocity = NewValue
    });

    let pastaMus = gui.addFolder("Music");
    pastaMus.open()

    let volume = pastaMus.add(param, 'volume').min(0).max(100).name("Volume");
    volume.onChange(function (param){
        sound.setVolume( param/100 );
    });

    pastaMus.add(param, 'play').name("Play");
    pastaMus.add(param, 'pause').name("Pause");
    pastaMus.add(param, 'restart').name("Restart");

    gui.open();
   
};

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 600 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    loaderMan();

    camera.position.z = 100;
    camera.position.y = 100;

    //Iluminação 
    directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    directionalLight.position.y = 250;
    directionalLight.position.z = 200
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = 1000;
    directionalLight.shadow.camera.bottom = 1000;
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = -1000;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    pivot = new THREE.Group()
    pivot.position.x = 0
    pivot.position.y = 0
    pivot.position.z = 20
    pivot.add(camera)
    scene.add(pivot)

    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );

    ambient = new THREE.AmbientLight( 0xffffff )
    ambient.intensity = 0.3
    
    scene.add(ambient);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;   //damping 
    controls.dampingFactor = 0.25;   //damping inertia
    controls.enablePan = false;      //pan 
    controls.enableZoom = true;      //Zooming
    controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility
    
    criaGround();
    guiFunction();
    criaMusica()
    render();
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );
    
    controls.update()

    if (dancing && loaded && loadedSound) {
        mixer.update(velocity)
    }
    renderer.render( scene, camera );
};

window.onload = this.init;