import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'https://testboard.avito.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL },
    },
  ],
});
