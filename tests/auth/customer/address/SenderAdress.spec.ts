import { test, expect } from '@playwright/test';
import CustomerAddress from '@/POM/customer/SenderAddress';
import TEST_CASE_CUSTOMER from '@/constants/customer/TEST_CUSTOMER'
import LoginPage from '@/POM/customer/LoginPage';
import { validUserCredentials} from '@/mocks/UserCredentials';


test.describe.configure({ retries: 1 });

test.describe("Sender Address Tests", () => {
  let CustomerPage: CustomerAddress;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    CustomerPage = new CustomerAddress(page);
    await loginPage.navigateToLoginPage();

    await loginPage.fillNumber(validUserCredentials.number);
    await loginPage.login();
    await loginPage.waitForOTPDelay();
    await loginPage.typeOTPViaKeyboard(validUserCredentials.otp);
    await loginPage.verifyRedirectedPage();
    await CustomerPage.isAddressPage();

  });

  

   test(`${TEST_CASE_CUSTOMER["001"]}`, async () => {
    
    await CustomerPage.fillSenderAddress();
    await CustomerPage.submitValidAddress();

});

  test(`${TEST_CASE_CUSTOMER["002"]}`, async () => {
    await CustomerPage.fillSenderAddress();
    await CustomerPage.submitEmtpyAddress();
    });
  







});