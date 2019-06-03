import { TestWindow } from '@stencil/core/testing';
import { AppCanvas } from './app-canvas';

describe('app-canvas', () => {
  it('should build', () => {
    expect(new AppCanvas()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppCanvasElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppCanvas],
        html: '<app-canvas></app-canvas>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
