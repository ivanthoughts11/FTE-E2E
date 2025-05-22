import { Locator, Page} from '@playwright/test';
import { receiverAddress } from '@/mocks/AddressMock';

class ReceiverAddressPage {
  private page: Page;
  private receiverAddressButton: Locator;
  private provinceDropdown: Locator;
  private cityDropdown: Locator;
  private brgyDropdown: Locator;
  private streetInput: Locator;
  private nameInput: Locator;
  private mobileNumberInput: Locator;
  private emailInput: Locator;
  private confirmButton: Locator;

  readonly provinceError: Locator;
  readonly cityError: Locator;
  readonly brgyError: Locator;
  readonly streetError: Locator;
  readonly receiverNameError: Locator;
  readonly mobileNumberError: Locator;
  readonly emailError: Locator;
    


  constructor(page: Page) {
    this.page = page;
    this.receiverAddressButton = page.getByRole('button', { name: 'Deliver to?' });
    this.provinceDropdown = page.getByRole('combobox', { name: 'Province' });
    this.cityDropdown = page.getByRole('combobox').nth(1);
    this.brgyDropdown = page.getByRole('combobox').nth(2);

    this.streetInput = page.locator('input[name="streetName"]');
    this.nameInput = page.locator('input[name="name"]');
    this.mobileNumberInput = page.locator('input[name="mobileNumber"]');
    this.emailInput = page.locator('input[name="email"]');

    this.confirmButton = page.getByRole('button', { name: 'Confirm delivery details' });

    this.provinceError = page.locator('text=Please select a province');
    this.cityError = page.locator('text=Please select a city');
    this.brgyError = page.locator('text=Please select a barangay');
    this.streetError = page.locator('text=Please enter street address');
    this.receiverNameError = page.locator('text=Please enter a name');
    this.mobileNumberError = page.locator('text=Please enter mobile number');
    this.emailError = page.locator('text=Please enter email');
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

  async fillStreet(street: string): Promise<void> {
    await this.streetInput.fill(street);
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillMobileNumber(number: string): Promise<void> {
    await this.mobileNumberInput.fill(number);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async submitReceiverForm(): Promise<void> {
    await this.selectProvince(receiverAddress.province);
    await this.selectCity(receiverAddress.city);
    await this.selectBrgy(receiverAddress.brgy);
    await this.fillStreet(receiverAddress.street);
    await this.fillName(receiverAddress.receiver);
    await this.fillMobileNumber(receiverAddress.mobile);
    await this.fillEmail(receiverAddress.email);
    await this.clickConfirm();
  }
    async submitEmptyReceiverForm(): Promise<void> {
        await this.clickConfirm();
        await this.provinceError.waitFor({ state: 'visible' });
        await this.cityError.waitFor({ state: 'visible' });
        await this.brgyError.waitFor({ state: 'visible' });
        await this.streetError.waitFor({ state: 'visible' });
        await this.receiverNameError.waitFor({ state: 'visible' });
        await this.mobileNumberError.waitFor({ state: 'visible' });
        await this.emailError.waitFor({ state: 'visible' });
    }
    
  
  
}

export default ReceiverAddressPage;
