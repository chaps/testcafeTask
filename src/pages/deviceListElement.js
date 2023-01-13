import { Selector, t } from 'testcafe';

export default class DeviceListElement {
    static deviceName = ".device-name";
    static deviceType = ".device-type";
    static deviceCapacity = ".device-capacity";
    static editButton = "a.device-edit";
    static deleteButton= "button.device-remove";

    constructor(deviceElementSelector) {
        this.deviceElementSelector = deviceElementSelector;
      }
    
    async validateUIElements(){
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceName).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceType).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceCapacity).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.editButton).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deleteButton).exists).ok();
    }

    async validateData(deviceName, systemType, HDDCapacity){
        await t.expect(
            this.deviceElementSelector.find(DeviceListElement.deviceName).textContent).contains(deviceName);
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceType).textContent).contains(systemType);
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceCapacity).textContent).contains(HDDCapacity);
    }

    async getData(){
        let data = {
            "system_name": await this.deviceElementSelector.find(DeviceListElement.deviceName).textContent,
            "type": await this.deviceElementSelector.find(DeviceListElement.deviceType).textContent,
            "hdd_capacity": await this.deviceElementSelector.find(DeviceListElement.deviceCapacity).textContent
        };
        return data;
    }
    
}