export function render_studio_data_tab() {
    const dataTab = document.createElement('div');
    dataTab.id = 'data-tab';
    dataTab.className = 'active tab-content';

    const title = document.createElement('h2');
    title.textContent = 'Data Studio';
    dataTab.appendChild(title);

    const description = document.createElement('p');
    description.textContent =
        'Welcome to the Data Studio! Here you can manage and visualize your data.';
    dataTab.appendChild(description);

    const dataArea = document.createElement('div');
    dataArea.id = 'data-area';
    dataArea.className = 'data-area';
    dataArea.textContent = 'Your data will appear here.';
    dataTab.appendChild(dataArea);

    dataTab.insertAdjacentHTML(
        'beforeend',
        `<p id="selected_item">Not selected</p>
        <input id="text_content_input" type="text" placeholder="Text Content" />`
    );

    return dataTab;
}
