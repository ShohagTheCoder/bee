export class RenderEngine {
    // Converts attributes & custom/global props into HTML string
    renderAttributes(node) {
        const attrs = [];

        for (const key in node) {
            if (['tag', 'attributes', 'children', 'innerHTML'].includes(key)) continue;
            const value = node[key];
            if (value === undefined || value === false) continue;

            if (key === 'data' && typeof value === 'object') {
                for (const d in value) {
                    attrs.push(`data-${d}="${value[d]}"`);
                }
            } else if (key === 'events' && typeof value === 'object') {
                for (const ev in value) {
                    attrs.push(`${ev.toLowerCase()}="${value[ev]}"`);
                }
            } else if (typeof value === 'boolean') {
                attrs.push(`${key}`);
            } else {
                attrs.push(`${key}="${value}"`);
            }
        }

        if (node.attributes) {
            for (const [k, v] of Object.entries(node.attributes)) {
                attrs.push(`${k}="${v}"`);
            }
        }

        return attrs.join(' ');
    }

    // Renders a single HTML node recursively
    renderNode(key, node, parent) {
        const tag = node.tag;
        const id = node.id ?? key;
        const classAttr = `clickable ${key}`;
        const tree = parent?.data?.tree === undefined ? id : parent.data.tree + '->' + id;
        node.data = { id: id, tree: tree };
        node.class = node.class ? `${node.class} ${classAttr}` : classAttr;

        const attrString = this.renderAttributes(node);
        const openTag = `<${tag} ${attrString}>`;

        const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
        if (selfClosingTags.includes(tag)) {
            return `<${tag} ${attrString} />`;
        }

        const content =
            node.innerHTML !== undefined
                ? node.innerHTML
                : this.renderChildren(node.children ?? {}, node);

        return `${openTag}${content}</${tag}>`;
    }

    // Renders all children recursively
    renderChildren(children, node) {
        return Object.entries(children)
            .map(([key, childNode]) => this.renderNode(key, childNode, node))
            .join('');
    }

    // Public render method — takes the full tree
    render(key, tree, parent = { data: { tree: '' } }) {
        // const rootKey = Object.keys(tree)[0]; // Assume single root
        // const rootNode = tree[rootKey];
        return this.renderNode(key, tree, parent);
    }
}
