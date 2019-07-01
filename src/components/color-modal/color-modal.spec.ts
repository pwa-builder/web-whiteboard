import { TestWindow } from '@stencil/core/testing';
import { ColorModal } from './color-modal';

describe('color-modal', () => {
  it('should build', () => {
    expect(new ColorModal()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLColorModalElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ColorModal],
        html: '<color-modal></color-modal>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
