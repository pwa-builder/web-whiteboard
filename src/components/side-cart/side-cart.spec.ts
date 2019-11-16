import { TestWindow } from '@stencil/core/testing';
import { SideCart } from './side-cart';

describe('side-cart', () => {
  it('should build', () => {
    expect(new SideCart()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLSideCartElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [SideCart],
        html: '<side-cart></side-cart>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
