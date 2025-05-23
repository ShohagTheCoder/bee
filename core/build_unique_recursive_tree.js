function buildUniqueRecursiveTree(node, counter = { value: 1 }, prefix = Date.now()) {
    const key = `el_${prefix}_${counter.value++}`;
    const newNode = { ...node };
    const result = {};

    if (newNode.children && Array.isArray(newNode.children)) {
        const children = {};
        for (const child of newNode.children) {
            const childTree = buildUniqueRecursiveTree(child, counter, prefix);
            Object.assign(children, childTree);
        }
        newNode.children = children;
    }

    result[key] = newNode;
    return result;
}

const layout = {
    tag: 'header',
    children: [
        { tag: 'h1', innerHTML: 'Welcome!' },
        {
            tag: 'nav',
            children: [
                { tag: 'a', attributes: { href: '/' }, innerHTML: 'Home' },
                { tag: 'a', attributes: { href: '/about' }, innerHTML: 'About' },
            ],
        },
    ],
};

const tree = buildUniqueRecursiveTree(layout);
console.log(JSON.stringify(tree, null, 2));
