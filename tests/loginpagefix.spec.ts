
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('@smoke login page title test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('@regression forgot pwd link exist test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('@smoke user is able to login to app test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});


//DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
test('@regression login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});


//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test.skip(`@regression invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};


//MS excel - office latest
//xlsx format
//maintenance
let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for (let row of loginTestData) {
    test(`@regression invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};



let loginJSONData = JsonHelper.readJson("src/data/logindata.json");
for (let row of loginJSONData) {
    test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//csv vs excel vs json


//common tests:
test('@smoke comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});