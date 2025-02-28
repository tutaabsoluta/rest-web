import { Router } from 'express';
import { TodosController } from './controller';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';
import { TodoDataSourceImpl } from '../../infrastructure/datasources/todo.datasource.impl';


export class TodoRoutes {


  static get routes(): Router {

    const router = Router();


    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource)

    const todoController = new TodosController(todoRepository);

    router.get('/', todoController.getTodos );
    router.get('/:id', todoController.getTodoById );

    router.post( '/', todoController.createTodo );
    router.put( '/:id', todoController.updateTodo );

    router.delete( '/:id', todoController.deleteTodo );
    

    return router;
  }

}

