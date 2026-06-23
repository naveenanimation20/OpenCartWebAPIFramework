
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
});

test('login page title test', async () => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async () => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app test', async () => {
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
});


//Ouath2.0
//API: clientID, cleintsecret, callback
//google auth
//github auth
//ms auth
//fb auth
