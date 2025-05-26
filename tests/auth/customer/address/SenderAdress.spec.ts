import { test } from '@playwright/test';
import CustomerAddress from '@/POM/customer/Address';
import TEST_CASE_CUSTOMER from '@/constants/customer/TEST_CUSTOMER'
import LoginPage from '@/POM/customer/LoginPage';
import { validUserCredentials} from '@/mocks/UserCredentials';


test.describe.configure({ retries: 1 });

test.describe("Address Form Tests", () => {
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
   

  });

  
   test(`${TEST_CASE_CUSTOMER["001"]} - Valid Address ` , async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.validAddress();
    await CustomerPage.clickConfirmSenderButton();

});

  test(`${TEST_CASE_CUSTOMER["002"]} - Empty Form `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.emptyAddress();
    });
  
  test(`${TEST_CASE_CUSTOMER["003"]} - Empty Province `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyProvince();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.provinceError.waitFor({ state: 'visible' });
    await CustomerPage.cityError.waitFor({ state: 'visible' });
    await CustomerPage.brgyError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["004"]} - Empty City `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyCity();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.cityError.waitFor({ state: 'visible' });
    await CustomerPage.brgyError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["005"]} - Empty Barangay `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyBrgy();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.brgyError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["006"]} - Empty Street `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyStreet();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.streetError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["007"]} - Empty Sender Name `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyName();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.senderNameError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["008"]} - Empty Mobile Number `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyMobile();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.mobileNumberError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["009"]} - Empty Email `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.emptyEmail();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.emailError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["010"]} - Invalid Mobile Number Format `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.invalidMobile();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.mobileNumberError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["011"]} - Invalid Email Format `, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.invalidEmail();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.emailFormatError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["012"]} - Invalid Sender Name Format`, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.invalidSenderName();
    await CustomerPage.clickConfirmSenderButton();
    await CustomerPage.nameFormatError.waitFor({ state: 'visible' });
  });

  test(`${TEST_CASE_CUSTOMER["013"]} - Save Address`, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.validAddress();
    await CustomerPage.clickSaveAddressCheckbox();
    await CustomerPage.clickConfirmSenderButton();
    
  });

  test(`${TEST_CASE_CUSTOMER["014"]} - Use Save Address`, async () => {
    await CustomerPage.openSenderForm();
    await CustomerPage.selectSavedAddress();
    await CustomerPage.clickConfirmSenderButton();
  });

  
  
});
