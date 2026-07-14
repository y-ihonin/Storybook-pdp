import { test, expect } from '@playwright/test';

test('Check screenshots of existing storybooks', async ({ page }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storybookConfig: any | null = null;

  await expect(async () => {
    const response = await page.request.get('index.json');
    expect(response.ok()).toBeTruthy();
    storybookConfig = await response.json();
    expect(storybookConfig?.entries).toBeTruthy();
  }).toPass({ timeout: 600000 });

  const storybooks = Object.keys(storybookConfig.entries).filter(
    (entry) => storybookConfig.entries[entry].type === 'story',
  );

  const errors = [];
  
  for (const story of storybooks) {
    const url = `iframe.html?id=${story}&viewMode=story`;
    await expect.poll(async () => {
      const response = await page.request.get(url);
      return response.status();
    }).toBe(200);
    
    await page.goto(url);
    await expect(page.locator("#storybook-root")).toBeVisible();
    await expect(page.locator(".sb-preparing-story .sb-loader")).not.toBeVisible();
    await page.waitForTimeout(1000);

    try {
      await expect(page).toHaveScreenshot(`${story}.png`, { fullPage: true });
    } catch (e: unknown) {
      if (e instanceof Error) {
        errors.push(e.message);
      }
    }
  }

  if (errors.length > 0) {
    const errorMessage = `${errors.join('\n')}`;
    throw new Error(errorMessage);
  }
});
