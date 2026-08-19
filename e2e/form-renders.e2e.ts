import { test, expect } from '@playwright/test';
import rawSchema from '../src/app/adult-1.6.json';

// Smoke test for the render path unit tests can't reach: schema compilation,
// form-tree construction, and control binding in a real browser.
//
// We assert positive rendering signals rather than the absence of console
// errors, because the standalone demo can't resolve a few O3-only question
// types (e.g. workspace-launcher) and logs expected framework errors.

// Labels come from the schema so the test covers exactly the pages it defines.
const pageLabels = (rawSchema as { pages: Array<{ label: string }> }).pages.map(
  (page) => page.label
);

// The engine renders only the active page's pane (inactive tabs are removed
// from the DOM), so `.pane > h4` is the heading of the one visible page.
const activePaneHeading = '.pane > h4';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // The form renders after mocked concept and translation resolution.
  await expect(page.locator(activePaneHeading)).toHaveText(pageLabels[0], {
    timeout: 30_000
  });
});

test('renders every schema page when its tab is selected', async ({ page }) => {
  const tabs = page.locator('button.tablinks');
  await expect(tabs).toHaveCount(pageLabels.length);

  // Select each page and confirm its pane actually renders. Checking only the
  // tab buttons would pass even if every non-active page failed to render.
  for (let i = 0; i < pageLabels.length; i++) {
    await tabs.nth(i).click();
    await expect(page.locator(activePaneHeading)).toHaveText(pageLabels[i]);
  }

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});

test('uploads a file through the registered file data source', async ({
  page
}) => {
  // The ART drug sensitivity question on Test Results renders a file field
  // with no hide expression, backed by the demo's mock 'file' data source.
  await page.locator('button.tablinks', { hasText: 'Test Results' }).click();
  await expect(page.locator(activePaneHeading)).toHaveText('Test Results');

  // Sections render as collapsed accordions; expand the one with the field.
  await page
    .getByRole('button', { name: 'ART Drug Sensitivity Test' })
    .click();

  const uploader = page.locator('ofe-file-upload').first();
  await uploader.getByText('Image', { exact: true }).click();

  const onePixelPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  await uploader
    .locator('input[type=file]')
    .first()
    .setInputFiles({
      name: 'result.png',
      mimeType: 'image/png',
      buffer: onePixelPng
    });
  await uploader.getByRole('button', { name: 'Upload', exact: true }).click();

  // The preview is gated by *ngIf on the control value, so its presence proves
  // the upload round-tripped through the data source into the form control.
  // Attachment, not visibility: the img box can be empty while its src loads.
  await expect(uploader.locator('img.img-responsive')).toBeAttached();
});

test('renders and binds an interactive field', async ({ page }) => {
  const visitDate = page.getByPlaceholder('dd/mm/yyyy hh:mm');
  await expect(visitDate).toBeVisible();

  await visitDate.fill('13/07/2026 10:30');
  await expect(visitDate).toHaveValue('13/07/2026 10:30');
});
