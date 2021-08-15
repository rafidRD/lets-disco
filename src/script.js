import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//Texture Loader Settings
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('textures/NormalMap.png');


// Canvas Settings
const canvas = document.querySelector('canvas.webgl')

// Scene Settings
const scene = new THREE.Scene()

// Objects Settings
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);

// Materials Settings

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

//Lights Settings

// Spot Light
const pointLight = new THREE.PointLight(0xffffff, .1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Red Light
const pointLight1 = new THREE.PointLight(0xff0000, 2)

pointLight1.position.set(-1.71,1.34,-1.55)
pointLight1.intensity = 13
scene.add(pointLight1)


// Blue Light
const pointLight2 = new THREE.PointLight(0x30ea, 2)

pointLight2.position.set(1.76,-2.04,-1.39)
pointLight2.intensity = 8.01
scene.add(pointLight2)



// Sizes Settings
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera Settings
 
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


 // Renderer Settings

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Animatation Settings

 document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
    
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001;
}
window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .9 * elapsedTime

    sphere.rotation.x += .65 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .48 * (targetX - sphere.rotation.y)
    sphere.position.z += -.3 * (targetY - sphere.rotation.x)

     // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// Cursor Settings
const cursor = document.querySelector(".cursor");
document.addEventListener('mousemove',e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

