import { TestWindow } from '@stencil/core/testing';
import { AppControls } from './app-controls';

describe('app-controls', () => {
  it('should build', () => {
    expect(new AppControls()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppControlsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppControls],
        html: '<app-controls></app-controls>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
