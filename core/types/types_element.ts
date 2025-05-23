// All HTML tag names (extend this list as needed)
type HTMLElementTag =
    | 'html'
    | 'head'
    | 'body'
    | 'title'
    | 'meta'
    | 'link'
    | 'script'
    | 'div'
    | 'span'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'ul'
    | 'ol'
    | 'li'
    | 'a'
    | 'img'
    | 'video'
    | 'audio'
    | 'iframe'
    | 'canvas'
    | 'button'
    | 'input'
    | 'textarea'
    | 'select'
    | 'option'
    | 'label'
    | 'form'
    | 'table'
    | 'thead'
    | 'tbody'
    | 'tr'
    | 'td'
    | 'th'
    | 'br'
    | 'hr'
    | 'nav'
    | 'footer'
    | 'header'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'strong'
    | 'em'
    | 'small'
    | 'code'
    | 'pre'
    | 'blockquote'
    | 'style'
    | 'noscript'
    | 'custom'; // for custom widgets/components

// All global HTML attributes (simplified and extensible)
interface GlobalAttributes {
    id?: string;
    class?: string;
    style?: string;
    title?: string;
    hidden?: boolean;
    draggable?: boolean;
    contenteditable?: boolean;
    tabindex?: number;
    role?: string;
    lang?: string;
    dir?: 'ltr' | 'rtl' | 'auto';
    accesskey?: string;
    spellcheck?: boolean;
    data?: Record<string, string>; // data-* attributes
    events?: Partial<Record<DOMEventName, string>>; // JS function name or expression
}

// Common DOM event names (simplified)
type DOMEventName =
    | 'onClick'
    | 'onChange'
    | 'onInput'
    | 'onFocus'
    | 'onBlur'
    | 'onSubmit'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'onMouseOver'
    | 'onMouseOut'
    | 'onLoad'
    | 'onError'
    | 'onScroll'
    | 'onResize';

// Base HTML Element Interface
export interface HTMLElementNode extends GlobalAttributes {
    tag: HTMLElementTag;
    attributes?: Record<string, string | number | boolean>; // tag-specific attributes like src, href, etc.
    children?: HTMLElementNode[]; // nested elements
    innerHTML?: string; // raw HTML string (use with care)
}

export interface HTMLElementNodeKV extends GlobalAttributes {
    tag: string;
    id?: string;
    class?: string;
    attributes?: Record<string, string>;
    innerHTML?: string;
    children?: Record<string, HTMLElementNodeKV>; // not array!
    [key: string]: any;
}
