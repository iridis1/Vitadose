import { expect, Page, test } from '@playwright/test';

const searchLabel = 'Zoek een vitamine of mineraal';

function nutrientRows(page: Page) {
  return page.locator('tbody > tr');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Zoekt B12, klapt het resultaat uit en controleert de waarden', async ({ page }) => {
  await page.getByRole('searchbox', { name: searchLabel }).fill('B12');

  await expect(page.getByRole('status')).toHaveText('1 van 27 voedingsstoffen');

  const row = nutrientRows(page).filter({ hasText: 'Vitamine B12' }).first();
  await expect(row).toContainText('Cobalamine');
  await expect(row).toContainText('2.5 \u00b5g');
  await expect(row).toContainText('wateroplosbaar');

  await row.click();
  await expect(row).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Aanmaak rode bloedcellen, zenuwstelsel')).toBeVisible();
  await expect(page.getByText('Vlees, vis, zuivel, eieren (dierlijke producten)')).toBeVisible();
  await expect(page.getByText('Bloedarmoede, vermoeidheid, zenuwschade')).toBeVisible();
});

test('Filtert mineralen en vindt en opent Magnesium', async ({ page }) => {
  await page.getByRole('tab', { name: 'Mineralen' }).click();

  await expect(page.getByRole('tab', { name: 'Mineralen' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('status')).toHaveText('14 van 27 voedingsstoffen');
  await expect(nutrientRows(page)).toHaveCount(14);

  const mineralNames = await nutrientRows(page).allTextContents();
  expect(mineralNames.every((name) => !name.includes('Vitamine'))).toBe(true);

  await page.getByRole('searchbox', { name: searchLabel }).fill('magnesium');
  await expect(page.getByRole('status')).toHaveText('1 van 27 voedingsstoffen');

  const magnesiumRow = nutrientRows(page).filter({ hasText: 'Magnesium' }).first();
  await expect(magnesiumRow).toContainText('375 mg');
  await magnesiumRow.click();
  await expect(magnesiumRow).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Spier- en zenuwfunctie, energiestofwisseling')).toBeVisible();
  await expect(page.getByText('Noten, volkorenproducten, groene groenten, peulvruchten')).toBeVisible();
  await expect(page.getByText('Spierkrampen, vermoeidheid, ritmestoornissen')).toBeVisible();
});

test('Zoekt alles wat met calc begint er verwacht twee resultaten', async ({ page }) => {
  await page.getByRole('searchbox', { name: searchLabel }).fill('calc');

  await expect(page.getByRole('status')).toHaveText('2 van 27 voedingsstoffen');

  const rows = nutrientRows(page);
  await expect(rows.first()).toContainText('Vitamine D'); // Calciferol
  await expect(rows.last()).toContainText('Calcium');
});

test('Filtert vitaminen en herstelt daarna de volledige lijst', async ({ page }) => {
  await page.getByRole('tab', { name: 'Vitaminen' }).click();

  await expect(page.getByRole('tab', { name: 'Vitaminen' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('status')).toHaveText('13 van 27 voedingsstoffen');
  await expect(nutrientRows(page)).toHaveCount(13);

  const vitaminNames = await nutrientRows(page).allTextContents();
  expect(vitaminNames.every((name) => name.includes('Vitamine'))).toBe(true);

  await page.getByRole('tab', { name: 'Alles' }).click();

  await expect(page.getByRole('tab', { name: 'Alles' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('status')).toHaveText('27 van 27 voedingsstoffen');
  await expect(nutrientRows(page)).toHaveCount(27);

  const allNames = await nutrientRows(page).allTextContents();
  expect(allNames.some((name) => name.includes('Vitamine C'))).toBe(true);
  expect(allNames.some((name) => name.includes('Magnesium'))).toBe(true);
});
