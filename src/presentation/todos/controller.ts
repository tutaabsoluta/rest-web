import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';


export class TodosController {

  //* DI
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { };


  // GET
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll()
    return res.json(todos);
  };

  //GET BY ID
  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo)
    } catch (error) {
      res.status(400).json({ error })
    }



  }

  // POST
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error })


    const todo = await this.todoRepository.create(createTodoDto!);
    res.json(todo);

  };

  // PUT
  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const updateTodo = this.todoRepository.updateById( updateTodoDto! );
    
    res.json(updateTodo);

  };

  //DELETE
  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;

    
    try {

      const deletedTodo = await this.todoRepository.deleteById(id);
      res.json(deletedTodo);

    } catch (error) {
      res.status(404).json({ error: `TODO with id ${id} not found` })
    }

  };

};

// Nuestros controladores estan altamente acoplados a Prisma

