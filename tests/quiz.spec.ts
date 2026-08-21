import { expect, test } from '@playwright/test';

const quizPaths = ['/', '/check/'];

for (const path of quizPaths) {
  test(`quiz works without page errors on ${path}`, async ({ page }) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await page.goto(path);

    await expect(page.locator('#quiz-step-label')).toHaveText('Frage 1 von 3');

    await page
      .getByRole('button', { name: 'Ein bis zwei Tage, mit manuellen Schritten' })
      .click();
    await expect(page.locator('#quiz-step-label')).toHaveText('Frage 2 von 3');

    await page.getByRole('button', { name: 'Niemand — historisch gewachsen' }).click();
    await expect(page.locator('#quiz-step-label')).toHaveText('Frage 3 von 3');

    await page.getByRole('button', { name: 'Nein' }).click();

    await expect(page.locator('#quiz-result')).toBeVisible();
    await expect(page.locator('#quiz-step-label')).toHaveText('Empfehlung');
    await expect(page.locator('#quiz-result-title')).toHaveText(/\S+/);
    await expect(page.locator('#quiz-result-text')).toHaveText(/\S+/);
    await expect(page.locator('#quiz-progress-bar')).toHaveAttribute(
      'style',
      /width:\s*100%/
    );

    expect(pageErrors).toEqual([]);
  });
}
