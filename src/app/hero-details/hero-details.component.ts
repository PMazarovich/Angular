import { Component, OnInit,Input } from '@angular/core';
import {Hero} from '../hero' ;
import { ActivatedRoute } from '@angular/router'; //Этот импорт нужен для того, чтобы извлекать информацию из строки URL
import { Location } from '@angular/common';       //Angular service for interacting with the browser.
import { HeroService }  from '../hero.service';   //Это - сервис, вытаскивающий-хранящий какие-то данные
@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
//это поле заполняется извне модуля. Конкретно - из heroes.component.html, поэтому тут и нужно ключевое слово @Input
//This component simply receives a hero object through its @Input() property 
 constructor(  private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }
  @Input() externalHero:Hero;                  //больше не используется
  hero: Hero;

  save():void {                                //метод, сохраняющий измененное имя через сервис и возвращающий пользователя на предыдущую страницу
    this.heroService.updateHero(this.hero)
     .subscribe(() => this.goBack());
  }
  goBack():void {
     this.location.back();                     //используя location возвращаемся на предыдущую страницу
  }
  getHero():void {
     const id = +this.route.snapshot.paramMap.get('id');//вытаскиваем из пути значение параметра id
     this.heroService.getHero(id)                       //применяем метод из сервиса, при этом передаем ему в качестве аргумента только что вытащеный id
     .subscribe(extracted => this.hero = extracted);
  }


  ngOnInit() {
    this.getHero();
  }

}