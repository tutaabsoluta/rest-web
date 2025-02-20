import express, { Router } from 'express'
import path from 'path';

// Express podria ser una dependencia oculta

interface Options {
    port: number;
    routes: Router
    public_path?: string;
}

export class Server {

    // declaracion de variables
    private app = express();
    private readonly port: number;
    private readonly routes:Router
    private readonly publicPath: string;
    
    // inicializacion de variables
    constructor( options: Options ) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    };

    async start() {

        this.app.use( express.static( this.publicPath ) );

        // Routes
        this.app.use( this.routes );

        // * SPA
        this.app.get('*', ( req, res ) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            res.sendFile( indexPath );
            return;
        })


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        });
    };
};