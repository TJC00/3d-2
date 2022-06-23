import * as THREE from "three";
import {AmbientLight}  from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(12,1,16,100)
const material = new THREE.MeshStandardMaterial({
    color:0xFF6347
})

const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff );
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry, material);
    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);

}

Array(500).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load("jeff.jpg");
const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(6,6,6),
    new THREE.MeshBasicMaterial({map:jeffTexture}),
)
scene.add(jeff);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(6,32,32),
    new THREE.MeshStandardMaterial({ map:moonTexture, normalMap:normalTexture})
)
scene.add(moon);

moon.position.x=300;
moon.position.setX(-10);

jeff.position.x=300;
jeff.position.setX(10);

/*function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

}
document.body.onscroll = moveCamera();*/

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.002;
    moon.rotation.y += 0.004;
    moon.rotation.z += 0.006;

    jeff.rotation.z += 0.008;

    controls.update();
    renderer.render(scene,camera);
}
animate();
