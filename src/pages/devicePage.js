import { Selector, t } from 'testcafe';

export default class DevicePage {

    static systemNameInput = Selector("#system_name");
    static systemTypeSelect = Selector("#type");
    static systemHDDCapacity = Selector("#hdd_capacity");
    static submitButton = Selector(".submitButton");

    async fillForm(systemName, systemType, systemHDDCapacity){
        await t.typeText(DevicePage.systemNameInput, systemName);
        await this.selectSystemType(systemType);
        await t.typeText(DevicePage.systemHDDCapacity, systemHDDCapacity);
        
    }
    async selectSystemType(systemType){
        await t.click(DevicePage.systemTypeSelect).click(
            DevicePage.systemTypeSelect.find("option").withText(systemType)
        );
    }

    async submitForm(){
        await t.click(DevicePage.submitButton);    
    }

    async fillAndSubmit(systemName, systemType, systemHDDCapacity){
        await this.fillForm(systemName, systemType, systemHDDCapacity);
        await this.submitForm();
    }
}