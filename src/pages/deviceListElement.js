import { t } from 'testcafe';

export default class DeviceListElement {
    static deviceName = ".device-name";
    static deviceType = ".device-type";
    static deviceCapacity = ".device-capacity";
    static editButton = "a.device-edit";
    static deleteButton= "button.device-remove";

    constructor(deviceElementSelector) {
        this.deviceElementSelector = deviceElementSelector;
      }
    
    /**
     * Asserts and validates that the current device element contains the
     * expected elements in the DOM.
     */
    async validateUIElements(){
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceName).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceType).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceCapacity).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.editButton).exists).ok();
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deleteButton).exists).ok();
    }

    /**
     * Asserts that the current device element's values in the DOM
     * matches the given values passed as arguments
     * @param  {string} deviceName   
     *         A string containing the expected deviceName
     * @param  {string} systemType  
     *         A string containing the expected systemType
     * @param  {HDDCapacity} HDDCapacity   
     *         A string containing the expected hdd Capacity
     */
    async validateData(deviceName, systemType, HDDCapacity){
        await t.expect(
            this.deviceElementSelector.find(DeviceListElement.deviceName).textContent).contains(deviceName);
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceType).textContent).contains(systemType);
        await t.expect(this.deviceElementSelector.find(DeviceListElement.deviceCapacity).textContent).contains(HDDCapacity);
    }

    /**
     * Returns an object containing key,values system_name, type and hdd_capacity
     * related to a device Element.
     *
     * @return {Object} 
     */
    async getData(){
        let data = {
            "system_name": await this.deviceElementSelector.find(DeviceListElement.deviceName).textContent,
            "type": await this.deviceElementSelector.find(DeviceListElement.deviceType).textContent,
            "hdd_capacity": await this.deviceElementSelector.find(DeviceListElement.deviceCapacity).textContent
        };
        return data;
    }
    
}