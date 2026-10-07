# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginpagefix.spec.ts >> @smoke comp logo exists on product page
- Location: tests/loginpagefix.spec.ts:91:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - button "$ Currency " [ref=e7] [cursor=pointer]:
        - strong [ref=e8]: $
        - text: Currency
        - generic [ref=e9]: 
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "" [ref=e13] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - generic [ref=e14]: 
          - text: "123456789"
        - listitem [ref=e15]:
          - link " My Account" [ref=e16] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - generic [ref=e17]: 
            - text: My Account
        - listitem [ref=e19]:
          - link " Wish List (0)" [ref=e20] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - generic [ref=e21]: 
            - text: Wish List (0)
        - listitem [ref=e22]:
          - link " Shopping Cart" [ref=e23] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
            - generic [ref=e24]: 
            - text: Shopping Cart
        - listitem [ref=e25]:
          - link " Checkout" [ref=e26] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
            - generic [ref=e27]: 
            - text: Checkout
  - banner [ref=e28]:
    - generic [ref=e30]:
      - link "naveenopencart" [ref=e33] [cursor=pointer]:
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
        - img "naveenopencart" [ref=e34]
      - generic [ref=e36]:
        - textbox "Search" [ref=e37]
        - button "" [ref=e39] [cursor=pointer]:
          - generic [ref=e40]: 
      - button " 0 item(s) - $0.00" [ref=e43] [cursor=pointer]:
        - generic [ref=e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=e46]:
    - generic: 
    - list [ref=e48]:
      - listitem [ref=e49]:
        - link "Desktops" [ref=e50] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
      - listitem [ref=e51]:
        - link "Laptops & Notebooks" [ref=e52] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
      - listitem [ref=e53]:
        - link "Components" [ref=e54] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
      - listitem [ref=e55]:
        - link "Tablets" [ref=e56] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
      - listitem [ref=e57]:
        - link "Software" [ref=e58] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
      - listitem [ref=e59]:
        - link "Phones & PDAs" [ref=e60] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
      - listitem [ref=e61]:
        - link "Cameras" [ref=e62] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
      - listitem [ref=e63]:
        - link "MP3 Players" [ref=e64] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
  - generic [ref=e65]:
    - list [ref=e66]:
      - listitem [ref=e67]:
        - link "" [ref=e68] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
          - generic [ref=e69]: 
      - listitem [ref=e70]:
        - link "Account" [ref=e71] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
      - listitem [ref=e72]:
        - link "Login" [ref=e73] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
    - generic [ref=e74]:
      - generic [ref=e76]:
        - generic [ref=e78]:
          - heading "New Customer" [level=2] [ref=e79]
          - paragraph [ref=e80]:
            - strong [ref=e81]: Register Account
          - paragraph [ref=e82]: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
          - link "Continue" [ref=e83] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
        - generic [ref=e85]:
          - heading "Returning Customer" [level=2] [ref=e86]
          - paragraph [ref=e87]:
            - strong [ref=e88]: I am a returning customer
          - generic [ref=e89]:
            - generic [ref=e90]:
              - generic [ref=e91]: E-Mail Address
              - textbox "E-Mail Address" [ref=e92]
            - generic [ref=e93]:
              - generic [ref=e94]: Password
              - textbox "Password" [ref=e95]
              - link "Forgotten Password" [ref=e96] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
            - button "Login" [ref=e97] [cursor=pointer]
      - complementary [ref=e98]:
        - generic [ref=e99]:
          - link "Login" [ref=e100] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/login
          - link "Register" [ref=e101] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/register
          - link "Forgotten Password" [ref=e102] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten
          - link "My Account" [ref=e103] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
          - link "Address Book" [ref=e104] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
          - link "Wish List" [ref=e105] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
          - link "Order History" [ref=e106] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
          - link "Downloads" [ref=e107] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
          - link "Recurring payments" [ref=e108] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
          - link "Reward Points" [ref=e109] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
          - link "Returns" [ref=e110] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
          - link "Transactions" [ref=e111] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
          - link "Newsletter" [ref=e112] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
  - contentinfo [ref=e113]:
    - generic [ref=e114]:
      - generic [ref=e115]:
        - generic [ref=e116]:
          - heading "Information" [level=5] [ref=e117]
          - list [ref=e118]:
            - listitem [ref=e119]:
              - link "About Us" [ref=e120] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=e121]:
              - link "Delivery Information" [ref=e122] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=e123]:
              - link "Privacy Policy" [ref=e124] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=e125]:
              - link "Terms & Conditions" [ref=e126] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
        - generic [ref=e127]:
          - heading "Customer Service" [level=5] [ref=e128]
          - list [ref=e129]:
            - listitem [ref=e130]:
              - link "Contact Us" [ref=e131] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - listitem [ref=e132]:
              - link "Returns" [ref=e133] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
            - listitem [ref=e134]:
              - link "Site Map" [ref=e135] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
        - generic [ref=e136]:
          - heading "Extras" [level=5] [ref=e137]
          - list [ref=e138]:
            - listitem [ref=e139]:
              - link "Brands" [ref=e140] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
            - listitem [ref=e141]:
              - link "Gift Certificates" [ref=e142] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
            - listitem [ref=e143]:
              - link "Affiliate" [ref=e144] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
            - listitem [ref=e145]:
              - link "Specials" [ref=e146] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
        - generic [ref=e147]:
          - heading "My Account" [level=5] [ref=e148]
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "My Account" [ref=e151] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - listitem [ref=e152]:
              - link "Order History" [ref=e153] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
            - listitem [ref=e154]:
              - link "Wish List" [ref=e155] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - listitem [ref=e156]:
              - link "Newsletter" [ref=e157] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
      - separator [ref=e158]
      - paragraph [ref=e159]:
        - text: Powered By
        - link "OpenCart" [ref=e160] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: naveenopencart © 2026
```

# Test source

```ts
  1   | 
  2   | import { log, meta, testData } from 'reporting-labs';
  3   | import { test, expect } from '../src/fixtures/pagefixtures';
  4   | import { CsvHelper } from '../src/utils/CsvHelper';
  5   | import { ExcelHelper } from '../src/utils/ExcelHelper';
  6   | import { JsonHelper } from '../src/utils/JsonHelper';
  7   | 
  8   | test.beforeEach(async ({ loginPage }) => {
  9   |     await loginPage.goToLoginPage();
  10  | });
  11  | 
  12  | test('@smoke login page title test', async ({ loginPage }) => {
  13  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  14  |     const pageTitle = await loginPage.getPageTitle();
  15  |     console.log('login page title', pageTitle);
  16  |     log('page title: ', pageTitle);
  17  |     expect(pageTitle).toBe('Account Login');
  18  | });
  19  | 
  20  | test('@regression forgot pwd link exist test', async ({ loginPage }) => {
  21  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  22  | 
  23  |     expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
  24  | });
  25  | 
  26  | test('@smoke user is able to login to app test', async ({ loginPage, homePage }) => {
  27  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  28  | 
  29  |     await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
  30  |     expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
  31  |     expect.soft(await homePage.getPageTitle()).toBe('My Account');
  32  | });
  33  | 
  34  | 
  35  | //DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
  36  | test('@regression login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
  37  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  38  | 
  39  |     for (let row of testData) {
  40  |         await loginPage.doLogin(row.username, row.password);
  41  |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  42  |     }
  43  | });
  44  | 
  45  | 
  46  | //DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
  47  | let testCSVData = CsvHelper.readCsv('src/data/loginData.csv');
  48  | for (let row of testCSVData) {
  49  |     test(`@regression invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
  50  |         meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  51  | 
  52  |         testData(testCSVData, 'Login');
  53  | 
  54  |         await loginPage.doLogin(row.username, row.password);
  55  |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  56  |     });
  57  | };
  58  | 
  59  | 
  60  | //MS excel - office latest
  61  | //xlsx format
  62  | //maintenance
  63  | let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
  64  | for (let row of loginTestData) {
  65  |     test(`@regression invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
  66  |         meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  67  | 
  68  |         testData(loginTestData, 'Login');
  69  |         await loginPage.doLogin(row.username, row.password);
  70  |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  71  |     });
  72  | };
  73  | 
  74  | 
  75  | 
  76  | let loginJSONData = JsonHelper.readJson("src/data/logindata.json");
  77  | for (let row of loginJSONData) {
  78  |     test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
  79  |         meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  80  | 
  81  |         testData(loginJSONData, 'Login');
  82  |         await loginPage.doLogin(row.username, row.password);
  83  |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  84  |     });
  85  | };
  86  | 
  87  | //csv vs excel vs json
  88  | 
  89  | 
  90  | //common tests:
  91  | test('@smoke comp logo exists on product page', async ({ basePage }) => {
  92  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  93  | 
> 94  |     expect(await basePage.isLogoVisible()).toBeTruthy();
      |                                            ^ Error: expect(received).toBeTruthy()
  95  | });
  96  | 
  97  | test('@smoke footers exist on product page', async ({ basePage }) => {
  98  |     meta({ priority: 'P1', severity: 'critical', owner: 'NaveenK', feature: 'Login Page', story: 'US101', epic: 'EC900' })
  99  | 
  100 |     expect(await basePage.getPageFootersCount()).toBe(16);
  101 | });
```