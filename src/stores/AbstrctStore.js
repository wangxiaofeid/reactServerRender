import { observable, action } from 'mobx';

export default class AbstrctStore {
    @observable isLoad = false;
    constructor(appStore) {
        this.appStore = appStore;
    }

    @action init() {
        if (this.isLoad) {
            return
        }
        return new Promise((resolve, reject) => {
            resolve({})
        })
    }

    initData(data) {
        if (data) {
            this.isLoad = true;
        }
    }
}
