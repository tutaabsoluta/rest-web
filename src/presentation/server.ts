import express, { Router } from 'express';
import compression from 'compression'
import path from 'path';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}


export class Server {

  // Declaracion de variables
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  // Inicializacion de variables
  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  };

  
  
  async start() {
    

    //* Middlewares: cualquier peticion que pase por el server pasa por el middleware
    // Si viene el body lo serializa a un JSON
    this.app.use( express.json() ) // raw
    this.app.use( express.urlencoded({ extended: true }) ) // x-www-form-urlencoded
    this.app.use( compression() )

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );


    //* Routes
    this.app.use( this.routes );


    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });
    

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

}