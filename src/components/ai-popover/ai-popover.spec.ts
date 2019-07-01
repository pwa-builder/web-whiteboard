import { TestWindow } from '@stencil/core/testing';
import { AiPopover } from './ai-popover';

describe('ai-popover', () => {
  it('should build', () => {
    expect(new AiPopover()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAiPopoverElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AiPopover],
        html: '<ai-popover></ai-popover>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
