import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Home() {

  const [charged, setCharged] = useState(false)
  
  let scene, camera, renderer, cube

  const createScene = () => {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
   
    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    cube = new THREE.Mesh( geometry, material )
    scene.add( cube )

    camera.position.z = 5;
  }

  function animate() {
    requestAnimationFrame( animate )
    renderer.render(scene, camera)
  }

  const rotar = () => {
    requestAnimationFrame( rotar )
    renderer.render(scene, camera)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  const trasladar = () => {
    requestAnimationFrame( trasladar )
    renderer.render(scene, camera)
    cube.translateY(0)
    cube.translateY(0.01)
    cube.translateY(0)
    
  }

  const stopAnimation = () => {
    requestAnimationFrame( stopAnimation )
    renderer.render(scene, camera)
  }
  
  return (
    <main>
      <h1>
        Three js
      </h1>
      <button onClick={() => createScene()}>
        Iniciar
      </button>
      <button onClick={() => animate()}>
        Animar
      </button>
      <button onClick={() => rotar()}>
        Rotar
      </button>
      <button onClick={() => trasladar()}>
        Trasladar
      </button>
      <button onClick={() => stopAnimation()}>
        Stop
      </button>
    </main>
  )
}
