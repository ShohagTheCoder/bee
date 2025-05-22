import { RenderEngine } from './render_engine.ts';
import { HTMLElementNode } from './types/types_element.ts';

const handler = (req: Request): Response => {
    const url = new URL(req.url);

    const engine = new RenderEngine();

    const homePage = Deno.readTextFileSync('./public/pages/home.json');

    const layout: HTMLElementNode = JSON.parse(homePage);

    if (url.pathname.startsWith('/studio')) {
        return new Response('<h2>Hello, Studio!</h2>', {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } else {
        // Handle other routes
        const page = engine.renderPage(layout);
        const home = Deno.readTextFileSync('./studio/home.html');
        const designSidebar = Deno.readTextFileSync('./studio/design_sidebar.html');

        const renderedPage = home
            .replace('<!-- #sidebar -->', designSidebar)
            .replace('<!-- #content -->', page);

        return new Response(renderedPage, {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        });
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
    // This is a simple HTTP server that responds with "Hello, world!".
};

export default Server;
