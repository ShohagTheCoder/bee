import { render_studio_data_tab } from './render_studio_data_tab.js';
import { render_studio_design_tab } from './render_studio_design_tab.js';
import { render_studio_settings_tab } from './render_studio_settings_tab.js';

document.addEventListener('DOMContentLoaded', () => {
    // const studio_container = document.getElementById('studio-sidebar-content');
    // if (!studio_container) {
    //     console.error('App container not found');
    //     return;
    // }

    // // Create the main container for the tabs
    // const tabs_container = document.createElement('div');
    // tabs_container.id = 'tabs-container';

    // // Create and append the tabs
    // const settingsTab = render_studio_settings_tab();
    // const dataTab = render_studio_data_tab();
    // const designTab = render_studio_design_tab();

    // tabs_container.appendChild(settingsTab);
    // tabs_container.appendChild(dataTab);
    // tabs_container.appendChild(designTab);

    // studio_container.appendChild(tabs_container);

    // Style for the tabs
    const buttons = document.querySelectorAll('.tabs-buttons button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            contents.forEach((c) => c.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            buttons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
