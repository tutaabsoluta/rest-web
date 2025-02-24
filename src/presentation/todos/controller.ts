import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy bread', completedAt: null },
  { id: 3, text: 'Buy butter', completedAt: new Date() },
];


export class TodosController {

  //* DI
  constructor() { }


  // GET
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  //GET BY ID
  public getTodoById = (req: Request, res: Response) => {

    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: `Id argument is not a number` })

    const todo = todos.find(todo => todo.id === id);

    (todo)
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  // POST
  public createTodo = (req: Request, res: Response) => {

    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'Text property is required' })

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: null
    }

    todos.push(newTodo);

    res.json(newTodo);

  };

  // PUT
  public updateTodo = (req: Request, res: Response) => {

    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: `Id argument is not a number` });

    const todo = todos.find(todo => todo.id === id);
    if (!todo) return res.status(404).json({ error: `TODO with id ${id} not found` });

    const { text, completedAt } = req.body;

    // El text del todo pasa a ser el enviado en el body
    todo.text = text || todo.text;

  ( completedAt === 'null') 
    ? todo.completedAt = null
    : todo.completedAt = new Date( completedAt || todo.completedAt )


    res.json( todo )

  };

  //DELETE
  public deleteTodo = (req: Request, res: Response) => {

    const id = +req.params.id;

    const todo = todos.find(todo => todo.id === id);

    if ( !todo ) return res.status(404).json({error: `TODO with id ${id} not found`});

    todos.splice( todos.indexOf(todo), 1 );

    res.json( todo )
    
  }

};

// POST: tengo que decirle a express como quiero manejar las serializaciones de post