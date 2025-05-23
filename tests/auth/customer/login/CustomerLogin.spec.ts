import { test, expect } from '@playwright/test';
import LoginPage from '@/POM/customer/LoginPage';
import AUTH_TEST_CASE from 'constants/customer/AUTH_TEST_CASE';
import { LOGIN_PAGE } from '@/constants/customer/page.constant';
import { validUserCredentials, invalidNumber, invalidOtp, emptyUserCredentials} from '@/mocks/UserCredentials';


test.describe.configure({ retries: 1 });


test.describe("Customer Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });


   test(`${AUTH_TEST_CASE["001"]} - Valid Number`, async () => {
        await loginPage.fillNumber(validUserCredentials.number);
        await loginPage.login();
        await loginPage.waitForOTPDelay();
        await loginPage.typeOTPViaKeyboard(validUserCredentials.otp);
        await loginPage.verifyRedirectedPage();
});


  test(`${AUTH_TEST_CASE["002"]} - Invalid Number`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillNumber(invalidNumber.number);
        await loginPage.login();
        await expect(loginPage.numberError).toHaveText('Must be a valid mobile number');
        await expect(page).toHaveURL(LOGIN_PAGE); 
  });


  test(`${AUTH_TEST_CASE["003"]} - Empty Number`, async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.fillNumber(emptyUserCredentials.number);
        await loginPage.login();
        await expect(loginPage.numberError).toBeVisible();
        await expect(loginPage.numberError).toHaveText('Must be a valid mobile number');

});

test(`${AUTH_TEST_CASE["004"]} - Invalid OTP`, async () => {
        await loginPage.fillNumber(invalidOtp.number);
        await loginPage.login();
        await loginPage.waitForOTPDelay();
        await loginPage.typeOTPViaKeyboard(invalidOtp.otp);
        await loginPage.waitForOTPDelay();
        await expect(loginPage.invalidOTP).toBeVisible();
        await expect(loginPage.invalidOTP).toHaveText('The verification code you entered is incorrect. Please try again.');
        
});

test(`${AUTH_TEST_CASE["005"]} - OTP Max Attempts Reached`, async () => {
        await loginPage.fillNumber(validUserCredentials.number)
        await loginPage.login();
        await loginPage.waitForOTPDelay();
        await loginPage.typeOTPViaKeyboard(invalidOtp.otp);
        await expect(loginPage.otpError).toBeVisible();
        await expect(loginPage.otpError).toHaveText('You have reached the maximum number of attempts. Resend for a new one.');

  });
 });