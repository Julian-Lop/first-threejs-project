import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Router, { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const [scene, setScene] = useState(new THREE.Scene())
  const [camera, setCamera] = useState()
  const [renderer, setRenderer] = useState()
  const [controls, setControls] = useState()

  const [cube, setCube] = useState()
  const [grid, setGrid] = useState()
  const [light, setLight] = useState()
  const [plane, setPlane] = useState()

  const [charged, setCharged] = useState(false)
  const [animated, setAnimated] = useState(false)

  const [zoomInRange, setZoomInRange] = useState(3)
  const [zoomOutRange, setZoomOutRange] = useState(5)
  const [dampingRange, setDampingRange] = useState(0.1)
  
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

    controls.update()
    setCharged(true)
  }

  function animate() {
    requestAnimationFrame( animate )
    renderer.render(scene, camera)
    controls.update()
    setAnimated(true)
  }

  const rotar = () => {
    requestAnimationFrame( rotar )
    renderer.render(scene, camera)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
  }

  const trasladar = () => {
    requestAnimationFrame( trasladar )
    renderer.render(scene, camera)
    cube.translateY(0)
    cube.translateY(0.01)
    cube.translateY(0)
    controls.update()
  }

  const onStart = () => {
    createEnvironment()
    createObjects()
  }

  const changeZoom = (e) => {
    controls.enableZoom = JSON.parse(e.target.value)
    controls.update()
  }

  const changePanning = (e) => {
    controls.enableDamping = JSON.parse(e.target.value)
    controls.update()
  }

  const changeDamping = (e) => {
    controls.enablePan = JSON.parse(e.target.value)
    controls.update()
  }

  useEffect(() => {
    if(plane){
      const tempcontrol = new OrbitControls(camera, renderer.domElement)
      tempcontrol.minDistance = zoomInRange
      tempcontrol.maxDistance = zoomOutRange
      setControls(tempcontrol)
    }
  },[plane])

  useEffect(() => {
    if(animated){
      controls.minDistance = zoomInRange
      controls.maxDistance = zoomOutRange
    }
  },[zoomInRange,zoomOutRange])

  useEffect(() => {
    if(animated){
      controls.dampingFactor = dampingRange
    }
  }, [dampingRange]);

  // useEffect(() => {
  //   if(controls){
  //     console.log({controls})
  //   }
  // }, [controls]);
  
  return (
    <main>
      <h1>
        Three js
      </h1>
      
      <navbar>
        <button onClick={() => router.reload()} style={{background:'#ff0000', color:'#000000'}}>
          X
        </button>
        <button onClick={() => onStart()}>
          Crear entorno
        </button>
        {renderer && <button onClick={() => createScene()} disabled={!renderer}>
          Crear escena
        </button>}
        {charged && <button onClick={() => animate()} disabled={!charged}>
          Animar
        </button>}
        {animated && <button onClick={() => rotar()} disabled={!animated} >
          Rotar
        </button>}
        {animated && <button onClick={() => trasladar()} disabled={!animated} >
          Trasladar
        </button>}
      </navbar>
      <br/>
      <navbar>
        
        <select onChange={(e) => changeZoom(e)}>
          <option>Zoom</option>
          <option value={true}>Activar</option>
          <option value={false}>Desactivar</option>
        </select>

        <select onChange={(e) => changeDamping(e)}>
          <option>Drag</option>
          <option value={true}>Activar</option>
          <option value={false}>Desactivar</option>
        </select>

        <select onChange={(e) => changePanning(e)}>
          <option>Damping</option>
          <option value={true}>Activar</option>
          <option value={false}>Desactivar</option>
        </select>
        
        <div style={{textAlign: 'center'}}>
          <label>
            {'Factor Damping: '+dampingRange}
          </label>
          <br/>
          <input type="range" name="damping" id='damping' value={dampingRange} min={0.1} max={0.9} onChange={(e) => setDampingRange(e.target.value)} step={0.1} />
        </div>
        <div style={{textAlign: 'center'}}>
          <label>
            {'Zoom mínimo: '+zoomInRange}
          </label>
          <br/>
          <input type="range" name="zoomin" id='zoomin' value={zoomInRange} min={1} max={15} onChange={(e) => setZoomInRange(e.target.value)} step={1} />
        </div>
        <div style={{textAlign: 'center'}}>
          <label>
            {'Zoom máximo: '+zoomOutRange}
          </label>
          <br/>
          <input type="range" name="zoomout" id='zoomout' value={zoomOutRange} min={1} max={15} onChange={(e) => setZoomOutRange(e.target.value)} step={1} />
        </div>
      </navbar>
    </main>
  )
}
