import { test } from '@playwright/test';
import ReceiverAddressPage from '@/POM/customer/ReceiverAddress';
import LoginPage from '@/POM/customer/LoginPage';
import { validUserCredentials } from '@/mocks/UserCredentials';
import TEST_CASE_CUSTOMER from '@/constants/customer/TEST_CUSTOMER';

test.describe.configure({ retries: 1 });

test.describe("Receiver Address Tests", () => {
  let receiverPage: ReceiverAddressPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    receiverPage = new ReceiverAddressPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillNumber(validUserCredentials.number);
    await loginPage.login();
    await loginPage.waitForOTPDelay();
    await loginPage.typeOTPViaKeyboard(validUserCredentials.otp);
    await loginPage.verifyRedirectedPage();
  });

  test(`${TEST_CASE_CUSTOMER["001"]} - Submit valid address`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.submitReceiverForm();
  });

    test(`${TEST_CASE_CUSTOMER["002"]} - Submit empty address`, async () => {
        await receiverPage.openReceiverForm();
         await receiverPage.submitEmptyReceiverForm();
    });

});
