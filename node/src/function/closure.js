const debounce = (func) => {
    let timerId;
    return ()=>{
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func();
        }, 1000);
    }
}

const useState = (initialValue) => {
    let state = initialValue;
    
    const setState = (newState) =>{
        state = newState;
    }

    const getState = () => {
        return state;
    }

    return [getState, setState];
}

const [a, setA] = useState(0);

console.log(a());
setA(12);
console.log(a());

class StateManager {
    constructor(initialValue) {
        this.state = initialValue;
    }
    setState(newState) {
        this.state = newState;
    }
    getState() {
        return this.state;
    }
}

const stateManager = new StateManager(0);
console.log(stateManager.getState());
stateManager.setState(12);
console.log(stateManager.getState());