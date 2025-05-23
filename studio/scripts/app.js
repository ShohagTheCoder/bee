import { render_studio_data_tab } from './render_studio_data_tab.js';
import { render_studio_design_tab } from './render_studio_design_tab.js';
import { render_studio_settings_tab } from './render_studio_settings_tab.js';
import { RenderEngine } from './render_engine.js';

let layout = window.layout || {};
let selectedLayout = { children: layout };

const renderEngine = new RenderEngine();

let selectedItem = null;
let parentTreeKey = '';
let lastKey = null;

function setActiveItem(e) {
    e.preventDefault(); // Prevent default action if needed
    // console.log('Event:', e); // the click event
    // console.log('Target:', e.target); // the clicked element
    const data_tree = e.target.getAttribute('data-tree').split('->');
    selectedLayout = { children: layout }; // Reset to the root layout
    data_tree.forEach((item, index) => {
        lastKey = item;
        selectedLayout = selectedLayout.children[item];
    });

    parentTreeKey = data_tree.slice(0, -1).join('->'); // 'a->b'

    // console.log('selected layout:', selectedLayout); // the closest data tree element

    selectedItem = e.target;

    document.getElementById('selected_item').innerText = e.target.tagName;
    document.getElementById('text_content_input').value = e.target.innerText;
}

// document.querySelectorAll('.clickable').forEach((el) => {
//     el.addEventListener('click', (e) => {
//         e.stopPropagation(); // Prevent event bubbling
//         console.log('Clicked:', el); // the clicked element
//         // Optional: remove from all first if you want single selection
//         document.querySelectorAll('.clickable').forEach((e) => e.classList.remove('clicked'));
//         el.classList.add('clicked');
//     });
// });

function save_the_edite() {
    console.log('Saving...'); // Save the changes
    // console.log('Selected Item:', selectedItem); // the selected item
    // console.log('layout: ', layout); // the layout object

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(layout),
    })
        .then((data) => {
            console.log('Success:', data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error
        });
    //code
    // const text = document.getElementById('text_content_input').value;
    // console.log('Text:', text); // the text content
    // document.getElementById(selectedItem.id).innerText = text;
}

function refresh() {
    const updatedHTML = renderEngine.render(lastKey, selectedLayout, {
        data: { tree: parentTreeKey },
    });

    const updatedElement = new DOMParser().parseFromString(updatedHTML, 'text/html').body
        .firstElementChild;
    selectedItem.parentNode.replaceChild(updatedElement, selectedItem);
    selectedItem = updatedElement;
    // console.log('Updated element:', selectedLayout); // the updated element
    addCommonEventListeners(selectedItem.parentNode);
}

function updateText(e) {
    // console.log(e);
    // const data_id = e.target.getAttribute('data-id');
    // const tree = e.target.getAttribute('data-tree')?.split('->');
    selectedLayout.innerHTML = e.target.value;
    // document.getElementById(selectedItem.id).innerText = e.target.value;
    // console.log('Updated layout:', selectedLayout); // the updated text

    // console.log(lastKey, selectedLayout);
    // const updatedHTML = renderEngine.render(lastKey, selectedLayout);
    // // console.log('Updated HTML:', updatedHTML); // the updated text
    // selectedItem.parentNode.innerHTML = updatedHTML;
    refresh();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.clickable').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            setActiveItem(e);
            console.log('Clicked:', el); // the clicked element
            // Optional: remove from all first if you want single selection
            document.querySelectorAll('.clickable').forEach((e) => e.classList.remove('clicked'));
            el.classList.add('clicked');
        });
    });

    console.log('Layout:', layout);
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

    const studio_inputs = document.querySelectorAll('.studio-input');
    studio_inputs.forEach((input) => {
        input.addEventListener('input', updateText);
    });

    const studio_save_button = document.getElementById('studio-save-button');
    studio_save_button.addEventListener('click', save_the_edite);

    // Padding section
    const studio_padding_input = document.getElementById('settings-input-padding');

    studio_padding_input.addEventListener('input', (e) => {
        const paddingValue = e.target.value;
        // if (value >= 0) {
        //     selectedItem.style.padding = paddingValue;
        // }

        // selectedItem.style.padding = paddingValue + 'px';
        selectedLayout.style = `padding: ${paddingValue}px`;
        refresh();
    });
});

function addCommonEventListeners(scope) {
    scope.querySelectorAll('.clickable').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            setActiveItem(e);
            console.log('Clicked:', el); // the clicked element
            // Optional: remove from all first if you want single selection
            document.querySelectorAll('.clickable').forEach((e) => e.classList.remove('clicked'));
            el.classList.add('clicked');
        });
    });
}
