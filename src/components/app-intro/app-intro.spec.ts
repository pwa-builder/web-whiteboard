import { TestWindow } from '@stencil/core/testing';
import { AppIntro } from './app-intro';

describe('app-intro', () => {
  it('should build', () => {
    expect(new AppIntro()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLAppIntroElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [AppIntro],
        html: '<app-intro></app-intro>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
