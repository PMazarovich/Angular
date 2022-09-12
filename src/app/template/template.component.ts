import { Component, OnInit } from '@angular/core';
import {Hero1} from '../hero1'

@Component({
  //Через Template можно сконфиурировать html страницу, при этом удалив html файл
  selector: 'app-template',
  template: `                    
    <h1>{{title}}</h1>
    <p *ngIf = "newHeroes.length >3"> There are >3 heroes in array!</p>
    <h2>My favorite hero is: {{myNewHero.name}}</h2>
    <ul>
      <li *ngFor="let i of newHeroes"> {{ i.name }} </li>
    </ul>
    `,
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
   constructor() { }
  heroes = ['Cortex', 'N-Gin', 'Pudge', 'Viper'];
  newHeroes = [new Hero1("Cortex",5),          //Так можно составить массив объектов(с конструктором класса, из которого можно достать данные.)
                //Hero1(){constructor(public name:string,public id:number)}
               new Hero1("N-Gin",4),
               new Hero1("Pudge",7),
               new Hero1("Viper",99)]
  title = 'Tour of Heroes'; //тут все как обычно
  myHero = 'Shadow Fiend';
  anotherHero = this.heroes[1];
  myNewHero = this.newHeroes[2];
 

  ngOnInit() {
  }

}