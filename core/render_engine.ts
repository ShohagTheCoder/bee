import { HTMLElementNode } from './types/types_element.ts';

export class RenderEngine {
    // Converts attributes & global props into HTML string
    private renderAttributes(node: HTMLElementNode): string {
        const attrs: string[] = [];

        // Global attributes
        for (const key in node) {
            if (['tag', 'attributes', 'children', 'innerHTML'].includes(key)) continue;

            const value = (node as any)[key];
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

        // Custom attributes
        if (node.attributes) {
            for (const [k, v] of Object.entries(node.attributes)) {
                attrs.push(`${k}="${v}"`);
            }
        }

        return attrs.join(' ');
    }

    // Renders a single HTML node recursively
    private renderNode(node: HTMLElementNode): string {
        const tag = node.tag;
        const attrs = this.renderAttributes(node);
        const attrString = attrs ? ` ${attrs}` : '';

        // If raw HTML is given
        if (node.innerHTML !== undefined) {
            return `<${tag}${attrString}>${node.innerHTML}</${tag}>`;
        }

        // If self-closing
        const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
        if (selfClosingTags.includes(tag)) {
            return `<${tag}${attrString} />`;
        }

        // Render children recursively
        const children = (node.children || []).map((child) => this.renderNode(child)).join('');
        return `<${tag}${attrString}>${children}</${tag}>`;
    }

    // Public render method for a full HTML page
    public renderPage(root: HTMLElementNode): string {
        return '<!DOCTYPE html>\n' + this.renderNode(root);
    }
}
