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
        this.loadModels()
    }

    loadModels( ) {
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

    onKeyDown (e) {
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

    onKeyUp (e) {
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

export class FiniteStateMachine {
    constructor () {
        this._states = {}
        this._currentState = null
    }

    addState (name, type) {
        this._states[name] = type
    }

    setState (name) {
        const prevState = this._currentState

        if(prevState && ((prevState.Name == name)) ) return prevState.Exit()

        const state = new this._states[name](this)

        this._currentState = state

        state.Enter(prevState)
    }

    update(timeLapsed, input) {
        if (this._currentState) {
            this._currentState.update(timeLapsed, input)
        }
    }
}

export class CharacterFSM extends FiniteStateMachine {
    constructor(proxy) {
        super()
        this._proxy = proxy
        this.addState('idle', IdleState)
        this.addState('walk', WalkState)
        this.addState('run', RunState)
    }
}


export class State {
    constructor(parent) {
        this._parent = parent
    }

    Enter() {
        
    }

    Update() {
        
    }

    Exit() {
        
    }
}

export class IdleState extends State {
    constructor(parent) {
        super(parent)
    }

    get Name() {
        return 'idle'
    }

    Enter(prevState) {
        const idleAction = this._parent._proxy.animations['idle'].action
        if (prevState) {
            const prevAction = this._parent._proxy.animation[prevState.Name].action
            idleAction.time = 0.0
            idleAction.enabled = true
            idleAction.setEffectiveTimeScale(1.0)
            idleAction.setEffectiveWeight(1.0)
            idleAction.crossFadeFrom(prevAction, 0.5, true)
            idleAction.play()
        } else {
            idleAction.play()
        }
    }

    Update(timeLapse, input) {
        if (input._keys.forward || input._keys.backward) {
            this._parent.setState('walk')
        }
    }

    Exit() {

    }
}

export class WalkState extends State {
    constructor(parent) {
        super(parent)
    }

    get Name() {
        return 'walk'
    }

    Enter(prevState) {
        const currentAction = this._parent._proxy._animations['walk'].action

        if (!prevState) {
            return currentAction.play()
        }
        const prevAction = this._parent._proxy._animations[prevState.Name].action

        if (prevState && prevState.Name != 'run') {
            currentAction.enabled = true
            currentAction.time = 0.0
            currentAction.setEffectiveTimeScale(1.0)
            currentAction.setEffectiveWeight(1.0)
        }
        if (prevState && prevState.Name == 'run') {
            const ratio = currentAction.getClip().duration / prevState.getClip().duration
            currentAction.time = prevAction.time * ratio
        }
        currentAction.crossFadeFrom(prevAction, 0.5, true)
        currentAction.play()
    }

    Update() {
        
    }

    Exit() {
        
    }
}

export class RunState extends State {
    constructor() {
        
    }

    constructor(parent) {
        super(parent)
    }

    get Name() {
        return 'run'
    }

    Enter(prevState) {
        
    }

    Update() {
        
    }

    Exit() {
        
    }
}