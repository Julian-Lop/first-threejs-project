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
        this._deceleration
    }
}