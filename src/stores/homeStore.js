import AbstrctStore from "./AbstrctStore";
import { observable, action } from 'mobx';
import fetch from "isomorphic-unfetch";

export default class HomeStore extends AbstrctStore {
    @observable xx = '';

    constructor(data, appStore) {
        super(appStore);
        data && data.isLoad && this.initData(data);
    }

    @action init() {
        if (this.isLoad) {
            return
        }
        return new Promise(async (resolve, reject) => {
            fetch('http://localhost:3001/get/test')
                .then(res => res.json())
                .then(res => {
                    this.initData(res);
                    resolve(true);
                })
                .catch(e => {
                    console.error(e);
                    resolve(false);
                })
        })
    }

    initData(data) {
        if (data) {
            this.isLoad = true;
            const { xx } = data;
            this.xx = xx;
        }
    }
}
