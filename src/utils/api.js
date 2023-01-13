import { t } from 'testcafe';

export async function getDevices(){
    return t.request(`http://localhost:3000/devices`)["body"];
}

export async function patchDevice(id, payload){
    return t.request({url:`http://localhost:3000/devices/${id}`, method: 'put', body: payload});
}

export async function deleteDevice(id){
    return t.request({url:`http://localhost:3000/devices/${id}`, method: 'delete'});
}