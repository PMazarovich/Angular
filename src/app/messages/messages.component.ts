import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
//The messageService property must be public because you're going to bind to it in the template.
//Angular only binds to public component properties.
  constructor(public mService: MessageService) { } //Поскольку мы используем этот объект где-то вне класса, он должен быть public.
  //в данном случае этот объект mService с его методами используется внутри html кода.
  //public можно и не писать,т.к. объект без модификатора доступа по умолчанию public. Так мы использовали в HTML все поля из heroes.component.ts, например.

  ngOnInit() {
  }

}