import DevicesAPI from '../utils/api.js';
import SystemTypes from '../utils/systemTypes';
import DeviceListPage from '../pages/deviceListPage';
import DevicePage from '../pages/devicePage';
import { faker } from '@faker-js/faker';

let devicePage;
let deviceListPage;
let devicesAPI;

fixture`Test Devices Page`
    .page`http://localhost:3001`
    .before(async t => {
        devicePage = new DevicePage();
        deviceListPage = new DeviceListPage();
        devicesAPI = new DevicesAPI("http://localhost:3000");
    });


test('Validate Devices from API are displayed in UI', async t => {
    
    // Make an API call to retrieve the list of devices.     
    const devices = (await devicesAPI.getDevices())["body"];
    
    // Iterate devices assert every device exists and contains expected elements.
    for (var i=0; i < devices.length; i++) {  
        let device = devices[i];  
        let deviceElement = await DeviceListPage.getDeviceById(device.id);
        // Use the list of devices to check the elements are visible in the DOM.
        // Verify that all devices contain the edit and delete buttons.
        deviceElement.validateUIElements();
        // Check the name, type and capacity of each element of the list
        //  using the class names and make sure they are correctly displayed.
        deviceElement.validateData(
            device["system_name"],
            device["type"],
            device["hdd_capacity"]
        );
    }
});


test('Verify that devices can be created properly using the UI.', async t => {

    const originalTotal = await DeviceListPage.devicesSelector.count;
    await deviceListPage.clickAddDevice();
    // Generate new device data
    const newDeviceName = faker.name.firstName();
    const newDeviceType = SystemTypes[Math.floor(Math.random() * SystemTypes.length)];
    const newDeviceHDDCapacity = faker.datatype.number({min: 1, max:100}).toString();
    
    // Fill and submit new device with generated data.
    await devicePage.fillAndSubmit(
        newDeviceName,
        newDeviceType,
        newDeviceHDDCapacity
    )
    // Verify the new device is now visible.
    // Check name, type and capacity are visible and correctly displayed to the user.
    await t.expect(await DeviceListPage.devicesSelector.count).eql(originalTotal + 1);
    
    const deviceFound = await DeviceListPage.deviceWithGivenDataExists(
        newDeviceName,
        newDeviceType,
        newDeviceHDDCapacity
    );
    await t.expect(deviceFound).eql(true);
});


test('Test renaming a device through API reflects changes in UI .', async t => {
    // Step: Make an API call that renames the first device of the list to “Rename Device”.

    // Step: Obtain devices, and select first device
    const devices = (await devicesAPI.getDevices())["body"];
    const firstDevice = devices[0];
    // Step: generate random new name for device 
    const newName = faker.name.firstName();

    // Step: Patch device's data
    await devicesAPI.patchDevice(firstDevice["id"], {
        "system_name": newName,
        "type": firstDevice["type"],
        "hdd_capacity": firstDevice["hdd_capacity"]
    });
    
    // Step: Reload the page and verify the modified device has the new name.
    await t.navigateTo("/");
    // Step: Assert device is found and validates the new device Data.
    let deviceElement = await DeviceListPage.getDeviceById(firstDevice["id"]);
    await t.expect(deviceElement.deviceElementSelector.exists).ok();
    await deviceElement.validateData(
        newName,
        firstDevice["type"],
        firstDevice["hdd_capacity"]
    )
});

test('Test deleting a device through API reflects changes in UI.', async t => {
    const devices = (await devicesAPI.getDevices())["body"];
    // Step: Obtain the first device and Delete device by API
    const firstDevice = devices[0];
    await devicesAPI.deleteDevice(firstDevice["id"]);
    // Refresh page
    await t.navigateTo("/");
    // Assert device is not found by ID.
    let deviceElement = DeviceListPage.getDeviceById(firstDevice["id"]);
    await t.expect(deviceElement.exists).notOk();
    await t.expect(await DeviceListPage.devicesSelector.count).eql(devices.length-1);
});

