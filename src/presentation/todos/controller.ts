import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


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

    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'Text property is required' })


    const todo = await prisma.todo.create({
      data: { text: text }
    });

    res.json( todo );


  };

  // PUT
  public updateTodo = async (req: Request, res: Response) => {

    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: `Id argument is not a number` });

    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if ( !todo ) res.status(404).json({ error: `TODO with id ${ id } not found` })

    const { text, completedAt } = req.body;

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { text, completedAt: ( completedAt ) ? new Date(completedAt) : null }
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

