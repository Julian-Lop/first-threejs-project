import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Home() {

  const [scene, setScene] = useState(new THREE.Scene())
  const [camera, setCamera] = useState()
  const [renderer, setRenderer] = useState()
  const [cube, setCube] = useState()
  const [grid, setGrid] = useState()

  const [charged, setCharged] = useState(false)
  const [animated, setAnimated] = useState(false)
  
  const createEnvironment = () => {
    setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    setRenderer(new THREE.WebGLRenderer({alpha:true}))
  }

  const createObjects = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    setCube(new THREE.Mesh( geometry, material ))
    setGrid(new THREE.GridHelper(100,100))
  }

  const createScene = () => {
    renderer.setSize( window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
   
    scene.add( cube )
    scene.add(grid)
    
    camera.position.z = 10
    camera.position.y = 5
    camera.rotation.x = -0.5
    camera.rotation.y = 0
    setCharged(true)
  }

  function animate() {
    requestAnimationFrame( animate )
    renderer.render(scene, camera)
    setAnimated(true)
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

  const onStart = () => {
    createEnvironment()
    createObjects()
  }
  
  return (
    <main>
      <h1>
        Three js
      </h1>
      <button onClick={() => onStart()}>
        Crear entorno
      </button>
      {renderer && <button onClick={() => createScene()}>
        Crear escena
      </button>}
      {charged && <button onClick={() => animate()}>
        Animar
      </button>}
      {animated && <button onClick={() => rotar()}>
        Rotar
      </button>}
      {animated && <button onClick={() => trasladar()}>
        Trasladar
      </button>}
    </main>
  )
}
