import { test, expect } from '@playwright/test';
import LoginPage from '@/POM/admin/LoginPage';
import AUTH_TEST_CASE from '@/constants/admin/AUTH_TEST_CASE';
import { LOGIN_PAGE } from '@/constants/admin/page.constant';
import { validAdminCredentials, invalidAdminCredentials, invalidEmailAddress, InvalidPassword } from '@/mocks/AdminCredentials';


test.describe.configure({ retries: 1 });


test.describe("Admin Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  //-------VALID CREDENTIALS
   test(`${AUTH_TEST_CASE["001"]}`, async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(validAdminCredentials.username, validAdminCredentials.password);
    await loginPage.verifyRedirectedPage(); 
  });

//---------INVALID CREDENTIALS
  test(`${AUTH_TEST_CASE["002"]}`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(invalidAdminCredentials.username, invalidAdminCredentials.password);
    
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials. Please try again.');
    await expect(page).toHaveURL(LOGIN_PAGE); 
  });

//---------EMPTY CREDENTIALS
  test(`${AUTH_TEST_CASE["003"]}`, async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.emptyCredentials();
  await loginPage.login();

  await expect(loginPage.emailError).toBeVisible();
  await expect(loginPage.emailError).toHaveText('Invalid email address');

  await expect(loginPage.passwordError).toBeVisible();
  await expect(loginPage.passwordError).toHaveText('Password must be at least 6 characters long');
});

 //--------INVALID EMAIL FORMAT
test(`${AUTH_TEST_CASE["004"]}`, async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(invalidEmailAddress.username, invalidEmailAddress.password);

      
        await expect(loginPage.emailError).toBeVisible();
        await expect(loginPage.emailError).toHaveText('Invalid email address');
        
});

//----------INVALID PASSWORD FORMAT
test(`${AUTH_TEST_CASE["005"]}`, async () => {
await loginPage.navigateToLoginPage();
 await loginPage.userLogin(InvalidPassword.username, InvalidPassword.password);

  await expect(loginPage.passwordError).toBeVisible();
  await expect(loginPage.passwordError).toHaveText('Password must be at least 6 characters long');

  });
});