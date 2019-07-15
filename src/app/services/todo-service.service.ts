import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  task: string;
  priority: number;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private todosCollection: AngularFirestoreCollection<Todo>;

  private todos: Observable<Todo[]>;
  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('todos');

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id,...data };
        });
      })
    )
   }

   addTodo(todo: Todo) {
     return this.todosCollection.add(todo);
   }
   
   getTodos() {
     return this.todos;
   }

   getTodo(id) {
     return this.todosCollection.doc<Todo>(id).valueChanges();
   }

   updateTodo(todo: Todo, id: string) {
     return this.todosCollection.doc<Todo>(id).update(todo);
   }

   deleteTodo(id) {
     return this.todosCollection.doc(id).delete();
   }

}
