import { Router } from 'express';
import { TodoRoutes } from './todos/routes';

// ROUTER: define los endpoints y delaga la logica a los controllers



export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/todos', TodoRoutes.routes );



    return router;
  }


}
// definimos las rutas y cual es su controlador. No tiene logica implementada