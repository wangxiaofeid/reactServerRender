import { action, observable } from 'mobx'

let store = null

class Store {
    @observable num = 0

    constructor() {

    }

    @action start = () => {
        this.num++
    }
}

export function initStore(isServer) {
    if (isServer) {
        return new Store()
    } else {
        if (store === null) {
            store = new Store(isServer)
        }
        return store
    }
}