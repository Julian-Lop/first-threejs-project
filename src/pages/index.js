import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Home() {

  const [scene, setScene] = useState(new THREE.Scene())
  const [camera, setCamera] = useState()
  const [renderer, setRenderer] = useState()
  const [cube, setCube] = useState()
  const [grid, setGrid] = useState()
  const [light, setLight] = useState()
  const [plane, setPlane] = useState()

  const [charged, setCharged] = useState(false)
  const [animated, setAnimated] = useState(false)
  
  const createEnvironment = () => {
    setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    setRenderer(new THREE.WebGLRenderer({alpha:true}))
  }

  const createObjects = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )

    const Planegeometry = new THREE.PlaneGeometry(20,20,32,32)
    const Planematerial = new THREE.MeshStandardMaterial( { color: 0xff0000 } )

    setCube(new THREE.Mesh( geometry, material ))
    setGrid(new THREE.GridHelper(100,100))
    setLight(new THREE.DirectionalLight(0xffffff,1,10))
    setPlane(new THREE.Mesh(Planegeometry,Planematerial))
  }

  const createScene = () => {
    renderer.setSize( window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement)
   
    cube.castShadow = true
    cube.position.set(1,2,1)

    light.castShadow = true
    light.position.set(-1.5,1,1)

    plane.receiveShadow = true
    plane.position.set(0,0,0)

    scene.add(cube)
    // scene.add(grid)
    scene.add(light)
    scene.add(plane)

    camera.position.z = 5
    camera.position.y = -10
    camera.rotation.x = 1
    // camera.rotation.y = 0
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
      <navbar>
        <button onClick={() => onStart()}>
          Crear entorno
        </button>
        <button onClick={() => createScene()} disabled={!renderer}>
          Crear escena
        </button>
        <button onClick={() => animate()} disabled={!charged}>
          Animar
        </button>
        <button onClick={() => rotar()} disabled={!animated} >
          Rotar
        </button>
        <button onClick={() => trasladar()} disabled={!animated} >
          Trasladar
        </button>
      </navbar>
    </main>
  )
}
