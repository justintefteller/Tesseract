import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
const pi = 3.14159265359;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.lookAt( 0, 0, 0 );
// camera.position.set( 0, 0, 100 );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
controls.update();

const scene = new THREE.Scene();

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set( 0, 20, 0 );

scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add( gridHelper );

function createTesseract (scene, centerCubeCoordinates = {x:0,y:0,z:0}, centerCubeSize =10){
    const coords = centerCubeCoordinates;
    const size = {width:centerCubeSize, heigth:centerCubeSize, depth:centerCubeSize};
    const cylLenth = centerCubeSize * 5
    const hypotenus =  Math.sqrt((cylLenth ** 2) + (cylLenth ** 2));
    const diagonal = Math.sqrt((hypotenus ** 2) + (cylLenth ** 2));
    const cylPos = (centerCubeSize * 5)/2;
    const walls = [], floorCeiling = [], centers = [];
    const color = 0x00008b;
    // center cube
    const geometry = new THREE.BoxGeometry( size.width, size.heigth, size.depth );
    const material = new THREE.MeshStandardMaterial( {color: color} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(coords.x, coords.y, coords.z);
    scene.add( cube );

    // verticles edges
    for(let i = 0; i < 4; i++) {
        let geometry = new THREE.CylinderGeometry( 1, 1, cylLenth, 10 );
        let material = new THREE.MeshStandardMaterial( {color: color} );
        let cylinder = new THREE.Mesh( geometry, material );
        walls.push(cylinder)
    }

    for(let i = 0; i < 8; i++) {
        let geometry = new THREE.CylinderGeometry( 1, 1, cylLenth, 10 );
        let material = new THREE.MeshStandardMaterial( {color: color} );
        let cylinder = new THREE.Mesh( geometry, material );
        floorCeiling.push(cylinder)
    }

    // top and bottom edges
    for(let i = 0, j = 0; i < walls.length; i++) {
        if(i == 0){
            walls[i].position.set(coords.x + cylPos, coords.y, coords.z + cylPos);
        }else if ( i == 1){
            walls[i].position.set(coords.x + cylPos, coords.y, coords.z - cylPos);
        }else if ( i == 2){
            walls[i].position.set(coords.x - cylPos, coords.y, coords.z + cylPos);
        }else if ( i == 3){
            walls[i].position.set(coords.x - cylPos, coords.y, coords.z - cylPos);
        }
        scene.add(walls[i]);
    }

    for(let i = 0, j = 0; i < floorCeiling.length; i++){
        if(i == 0){
            floorCeiling[i].rotation.set(pi/2,0, 0);
            floorCeiling[i].position.set(coords.x + cylPos, coords.y + cylPos,coords.z );
        }else if (i == 1){
            floorCeiling[i].rotation.set(pi/2,0, pi/2);
            floorCeiling[i].position.set(coords.x, coords.y + cylPos,coords.z -cylPos );
        }else if (i == 2){
            floorCeiling[i].rotation.set(pi/2,0, 0);
            floorCeiling[i].position.set(coords.x - cylPos, coords.y -cylPos, coords.z );
        }else if (i == 3){
            floorCeiling[i].rotation.set(pi/2,0, pi/2);
            floorCeiling[i].position.set(coords.x, coords.y + cylPos,coords.z + cylPos );
        }else if (i == 4){
            floorCeiling[i].rotation.set(pi/2,0, 0);
            floorCeiling[i].position.set(coords.x + cylPos, coords.y-cylPos,coords.z);
        }else if (i == 5){
            floorCeiling[i].rotation.set(pi/2,0, pi/2);
            floorCeiling[i].position.set(coords.x, coords.y-cylPos, coords.z + cylPos );
        }else if (i == 6){
            floorCeiling[i].rotation.set(pi/2,0, 0);
            floorCeiling[i].position.set(coords.x - cylPos, coords.y + cylPos, coords.z );
        }else if (i == 7){
            floorCeiling[i].rotation.set(pi/2,0, pi/2);
            floorCeiling[i].position.set(coords.x, coords.y-cylPos, coords.z-cylPos );
        }
        scene.add(floorCeiling[i]);
    }

    // center edges to corner verticies
    for(let i = 0; i < 4; i++) {
        let geometry = new THREE.CylinderGeometry( 1, 1, diagonal, 10 );
        let material = new THREE.MeshStandardMaterial( {color: color} );
        let cylinder = new THREE.Mesh( geometry, material );
        centers.push(cylinder)
    }
    for (let i = 0, j = 0; i < centers.length; i++){
        if(i == 0){
            centers[i].rotation.set(j,pi/4, pi/3.25);
            centers[i].position.set(coords.x,coords.y,coords.z,);
        }else if (i == 1){
            centers[i].rotation.set(j,pi/4 * -1, pi/3.25 * -1);
            centers[i].position.set(coords.x,coords.y,coords.z,);
        }else if (i == 2){
            centers[i].rotation.set(j,pi/4 * -1, pi/3.25 * 1);
            centers[i].position.set(coords.x,coords.y,coords.z,);
        }else if (i == 3){
            centers[i].rotation.set(j,pi/4 * 1, pi/3.25 * -1);
            centers[i].position.set(coords.x,coords.y,coords.z,);
        }
        scene.add(centers[i])
    }
}

const animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

createTesseract(scene)

animate(scene, camera);

