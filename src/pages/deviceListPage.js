import { Selector, t } from 'testcafe';
import DeviceListElement from './deviceListElement';

export default class DeviceListPage {
    static deviceContainerSelector = ".device-main-box";
    static addDeviceButton = Selector(".submitButton");
    static devicesSelector = Selector(".list-devices").child(DeviceListPage.deviceContainerSelector);

    /**
     * Builds a DeviceListElement based on the given device's id selector 
     * and returns a DeviceListElement from the selector built.
     * 
     * @param  {string} id   
     *         A string containing the device's id
     * 
     * @return {DeviceListElement} 
     */
    static async getDeviceById(id){        
        return new DeviceListElement(
            Selector(`a[href='/devices/edit/${id}']`).parent(DeviceListPage.deviceContainerSelector)
        );
    }

    /**
     * Builds a DeviceListElement based on the given index argument.
     * 
     * @param  {number} index   
     *         An integer denoting the nth element of a device list.
     * 
     * @return {DeviceListElement} 
     */
    static async getDeviceByIndex(index){    
        return new DeviceListElement(DeviceListPage.devicesSelector.nth(index));
    }

    /**
     * Clicks the Add Device Button 
     */
    async clickAddDevice(){
        await t.click(DeviceListPage.addDeviceButton);
    }

    /**
     * Returns if a device with the given data exists in the list of devices
     * 
     * Iterates through all the devices in the list ,
     * if one device's data matches the given data, returns true.
     * If the loop ends and no device matched the given data, returns false.
     * 
     * @param  {string} deviceName   
     *         A string containing the expected deviceName
     * 
     * @param  {string} deviceType   
     *         A string containing the expected deviceName
     * 
     * @param  {string} deviceCapacity   
     *         A string containing the expected deviceName
     */
    static async deviceWithGivenDataExists(deviceName, deviceType, deviceCapacity){
        
        for (let i = 0; i< (await DeviceListPage.devicesSelector.count); i++) {
            let deviceListElement = await DeviceListPage.getDeviceByIndex(i);
            let deviceData = await deviceListElement.getData();
            if (
                deviceData["system_name"] == deviceName &&
                deviceData["type"].replace("_", " ") == deviceType &&
                deviceData["hdd_capacity"].replace(" GB", "") == deviceCapacity
            ){
                return true;
            }
        }
        return false
    }
    
}