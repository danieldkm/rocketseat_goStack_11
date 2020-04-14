/***
 * Para criar: name, email, password
 */

 interface TechObject {
   title: string,
   experience: number
 }

 interface CreateUserData {
  name?: string; //? atributo opcional
  email: string ;
  password: string | number; // | pipe => indica que o atribute pode ser string ou number
  techs: Array<string | TechObject> // ou string[] (para tipo unico);
 }

export default function createUser({ name = '', email , password  } : CreateUserData) {
  const user = {
    name, 
    email, 
    password 
  }

  return user;
}