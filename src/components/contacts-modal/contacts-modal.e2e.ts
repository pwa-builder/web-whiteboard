import { newE2EPage } from '@stencil/core/testing';

describe('contacts-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<contacts-modal></contacts-modal>');
    const element = await page.find('contacts-modal');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
