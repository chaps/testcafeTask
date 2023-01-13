import {getDevices, deleteDevice, patchDevice } from '../utils/api.js';
import DeviceListPage from '../pages/deviceListPage';
import DevicePage from '../pages/devicePage';
import DeviceListElement from '../pages/deviceListElement';


fixture`Test Devices Page`
    .page`http://localhost:3001`;;


test('Validate Devices from API are displayed in UI', async t => {
    
    let deviceListPage = new DeviceListPage();
    // Make an API call to retrieve the list of devices.     
    const devices = await getDevices(t);
    
    // Use the list of devices to check the elements are visible in the DOM.
    // Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
    // Verify that all devices contain the edit and delete buttons.
    
    // Iterate devices assert every device exists and contains expected elements.
    for (var i=0; i < devices.length; i++) {  
        let device = devices[i];  
        let deviceElement = await deviceListPage.getDeviceById(device.id);
        deviceElement.validateUIElements();
        deviceElement.validateData(
            device["system_name"],
            device["type"],
            device["hdd_capacity"]
        );
    }
});


test('Verify that devices can be created properly using the UI.', async t => {
    let deviceListPage = new DeviceListPage();
    let devicePage = new DevicePage();

    const originalTotal = await DeviceListPage.devicesSelector.count
    await deviceListPage.clickAddDevice();
    // Fill new device form
    const newDeviceName = "testname";
    const newDeviceType = 'WINDOWS SERVER';
    const newDeviceHDDCapacity = "123";
    
    await devicePage.fillAndSubmit(
        newDeviceName,
        newDeviceType,
        newDeviceHDDCapacity
    )
    // Verify the new device is now visible.
    // Check name, type and capacity are visible and correctly displayed to the user.
    await t.expect(await DeviceListPage.devicesSelector.count).eql(originalTotal + 1);
    
    let found = false;
    for (let i = 0; i< (await DeviceListPage.devicesSelector.count); i++) {
        let deviceListElement = new DeviceListElement(DeviceListPage.devicesSelector.nth(i));
        let deviceData = await deviceListElement.getData();
        found = (
            deviceData["system_name"] == newDeviceName &&
            deviceData["type"].replace("_", " ") == newDeviceType &&
            deviceData["hdd_capacity"].replace(" GB", "") == newDeviceHDDCapacity
        )
        if(found){break;}
    }
    await t.expect(found).eql(true);
});


test('Test renaming a device through API reflects changes in UI .', async t => {
    // Step: Make an API call that renames the first device of the list to “Rename Device”.
    const devices = await getDevices();
    const firstDevice = devices[0];
    const newName = "New name";

    const response = await patchDevice(firstDevice["id"], {
        "system_name": newName,
        "type": firstDevice["type"],
        "hdd_capacity": firstDevice["hdd_capacity"]
    });

    let deviceListPage = new DeviceListPage();
    // Step: Reload the page and verify the modified device has the new name.
    await t.navigateTo("/");
    let deviceElement = await deviceListPage.getDeviceById(firstDevice["id"]);
    await t.expect(deviceElement.deviceElementSelector.exists).ok();
    await deviceElement.validateData(
        newName,
        firstDevice["type"],
        firstDevice["hdd_capacity"]
    )
});

test('Test deleting a device through API reflects changes in UI.', async t => {
    const devices = await getDevices();
    let deviceListPage = new DeviceListPage();
    const firstDevice = devices[0];
    // Step Delete device by API
    await deleteDevice(firstDevice["id"]);
    // Refresh page
    await t.navigateTo("/");
    // Assert device is not found
    let deviceElement = deviceListPage.getDeviceById(firstDevice["id"]);
    await t.expect(deviceElement.exists).notOk();
    await t.expect(await DeviceListPage.devicesSelector.count).eql(devices.length-1);
});
