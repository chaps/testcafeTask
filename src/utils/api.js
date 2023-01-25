import { t } from 'testcafe';


export default class DeviceAPI{

    constructor(host) {
        this.host = host;
    }

    async getDevices(){
        return t.request(`${this.host}/devices`);
    }
    
    async patchDevice(id, payload){
        return t.request({url:`${this.host}/devices/${id}`, method: 'put', body: payload});
    }
    
    async deleteDevice(id){
        return t.request({url:`${this.host}/devices/${id}`, method: 'delete'});
    }
}
