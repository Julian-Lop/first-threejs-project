import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


export class basicCharacterControllerProxy {
    constructor(animations) {
        this._animations = animations
    }

    get animation() {
        return this._animations
    }
}

export class BasicCharacterController {
    constructor(params) {
        this._params = params
        this._deceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0)
        this._aceleration = new THREE.Vector3(1, 0.25, 50.0)
        this._velocity = new THREE.Vector3(0,0,0)

        this._animations = {}
        this._input = new BasicCharacterControllerInput() 
        // this._stateMachine = // TODO
        this._loadModels()
    }

    _loadModels( ) {
        // TODO
    }
}

export class BasicCharacterControllerInput {
    constructor () {
        this._keys = {
            forward : false,
            backward : false,
            left : false,
            right : false,
            shift : false
        }

        document.addEventListener('keydown', (e) => this._onKeyDown(e),false)
        document.addEventListener('keyup', (e) => this._onKeyUp(e),false)
    }

    _onKeyDown (e) {
        switch (e.kyCode) {
            case 87: //W
                this._keys.forward = true
                break;
            case 65: //A
                this._keys.left = true
                break;
            case 83: //S
                this._keys.backward = true
                break;
            case 68: //D
                this._keys.right = true
                break;
            case 16: // shift ⬆️
                this._keys.shift = true
                break;
            default:
                break;
        }
    }

    _onKeyUp (e) {
        switch (e.kyCode) {
            case 87: //W
                this._keys.forward = false
                break;
            case 65: //A
                this._keys.left = false
                break;
            case 83: //S
                this._keys.backward = false
                break;
            case 68: //D
                this._keys.right = false
                break;
            case 16: // shift ⬆️
                this._keys.shift = false
                break;
            default:
                break;
        }
    }
}