interface User {
     type: 'user';
     name: string;
     age: number;
     occupation: string;
 }


 interface Admin {
     type: 'admin';
     name: string;
     age: number;
     role: string;
 }


 export type Person = User | Admin;


 export const persons: Person[] = [
     { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
     { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
     { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
     { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
     { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
     { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
 ];


 export function logPerson(person: Person) {
     console.log(
         ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
     );
 }

// The function should accept partial User or Admin types based on the personType argument
// For example:
// If personType is 'user', the criteria argument should accept a partial User object.
// If personType is 'admin', the criteria argument should accept a partial Admin object.
// The criteria object should exclude the type field (i.e., you should not allow filtering by the type property).

 export function filterPersons(persons: Person[], personType: User['type'], criteria: Partial<Exclude<User, 'type'>>): User[];
 export function filterPersons(persons: Person[], personType: Admin['type'], criteria: Partial<Exclude<Admin, 'type'>>): Admin[];
 export function filterPersons(persons: Person[], personType: Person['type'], criteria: Partial<Person>): Person[] {
     return persons
         .filter((person) => person.type === personType)
         .filter((person) => {
             let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
             return criteriaKeys.every((fieldName) => {
                 return person[fieldName] === criteria[fieldName];
             });
         });
 }


 export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
 export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });


 console.log('Users of age 23:');
 usersOfAge23.forEach(logPerson);


 console.log();


 console.log('Admins of age 23:');
 adminsOfAge23.forEach(logPerson);
