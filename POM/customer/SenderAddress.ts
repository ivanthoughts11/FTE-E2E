import { Locator, Page, expect } from "@playwright/test";
import { CUSTOMER_PAGE } from '@/constants/customer/page.constant';
import { senderAddress } from '@/mocks/AddressMock';

class SenderAdressPage {
    private page: Page;
    private senderAddress: Locator;
    private receiverAddress: Locator;
    private provinceDropdown: Locator;
    private cityDropdown: Locator;
    private brgyDropdown: Locator;
    private street: Locator;
    private senderName: Locator;
    private mobileNumber: Locator;
    private email: Locator;
    private companyName: Locator;
    private saveCheckbox: Locator;
    private saveAddress: Locator;
    private confirmButton: Locator;

    readonly provinceError: Locator;
    readonly cityError: Locator;
    readonly brgyError: Locator;
    readonly streetError: Locator;
    readonly senderNameError: Locator;
    readonly mobileNumberError: Locator;
    readonly emailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.senderAddress = page.getByRole('button', { name: 'Pick up at?' });
    this.receiverAddress = page.locator('//div[normalize-space()="Deliver to?""]');
    this.provinceDropdown = page.getByRole('combobox', { name: 'Province' });
    this.cityDropdown = page.getByRole('combobox').nth(1);
    this.brgyDropdown = page.getByRole('combobox').nth(2);

    this.street = page.locator('input[name="streetName"]');
    this.senderName = page.locator('input[name="name"]');
    this.mobileNumber = page.locator('input[name="mobileNumber"]');
    this.email = page.locator('input[name="email"]');
    this.companyName = page.locator('input[name="company"]');
    
    this.saveCheckbox = page.locator('//button[@id="shouldSaveAddress"]');
    this.saveAddress = page.locator('button[class="bg-gray-2 flex w-full items-center justify-between rounded-lg p-3"]');
    this.confirmButton = page.locator('//button[normalize-space()="Confirm pick up details"]');
   
    
    this.provinceError = page.locator('text=Please select a province');
    this.cityError = page.locator('text=Please select a city');
    this.brgyError = page.locator('text=Please select a barangay');
    this.streetError = page.locator('text=Please enter street address');
    this.senderNameError = page.locator('text=Please enter a name');
    this.mobileNumberError = page.locator('text=Please enter mobile number');
    this.emailError = page.locator('text=Please enter email');
    
  }

  async isAddressPage(): Promise<void> {
    await expect(this.page).toHaveURL(CUSTOMER_PAGE);
    await expect(this.senderAddress).toBeVisible();
    await expect(this.senderAddress).toBeVisible();
  } 
  async navigateToAddressPage(): Promise<void> {
        await this.page.goto(CUSTOMER_PAGE);
    }

  async fillSenderAddress(): Promise<void> {
        await this.senderAddress.click();
    }
  

  async selectProvince(province: string) {

    await expect(this.provinceDropdown).toBeVisible();
    await expect(this.provinceDropdown).toBeEnabled();
    await this.provinceDropdown.click();
    const option = this.page.getByRole('option', { name: province });
    await expect(option).toBeVisible();
    await option.click();
  

  }
  async selectCity(city: string) {
      
    await expect(this.cityDropdown).toBeVisible();
    await expect(this.cityDropdown).toBeEnabled();
    await this.cityDropdown.click();
    const option = this.page.getByRole('option', { name: city });
    await expect(option).toBeVisible();
    await option.click();
  }

  async selectBrgy(brgy: string) {
    await expect(this.brgyDropdown).toBeVisible();
    await expect(this.brgyDropdown).toBeEnabled();
    await this.brgyDropdown.click();
    const option = this.page.getByRole('option', { name: brgy});
    await expect(option).toBeVisible();
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
  async clickSaveCheckbox() {
    await expect(this.saveCheckbox).toBeVisible();
    await expect(this.saveCheckbox).toBeEnabled();
    await this.saveCheckbox.click();
  }
  async clickSaveAddress() {
    await expect(this.saveAddress).toBeVisible();
    await expect(this.saveAddress).toBeEnabled();
    await this.saveAddress.click();
  }
  async clickConfirmButton() {
    await expect(this.confirmButton).toBeVisible();
    await expect(this.confirmButton).toBeEnabled();
    await this.confirmButton.click();
  }

  async submitEmtpyAddress() {
    await this.clickConfirmButton();
    await expect(this.provinceError).toBeVisible();
    await expect(this.provinceError).toHaveText('Please select a province');
    await expect(this.cityError).toBeVisible();
    await expect(this.cityError).toHaveText('Please select a city');
    await expect(this.brgyError).toBeVisible();
    await expect(this.brgyError).toHaveText('Please select a barangay');
    await expect(this.streetError).toBeVisible();
    await expect(this.streetError).toHaveText('Please enter street address');
    await expect(this.senderNameError).toBeVisible();
    await expect(this.senderNameError).toHaveText('Please enter a name');
    await expect(this.mobileNumberError).toBeVisible();
    await expect(this.mobileNumberError).toHaveText('Please enter mobile number');
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toHaveText('Please enter email');
  }
  
  async submitValidAddress() {

    await this.selectProvince(senderAddress.province);
    await this.selectCity(senderAddress.city);
    await this.selectBrgy(senderAddress.brgy);
    await this.fillStreet(senderAddress.street);
    await this.fillSenderName(senderAddress.sender);
    await this.fillMobileNumber(senderAddress.mobile);
    await this.fillEmail(senderAddress.email);
    await this.fillCompanyName(senderAddress.company);
    await this.clickConfirmButton();
  }


}export default SenderAdressPage;