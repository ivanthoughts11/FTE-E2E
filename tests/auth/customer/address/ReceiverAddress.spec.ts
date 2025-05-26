import { test } from '@playwright/test';
import ReceiverAddressPage from '@/POM/customer/Address';
import LoginPage from '@/POM/customer/LoginPage';
import { validUserCredentials } from '@/mocks/UserCredentials';
import TEST_CASE_CUSTOMER from '@/constants/customer/TEST_CUSTOMER';

test.describe.configure({ retries: 1 });

test.describe("Address Form Tests", () => {
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

  test(`${TEST_CASE_CUSTOMER["001"]} - Valid Address`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.validAddress();
    await receiverPage.clickConfirmReceiverButton();
  });

    test(`${TEST_CASE_CUSTOMER["002"]} - Empty Address`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.emptyAddress();
    await receiverPage.provinceError.waitFor({ state: 'visible' });
    await receiverPage.cityError.waitFor({ state: 'visible' });
    await receiverPage.brgyError.waitFor({ state: 'visible' });
    await receiverPage.streetError.waitFor({ state: 'visible' });
    await receiverPage.senderNameError.waitFor({ state: 'visible' });
    await receiverPage.mobileNumberError.waitFor({ state: 'visible' });
    await receiverPage.emailError.waitFor({ state: 'visible' });

    });

    
  test(`${TEST_CASE_CUSTOMER["003"]} - Empty Province`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyProvince();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.provinceError.waitFor({ state: 'visible' });
    await receiverPage.cityError.waitFor({ state: 'visible' });
    await receiverPage.brgyError.waitFor({ state: 'visible' });
  

  });
  test(`${TEST_CASE_CUSTOMER["004"]} - Empty City`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyCity();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.cityError.waitFor({ state: 'visible' });
    await receiverPage.brgyError.waitFor({ state: 'visible' });
  });
  test(`${TEST_CASE_CUSTOMER["005"]} - Empty Barangay`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyBrgy();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.brgyError.waitFor({ state: 'visible' });

  });
  test(`${TEST_CASE_CUSTOMER["006"]} - Empty Street`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyStreet();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.streetError.waitFor({ state: 'visible' });

  });
  test(`${TEST_CASE_CUSTOMER["007"]} - Empty Receiver`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyName();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.senderNameError.waitFor({ state: 'visible' });
  });
  test(`${TEST_CASE_CUSTOMER["008"]} - Empty Mobile`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyMobile();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.mobileNumberError.waitFor({ state: 'visible' });
  });
  test(`${TEST_CASE_CUSTOMER["009"]} - Invalid Mobile Format`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.invalidMobile();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.mobileNumberError.waitFor({ state: 'visible' });
  });
  test(`${TEST_CASE_CUSTOMER["010"]} - Empty Email`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.emptyEmail();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.emailError.waitFor({ state: 'visible' });
  });
  test(`${TEST_CASE_CUSTOMER["011"]} - Invalid Email Format`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.invalidEmail();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.emailFormatError.waitFor({ state: 'visible' });
    
  });
  test(`${TEST_CASE_CUSTOMER["012"]} - Invalid Reciever Name Format`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.invalidSenderName();
    await receiverPage.clickConfirmReceiverButton();
    await receiverPage.nameFormatError.waitFor({ state: 'visible' });
    
  });

test(`${TEST_CASE_CUSTOMER["013"]} - Save Address`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.validAddress();
    await receiverPage.clickSaveAddressCheckbox();
    await receiverPage.clickConfirmReceiverButton();
    
  });

  test(`${TEST_CASE_CUSTOMER["014"]} - Use Save Address`, async () => {
    await receiverPage.openReceiverForm();
    await receiverPage.selectSavedAddress();
    await receiverPage.clickConfirmReceiverButton();
  });
  


});
