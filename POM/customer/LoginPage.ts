import { Locator, Page, expect } from "@playwright/test";
import { LOGIN_PAGE, CUSTOMER_PAGE } from '@/constants/customer/page.constant';


class LoginPage {
  private page: Page;
  private numberInput: Locator;
  private otpInput: Locator;
  private numberSubmit: Locator;

  readonly invalidOTP: Locator;
  readonly numberError: Locator;
  readonly otpError : Locator;

  private customerUser = {
    number: process.env.CUSTOMER_NUMBER || "",
    otp: process.env.CUSTOMER_OTP || "",
  };

  constructor(page: Page) {
    this.page = page;
    this.numberInput = page.locator('input[id=":r2:-form-item"]');
    this.otpInput = page.locator('input[id=":r7:-form-item"]');
    this.numberSubmit = page.locator('button[type="submit"]');
    
    this.numberError = page.locator('text=Must be a valid mobile number');
    this.invalidOTP = page.locator('text=The verification code you entered is incorrect. Please try again.');
    this.otpError = page.locator('text=You have reached the maximum number of attempts. Resend for a new one.');

  }

  async isLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(LOGIN_PAGE);
    await expect(this.numberInput).toBeVisible();
    await expect(this.numberSubmit).toBeVisible();
  
  }
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(LOGIN_PAGE);
  }

  async fillNumber(number: string): Promise<void> {
    await this.numberInput.click();
    
    await this.numberInput.fill(number);
  }

  async waitForOTPDelay(ms: number = 3000): Promise<void> {
  await this.page.waitForTimeout(ms);
}

async typeOTPViaKeyboard(otp: string): Promise<void> {
  await this.page.keyboard.type(otp, { delay: 100 });
}

 async fillOTP(otp: string): Promise<void> {
  await this.otpInput.waitFor({ state: 'visible' });
  await this.otpInput.focus();
  await this.otpInput.type(otp, { delay: 100 });
}


async login(): Promise<void> {
    await this.numberSubmit.click();
  }

  async verifyRedirectedPage(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(CUSTOMER_PAGE);
  }

  
}

export default LoginPage;
