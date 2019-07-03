import { TestWindow } from '@stencil/core/testing';
import { DrivePreview } from './drive-preview';

describe('drive-preview', () => {
  it('should build', () => {
    expect(new DrivePreview()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLDrivePreviewElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [DrivePreview],
        html: '<drive-preview></drive-preview>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
