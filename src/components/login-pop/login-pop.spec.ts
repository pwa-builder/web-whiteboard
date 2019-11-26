import { TestWindow } from '@stencil/core/testing';
import { LoginPop } from './login-pop';

describe('login-pop', () => {
  it('should build', () => {
    expect(new LoginPop()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLLoginPopElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [LoginPop],
        html: '<login-pop></login-pop>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
