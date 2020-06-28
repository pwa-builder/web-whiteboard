import { newE2EPage } from '@stencil/core/testing';

describe('app-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<app-login></app-login>');
    const element = await page.find('app-login');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
