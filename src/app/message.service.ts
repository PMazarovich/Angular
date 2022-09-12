//Создали сервис для сообщений, которые будут использоваться повсеместно в любых компонентах
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})

export class MessageService {
  messages: string[] = [];   //массив с сообщениями

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}