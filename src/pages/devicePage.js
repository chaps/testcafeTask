import { Selector, t } from 'testcafe';

export default class DevicePage {

    static systemNameInput = Selector("#system_name");
    static systemTypeSelect = Selector("#type");
    static systemHDDCapacity = Selector("#hdd_capacity");
    static submitButton = Selector(".submitButton");

    /**
     * Fills the form with the given data.
     * 
     * @param  {string} systemName   
     *         A string containing the name for the new device
     * 
     * @param  {string} systemType   
     *         A string containing the Type to select
     * 
     * @param  {string} systemHDDCapacity   
     *         A string containing the HDD capacity for the new device
     */
    async fillForm(systemName, systemType, systemHDDCapacity){
        await t.typeText(DevicePage.systemNameInput, systemName);
        await this.selectSystemType(systemType);
        await t.typeText(DevicePage.systemHDDCapacity, systemHDDCapacity);
        
    }

    /**
     * Selects the option which text matches the given text as an argument
     * 
     * @param  {string} systemType   
     *         A string containing the Type to select
     */
    async selectSystemType(systemType){
        await t.click(DevicePage.systemTypeSelect).click(
            DevicePage.systemTypeSelect.find("option").withText(systemType)
        );
    }

    /**
     * Clicks the submit button to submit the form
     */
    async submitForm(){
        await t.click(DevicePage.submitButton);    
    }

    /**
     * Fills the form with the given data and submits the form to create a new device
     * 
     * @param  {string} systemName   
     *         A string containing the name for the new device
     * 
     * @param  {string} systemType   
     *         A string containing the Type to select
     * 
     * @param  {string} systemHDDCapacity   
     *         A string containing the HDD capacity for the new device
     */
    async fillAndSubmit(systemName, systemType, systemHDDCapacity){
        await this.fillForm(systemName, systemType, systemHDDCapacity);
        await this.submitForm();
    }
}