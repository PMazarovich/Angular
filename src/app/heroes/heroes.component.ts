import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';       //импортировали класс из другого файла
//import {HEROES} from '../mock-heroes'  //импортировали переменную из другого файла
import {HeroService} from '../hero.service'
@Component({
  selector: 'app-heroes',     //Этот селектор можно использовать в родительском модуле при вставке в html. См. app.component.html
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private hService:HeroService) { }    //конструктор заполняетс объектрами классов, которые нужны для использования в данном компоненте. То, что нужно - определяется в импортах

//heroes: Hero[] = HEROES;           //объявили поле класса и присвоили ему значение из другого файла (см импорт)
newHero:Hero;
 heroes: Hero[];   //Объявили массив с героями
 hero: Hero  = {                   //объявили поле класса и инициализировали его
   id: 0,
   name: 'Crystal maiden'
 }
  
delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.hService.deleteHero(hero).subscribe();
}

add(name: string): void {          //Добавление героя
  name = name.trim();
  if (!name) { return; }
  this.hService.addHero({ name } as Hero)
    .subscribe(hero => {           //В результате из сервиса должен прийти ответ в виде hero
      this.heroes.push(hero);
    });
}

//getHeroes():void{                            //Метод для вытаскивания информации из сервиса
//  this.heroes = this.hService.getHeroes();   //вытаскивает из сервиса нужную информацию и присваивает в массив 
//}
 getHeroes(): void {
   this.hService.getHeroes()
      .subscribe(result => {
      this.heroes = result;
      var i = 0;
      for(i = 0;i<this.heroes.length;i=i+1) {
       console.log("this hero was imported: id: "+ this.heroes[i].id + "  name: " + this.heroes[i].name)
      }});   //После выполнения Observable мы ловим результат его работы и записываем полученные данные в this.heroes
 }

selectedHero:Hero;
onSelect(hero:Hero):void{               //Объявили метод
  console.log("this hero was clicked: " + hero.name + "id: "+ hero.id)
  this.selectedHero = hero;
}

ngOnInit() {
   this.getHeroes();           //Вызвали метод, инициализирубщий нужные нам переменные
}

}