import { RenderEngine } from './render_engine.ts';
import { HTMLElementNode } from './types/types_element.ts';

const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const path = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

    console.log(`Request for ${path}`);

    const aliasMap: Record<string, string> = {
        '@styles/': './public/styles/',
        '@scripts/': './public/scripts/',
        '@studio_styles/': './studio/styles/',
        '@studio_scripts/': './studio/scripts/',
    };

    // Check for aliased paths
    for (const alias in aliasMap) {
        if (path.startsWith(alias)) {
            const realPath = aliasMap[alias] + path.slice(alias.length);
            const extension = realPath.split('.').pop();
            let contentType = 'text/plain';
            if (extension === 'css') contentType = 'text/css';
            else if (extension === 'js') contentType = 'application/javascript';

            try {
                const content = await Deno.readTextFile(realPath);
                console.log(`Serving ${contentType} from ${realPath}`);
                return new Response(content, {
                    headers: { 'Content-Type': contentType },
                });
            } catch {
                return new Response('File not found', { status: 404 });
            }
        }
    }

    // Handle studio route
    if (path.startsWith('studio')) {
        return new Response('<h2>Hello, Studio!</h2>', {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        });
    }

    // Render layout
    try {
        const homePage = await Deno.readTextFile('./public/pages/home.json');
        const layout: HTMLElementNode = JSON.parse(homePage);

        const engine = new RenderEngine();
        const page = engine.renderPage(layout);
        const home = await Deno.readTextFile('./studio/home.html');
        const designSidebar = await Deno.readTextFile('./studio/design_sidebar.html');

        const renderedPage = home
            .replace('<!-- #sidebar -->', designSidebar)
            .replace('<!-- #content -->', page);

        return new Response(renderedPage, {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        });
    } catch (err) {
        console.error('Error rendering:', err);
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const Server = () => {
    Deno.serve(
        {
            port: 8000,
            hostname: 'localhost',
            onListen: () => {
                console.log('Server is running on http://localhost:8000');
            },
        },
        handler
    );
};

export default Server;
