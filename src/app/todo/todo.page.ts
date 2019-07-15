import { Component, OnInit } from '@angular/core';
import { TodoServiceService, Todo } from '../services/todo-service.service';
import { ModalController, ActionSheetController, AlertController, MenuController } from '@ionic/angular';
import { TodoModalPage } from '../todo-modal/todo-modal.page';
import { Button } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  todos: Todo[];
  todo: Todo = {
    task: '',
    priority: 1,
    user: ''
  }
  constructor(
    private todoService: TodoServiceService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public activatedRoute: ActivatedRoute,
    public alert: AlertController,
    private menu: MenuController
    ) { 
     
    }

  ngOnInit() {
    let result  = [];
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.getTodos().subscribe(items => {
      result = [];
      items.filter((item) => {
        if (item.user === userId) {
          result.push(item);
        }
      });
      this.todos = result;    
    })  
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: "Actions",
      buttons:[{
        text: "Edit",
        handler: () => {

        }
      },
      {
        text: "Delete",
        handler: () => {
          this.todoService.deleteTodo(item);
        }
      }
    ]
    });
    await actionSheet.present();
  }

  async presentModal() {
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    const modal = await this.modalController.create({
       component: TodoModalPage,
       componentProps: {
         'task' : '',
         'priority': 3,
         'user': userId
       }
    });
    return await modal.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })

    await alert.present()
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
