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

        return new Response(page, {
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
