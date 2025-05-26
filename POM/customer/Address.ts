import { Locator, Page, expect } from "@playwright/test";
import { CUSTOMER_PAGE } from '@/constants/customer/page.constant';
import { validAddress, invalidAddress } from '@/mocks/AddressMock';

class SenderAdressPage {
    private page: Page;
    private senderAddressButton: Locator;

    private provinceDropdown: Locator;
    private cityDropdown: Locator;
    private brgyDropdown: Locator;
    private street: Locator;
    private senderName: Locator;
    private receiverAddressButton: Locator;
    private mobileNumber: Locator;
    private email: Locator;
    private companyName: Locator;
    private saveCheckbox: Locator;
    private saveAddressButton: Locator;
    private selectSaveAddress: Locator;
    private confirmSenderButton: Locator;
    private confirmReceiverButton: Locator;



    readonly provinceError: Locator;
    readonly cityError: Locator;
    readonly brgyError: Locator;
    readonly streetError: Locator;
    readonly senderNameError: Locator;
    readonly mobileNumberError: Locator;
    readonly emailError: Locator;
    readonly nameFormatError: Locator;
    readonly emailFormatError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.senderAddressButton = page.getByRole('button', { name: 'Pick up at?' });
    this.receiverAddressButton = page.getByRole('button', { name: 'Deliver to?' });
    this.provinceDropdown = page.getByRole('combobox', { name: 'Province' });
    this.cityDropdown = page.getByRole('combobox').nth(1);
    this.brgyDropdown = page.getByRole('combobox').nth(2);

    this.street = page.locator('input[name="streetName"]');
    this.senderName = page.locator('input[name="name"]');
    this.mobileNumber = page.locator('input[name="mobileNumber"]');
    this.email = page.locator('input[name="email"]');
    this.companyName = page.locator('input[name="company"]');
    
    this.saveCheckbox = page.locator('//button[@id="shouldSaveAddress"]');
    this.confirmSenderButton = page.getByRole('button', { name: 'Confirm pick up details' });
    this.confirmReceiverButton = page.getByRole('button', { name: 'Confirm delivery details' });
    this.saveAddressButton = page.getByRole('button', { name: 'View Saved Addresses' });
    this.selectSaveAddress = page.locator('div.border-b button').nth(0);
    this.saveCheckbox = page.getByRole('checkbox', { name: 'Save this address and contact for future orders' });
   
    
    this.provinceError = page.locator('text=Please select a province');
    this.cityError = page.locator('text=Please select a city');
    this.brgyError = page.locator('text=Please select a barangay');
    this.streetError = page.locator('text=Please enter street address');
    this.senderNameError = page.locator('text=Please enter a name');
    this.nameFormatError = page.locator('text=Sender Name must not contain symbols');
    this.mobileNumberError = page.locator('text=Please enter mobile number');
    this.emailError = page.locator('text=Please enter email');
    this.emailFormatError = page.locator('text=Invalid email address.');

    
  }

 
  async navigateToAddressPage(): Promise<void> {
        await this.page.goto(CUSTOMER_PAGE);
    }

  async openSenderForm(): Promise<void> {
        await this.senderAddressButton.click();
    }
    async openReceiverForm(): Promise<void> {
        await this.receiverAddressButton.click();
    }

  async selectProvince(province: string): Promise<void> {
    await this.provinceDropdown.click();
    const option = this.page.getByRole('option', { name: province });
    await option.click();
  }

  async selectCity(city: string): Promise<void> {
    await this.cityDropdown.click();
    const option = this.page.getByRole('option', { name: city });
    await option.click();
  }

  async selectBrgy(brgy: string): Promise<void> {
    await this.brgyDropdown.click();
    const option = this.page.getByRole('option', { name: brgy });
    await option.click();
  }

  async fillStreet(street: string) {
    await this.street.click();
    await this.street.fill(street);
  }
  async fillSenderName(name: string) {
    await this.senderName.click();
    await this.senderName.fill(name);
  }
  async fillMobileNumber(number: string) {
    
    await this.mobileNumber.fill(number);
  }
  async fillEmail(email: string) {
    await expect(this.email).toBeVisible();
    await expect(this.email).toBeEnabled();
    await this.email.fill(email);
  }
  async fillCompanyName(company: string) {
    await expect(this.companyName).toBeVisible();
    await expect(this.companyName).toBeEnabled();
    await this.companyName.fill(company);
  }
 
  async clickSaveAddress() {
    await expect(this.saveAddressButton).toBeVisible();
    await expect(this.saveAddressButton).toBeEnabled();
    await this.saveAddressButton.click();
  }
 
  async clickConfirmSenderButton() {
    await expect(this.confirmSenderButton).toBeVisible();
    await expect(this.confirmSenderButton).toBeEnabled();
    await this.confirmSenderButton.click();
  }
  async clickConfirmReceiverButton() {
    await expect(this.confirmReceiverButton).toBeVisible();
    await expect(this.confirmReceiverButton).toBeEnabled();
    await this.confirmReceiverButton.click();
  }

  async emptyAddress() {
  
    await this.provinceError.waitFor({ state: 'visible' });
    await this.cityError.waitFor({ state: 'visible' });
    await this.brgyError.waitFor({ state: 'visible' });
    await this.streetError.waitFor({ state: 'visible' });
    await this.senderNameError.waitFor({ state: 'visible' });
    await this.mobileNumberError.waitFor({ state: 'visible' });
    await this.emailError.waitFor({ state: 'visible' });
  }
  
  async validAddress() {

    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
    await this.fillCompanyName(validAddress.company);

  }

 async emptyProvince() {

    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
   
    
  }

  async emptyCity() {
    await this.selectProvince(validAddress.province);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
  }
  async emptyBrgy() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
  }

  async emptyStreet() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);

  }
  async emptyName() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
 
  }

  async emptyMobile() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillEmail(validAddress.email);
    
  }
  async emptyEmail() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
   
  }

  async invalidMobile() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(invalidAddress.mobile);
    await this.fillEmail(validAddress.email);
   
  }

  async invalidEmail() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(validAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(invalidAddress.email);
   
  }

  async invalidSenderName() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(invalidAddress.sender);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
    
  }

  
  async invalidReceiverName() {
    await this.selectProvince(validAddress.province);
    await this.selectCity(validAddress.city);
    await this.selectBrgy(validAddress.brgy);
    await this.fillStreet(validAddress.street);
    await this.fillSenderName(invalidAddress.receiver);
    await this.fillMobileNumber(validAddress.mobile);
    await this.fillEmail(validAddress.email);
   
  }

  async clickSaveAddressCheckbox() {
    await expect(this.saveCheckbox).toBeVisible();
    await expect(this.saveCheckbox).toBeEnabled();
    await this.saveCheckbox.click();
  }
  
  
  async selectSavedAddress() {
    await expect(this.saveAddressButton).toBeVisible();
    await expect(this.saveAddressButton).toBeEnabled();
    await this.saveAddressButton.click();
    await this.selectSaveAddress.waitFor({ state: 'visible' });
    await this.selectSaveAddress.click();
  }

}
export default SenderAdressPage;