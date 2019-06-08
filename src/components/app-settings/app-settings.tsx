import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-settings',
  styleUrl: 'app-settings.css'
})
export class AppSettings {



  render() {
    return (
      <div id="settingsDiv">
        <mgt-tasks data-source="todo"></mgt-tasks>
      </div>
    );
  }
}
