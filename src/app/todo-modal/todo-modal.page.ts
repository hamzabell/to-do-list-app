import { Component, Input } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.page.html',
  styleUrls: ['./todo-modal.page.scss'],
})
export class TodoModalPage {

  @Input() task: string;
  @Input() priority: number;
  @Input() user: string;
  constructor(
    private todoService: TodoServiceService,
    public modalController: ModalController
  ) { }

  async addTodo() {
    const  todo = {
      task: this.task,
      priority: this.priority,
      user: this.user
    }
    this.todoService.addTodo(todo);
    await this.modalController.dismiss();
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  
}
