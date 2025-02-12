import express from 'express'
import path from 'path';

// Express podria ser una dependencia oculta

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    
    constructor( options: Options ) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    };

    async start() {

        // Middlewares: funciones que se ejecutan cuando se pasa por una ruta
        // Public folder
        this.app.use( express.static( this.publicPath ) );

        this.app.get('*', ( req, res ) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            res.sendFile( indexPath );
            return;
        })


        this.app.listen(this.port, () => {
            console.log(`Server running on server ${this.port}`)
        });
    };
};