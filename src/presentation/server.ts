import express from 'express'
import path from 'path';

// Express podria ser una dependencia oculta

export class Server {

    constructor()
    {}

    private app = express();

    async start() {

        // Middlewares: funciones que se ejecutan cuando se pasa por una ruta
        // Public folder
        this.app.use( express.static('public') );

        this.app.get('*', ( req, res ) => {
            const indexPath = path.join(__dirname + '../../../public/index.html');
            res.sendFile( indexPath );
            return;
        })


        this.app.listen(3000, () => {
            console.log(`Server running on server ${3000}`)
        });
    };
};