import { TestWindow } from '@stencil/core/testing';
import { AppImages } from './app-images';

describe('app-images', () => {
  it('should build', () => {
    expect(new AppImages()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppImagesElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppImages],
        html: '<app-images></app-images>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
