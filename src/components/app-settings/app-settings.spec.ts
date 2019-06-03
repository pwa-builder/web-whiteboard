import { TestWindow } from '@stencil/core/testing';
import { AppSettings } from './app-settings';

describe('app-settings', () => {
  it('should build', () => {
    expect(new AppSettings()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppSettingsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppSettings],
        html: '<app-settings></app-settings>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
