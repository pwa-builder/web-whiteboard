import { newE2EPage } from '@stencil/core/testing';

describe('more-tools', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<more-tools></more-tools>');
    const element = await page.find('more-tools');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
