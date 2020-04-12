import {Request, Response} from 'express';
import createUser from './services/CreateUser';
export function helloworld(request: Request, response: Response) {
  const user = createUser({ 
    name: 'Daniel', 
    email : 'danielmorita@hotmail.com', 
    password : '123',
    techs: ['teste1','teste2', {title: 'teste', experience: 100}]
  });
  return response.json({message : 'Hello World!'})
} 