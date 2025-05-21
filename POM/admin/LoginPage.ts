import { Locator, Page, expect } from "@playwright/test";
import { LOGIN_PAGE, ADMIN_PAGE } from '@/constants/admin/page.constant';

class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  readonly errorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError : Locator;

  private adminUser = {
    email: process.env.ADMIN_USERNAME || "",
    password: process.env.ADMIN_PASSWORD || "",
  };

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');

    this.errorMessage = page.locator('text=Invalid credentials. Please try again.');
    this.emailError = page.locator('text=Invalid email address');
    this.passwordError = page.locator('text=Password must be at least 6 characters long');

  }

  async isLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(LOGIN_PAGE);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(LOGIN_PAGE);
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async emptyCredentials(): Promise<void> {
    await this.emailInput.fill(""); 
    await this.passwordInput.fill("");

  }
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  async clearEmail(): Promise<void> {
    await this.emailInput.fill("");
  }
  async clearPassword(): Promise<void> {
    await this.passwordInput.fill("");
  }
  async clearCredentials(): Promise<void> {
    await this.clearEmail();
    await this.clearPassword();
  }
  
  async login(): Promise<void> {
    await this.loginButton.click();
  }

  async verifyRedirectedPage(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveURL(ADMIN_PAGE);
  }

  async userLogin(email?: string, password?: string): Promise<void> {
    await this.fillCredentials(email || this.adminUser.email, password || this.adminUser.password);
    await this.login();
  }
  
  
}

export default LoginPage;
