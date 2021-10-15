import './style.css'
import * as THREE from 'three'
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
//gltfloader
const gltfLoader = new GLTFLoader()
// Debug
// this is a place for dat.gui that used and deleted
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
//background color
scene.background = new THREE.Color(0x615E5F);
//timeline
let timelinee = gsap.timeline()
//3d watch
gltfLoader.load('scene.gltf', (gltf) => {
	gltf.scene.scale.set(0.3, 0.3, 0.3)
	gltf.scene.rotation.set(1.7, 0, 0)
	scene.add(gltf.scene)
	timelinee.to(gltf.scene.rotation, {
		z: 6.2,
		duration: 2.5
	})
	timelinee.to(gltf.scene.position, {
		x: 0.786
	})
	timelinee.to(gltf.scene.rotation, {
		z: 7,
		duration: 2
	})
})
// Objects  
const star = new THREE.BufferGeometry;
const startsize = 5000;
const stararray = new Float32Array(startsize * 3);
for (let i = 0; i < startsize * 3; i++) {
	stararray[i] = (Math.random() - 0.5) * 5
}
star.setAttribute('position', new THREE.BufferAttribute(stararray, 3))
// Materials
const material = new THREE.PointsMaterial({
	size: 0.005,
});
// Mesh
const starmesh = new THREE.Points(star, material)
scene.add(starmesh);
// Lights
const pointLight = new THREE.AmbientLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
//size
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}
//update size
window.addEventListener('resize', () => {
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
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)
//renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//mouse
document.addEventListener('mousemove', animatestarmesh)
let mouseY = 0
let mouseX = 0

function animatestarmesh(event) {
	mouseX = event.clientX
	mouseY = event.clientY
}
//animate
const clock = new THREE.Clock()
const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	// Update objects
	starmesh.rotation.y = -.1 * elapsedTime
	if (mouseX > 0) {
		starmesh.rotation.x = -mouseY * (elapsedTime * 0.00008)
		starmesh.rotation.y = mouseX * (elapsedTime * 0.00008)
	}
	// Update Orbital Controls
	// controls.update()
	// Render
	renderer.render(scene, camera)
	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}
tick()