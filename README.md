# OpenCartWebAPIFramework

Playwright TypeScript Framework with POM, Fixtures, API Testing, Data-Driven.

## Install

```bash
npm install OpenCartWebAPIFramework
```

## Usage

```typescript
import { LoginPage, HomePage, ApiHelper, CsvHelper } from 'OpenCartWebAPIFramework';

// Use page objects
const loginPage = new LoginPage(page);
await loginPage.doLogin('user@test.com', 'password');

// Use API helper
const apiHelper = new ApiHelper(request, 'https://api.example.com');
const response = await apiHelper.get('/users');

// Use data helpers
const data = CsvHelper.readCsv('test-data.csv');
```

## Features

- BasePage with common utilities
- Page Object Model (LoginPage, HomePage, RegisterPage, SearchResultsPage)
- Custom Playwright Fixtures
- API Helper (GET, POST, PUT, DELETE)
- Data Helpers (CSV, Excel, JSON)
- String Utilities
- TypeScript Interfaces