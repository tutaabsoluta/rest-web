import { Router } from 'express';
import { TodosController } from './controller';


export class TodoRoutes {


  static get routes(): Router {

    const router = Router();

    const todoController = new TodosController();

    router.get('/', todoController.getTodos );
    router.get('/:id', todoController.getTodoById );

    router.post( '/', todoController.createTodo );
    router.put( '/:id', todoController.updateTodo );

    router.delete( '/:id', todoController.deleteTodo );
    


    return router;
  }


}

// La ruta que manda el Middleware es el punto de entrada
// Para hacer post necesito el body de la peticion