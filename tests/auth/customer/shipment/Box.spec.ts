import { test } from '@playwright/test';
import CustomerShipment from '@/POM/customer/Shipment';
import LoginPage from '@/POM/customer/LoginPage';
import AddressPage from '@/POM/customer/Address';
import { validUserCredentials } from '@/mocks/UserCredentials';
import TEST_CASE_CUSTOMER from '@/constants/customer/TEST_CUSTOMER';
import { Sizes } from '@/mocks/ShipmentMock';
 
test.describe.configure({ retries: 1 });

test.describe("Box Shipment Test", () => {
  let shipmentPage: CustomerShipment;
  let loginPage: LoginPage;
  let addressPage: AddressPage;


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    shipmentPage = new CustomerShipment(page);
    addressPage = new AddressPage(page);
 

    await loginPage.navigateToLoginPage();
    await loginPage.fillNumber(validUserCredentials.number);
    await loginPage.login();
    await loginPage.waitForOTPDelay();
    await loginPage.typeOTPViaKeyboard(validUserCredentials.otp);
    await loginPage.verifyRedirectedPage();

    // await addressPage.openSenderForm();
    // await addressPage.validAddress();
    // await addressPage.clickConfirmSenderButton();
    // await addressPage.openReceiverForm();
    // await addressPage.validAddress();
    // await addressPage.clickConfirmReceiverButton();

    
  });

    test(`${TEST_CASE_CUSTOMER["001"]} - [S] Valid Shipment & Price `, async () => {

        await shipmentPage.clickBox();
        await shipmentPage.validSmallBoxShipment();
        
    });

    test(`${TEST_CASE_CUSTOMER["002"]} - [M] Valid Shipment & Price `, async () => {

        await shipmentPage.clickBox();
        await shipmentPage.validMediumBoxShipment();
        
    });

    test(`${TEST_CASE_CUSTOMER["003"]} - [L] Valid Shipment & Price `, async () => {

        await shipmentPage.clickBox();
        await shipmentPage.validLargeBoxShipment();
        
    });

    test(`${TEST_CASE_CUSTOMER["004"]} - [XL] Valid Shipment &  Price`, async () => {

        await shipmentPage.clickBox();
        await shipmentPage.validExtraLargeBoxShipment();
        
    });
    test(`${TEST_CASE_CUSTOMER["005"]} - [BLKBYN] Valid Shipment & Price `, async () => {

        await shipmentPage.clickBox();
        await shipmentPage.validBalikBayanBoxShipment();
        
    });
    test(`${TEST_CASE_CUSTOMER["006"]} - Empty Sizes `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyBoxShipment();
        await shipmentPage.lengthError.waitFor({ state: 'visible' });
        await shipmentPage.widthError.waitFor({ state: 'visible' });
        await shipmentPage.heightError.waitFor({ state: 'visible' });
        await shipmentPage.weightError.waitFor({ state: 'visible' });
    
    });
    test (`${TEST_CASE_CUSTOMER["007"]} - Empty Length `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyLengthShipment();
       
    });
    test (`${TEST_CASE_CUSTOMER["008"]} - Empty Width `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyWidthShipment();
        
    });
    test (`${TEST_CASE_CUSTOMER["009"]} - Empty Height `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyHeightShipment();
        
    });
    test (`${TEST_CASE_CUSTOMER["010"]} - Empty Weight `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyWeightShipment();
        
    });
    test (`${TEST_CASE_CUSTOMER["011"]} - Empty Quantity `, async () => {
        await shipmentPage.clickBox();
        await shipmentPage.emptyQuantityShipment();
        
    });
    // test (`${TEST_CASE_CUSTOMER["012"]} - Max Weight `, async () => {
    //     await shipmentPage.clickBox();
    //     await shipmentPage.maxWeightShipment();
        
    // });
    
    
   

});