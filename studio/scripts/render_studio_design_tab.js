export function render_studio_design_tab() {
    const designTab = document.createElement('div');
    designTab.id = 'design-tab';
    designTab.className = 'tab-content';

    const title = document.createElement('h2');
    title.textContent = 'Design Studio';
    designTab.appendChild(title);

    const description = document.createElement('p');
    description.textContent =
        'Welcome to the Design Studio! Here you can create and customize your designs.';
    designTab.appendChild(description);

    const designArea = document.createElement('div');
    designArea.id = 'design-area';
    designArea.className = 'design-area';
    designArea.textContent = 'Your design will appear here.';
    designTab.appendChild(designArea);

    return designTab;
}
