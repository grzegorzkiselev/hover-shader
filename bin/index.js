import * as THREE from 'three'
// import { TweenMax as TM } from 'gsap'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'

/**
 * Base
 */
// Canvas
const container = document.getElementById('stage');

// Scene
const scene = new THREE.Scene()
const sceneScale = 1;

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Cursor
const cursor = { 
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5)
})

console.log("1")

/**
 * Models
 */
const backgroundImage = "backgroundImage.jpg"
const hoveredImage = "hoveredImage.jpg"

const loader = new THREE.TextureLoader();
const image = loader.load(backgroundImage)
const hover = loader.load(hoveredImage)

// Setup a geometry
	const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

	const mesh = new THREE.Mesh(
		geometry,
		new THREE.ShaderMaterial({
			fragmentShader,
			vertexShader,
			uniforms: {
				color: { value: new THREE.Color(0xff0000) },
				u_image: { type: 't', value: image },
				u_imagehover: { type: 't', value: hover },
				u_mouse: { value: cursor },
				u_time: { value: 0 },
				u_res: {
				value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
			},
			defines: {
                PR: window.devicePixelRatio.toFixed(1)
            }
		})
	);

scene.add(mesh);

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera();
camera.position.set(0, 0, -4);
camera.lookAt(new THREE.Vector3());
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

console.log("2")

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: container,
	alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

console.log("3")

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

/**
 * Animate
 */

const tick = () => {

	// Update controls
	// controls.update()

	mesh.material.uniforms.u_time.value += 0.01;

	renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()