import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroess: Hero[] = []; //массив героев

  constructor(private heroService: HeroService) { }  //Передаем в конструктор сервис, который будем использовать

  getHeroes(): void {                                //Пишем метод, который будем использовать где-то в данном компоненте
    this.heroService.getHeroes()                     //Метод вытаскивает из сервиса героев, подписавшись на выполнение Future
      .subscribe(heroes => this.heroess = heroes.slice(1, 5));
  }

   ngOnInit() {
     this.getHeroes();                               //при инициализации компонента применяем метод getHeroes()
  }

}