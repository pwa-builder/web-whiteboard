import { TestWindow } from '@stencil/core/testing';
import { InstallModal } from './install-modal';

describe('install-modal', () => {
  it('should build', () => {
    expect(new InstallModal()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLInstallModalElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [InstallModal],
        html: '<install-modal></install-modal>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
