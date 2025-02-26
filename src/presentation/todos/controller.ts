import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';


export class TodosController {

  //* DI
  constructor() { }


  // GET
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  //GET BY ID
  public getTodoById = async (req: Request, res: Response) => {

    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: `Id argument is not a number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      }
    })

    res.json( todo )

  }

  // POST
  public createTodo = async (req: Request, res: Response) => {
    const [ error, createTodoDto ] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error })



    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.json( todo );


  };

  // PUT
  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;
    const [ error, updateTodoDto ] =  UpdateTodoDto.create({...req.body, id });

    if ( error ) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if ( !todo ) res.status(404).json({ error: `TODO with id ${ id } not found` })


    const updateTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
    })
    res.json( updateTodo )

  };

  //DELETE
  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;

    const todo = await prisma.todo.findUnique({
      where: { id }
    }); 

    if ( !todo ) res.status(404).json({ error: `TODO with id ${ id } not found` })


    const deletedTodo = await prisma.todo.delete({
      where: {
        id
      }
    });
   ( deletedTodo )
    ? res.json( deletedTodo )
    : res.status(400).json({ error: `TODO with id ${id} not found` })

    res.json({ todo, deletedTodo } );

  };

};

// Nuestros controladores estan altamente acoplados a Prisma

