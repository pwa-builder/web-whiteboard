import { TestWindow } from '@stencil/core/testing';
import { ImagePopover } from './image-popover';

describe('image-popover', () => {
  it('should build', () => {
    expect(new ImagePopover()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLImagePopoverElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ImagePopover],
        html: '<image-popover></image-popover>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
