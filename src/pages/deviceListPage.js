import { Selector, t } from 'testcafe';
import DeviceListElement from './deviceListElement';

export default class DeviceListPage {
    static addDeviceButton = Selector(".submitButton");
    static devicesSelector = Selector(".list-devices").child(".device-main-box");

    async getDeviceById(id){        
        return new DeviceListElement(Selector(`a[href='/devices/edit/${id}']`).parent(".device-main-box"));
    }

    async clickAddDevice(){
        await t.click(DeviceListPage.addDeviceButton);
    }
    
}