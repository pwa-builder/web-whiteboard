import { newE2EPage } from '@stencil/core/testing';

describe('foldable-images', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<foldable-images></foldable-images>');
    const element = await page.find('foldable-images');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
