
import { log, meta, testData } from 'reporting-labs';
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('@smoke login page title test', async ({ loginPage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
    const pageTitle = await loginPage.getPageTitle();
    console.log('login page title', pageTitle);
    log('page title: ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('@regression forgot pwd link exist test', async ({ loginPage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('@smoke user is able to login to app test', async ({ loginPage, homePage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});


//DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
test('@regression login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});


//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
let testCSVData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testCSVData) {
    test(`@regression invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

        testData(testCSVData, 'Login');

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
        meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

        testData(loginTestData, 'Login');
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};



let loginJSONData = JsonHelper.readJson("src/data/logindata.json");
for (let row of loginJSONData) {
    test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
        meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

        testData(loginJSONData, 'Login');
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//csv vs excel vs json


//common tests:
test('@smoke comp logo exists on product page', async ({ basePage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke footers exist on product page', async ({ basePage }) => {
    meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })

    expect(await basePage.getPageFootersCount()).toBe(16);
});