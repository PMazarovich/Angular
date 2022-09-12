//сервис хранит и достает все нужные для компонентов данные. В данном случае-массив с героями
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';  //этот импорт теперь не используется
import { Observable, of } from 'rxjs'; //этот тип берется из библитеки, занимающейся асинхронной обработкой данных
import { MessageService } from'./message.service'; //импортируем сервис сообщений
import { HttpClient, HttpHeaders } from '@angular/common/http';  //нужен для работы с Http запросами
import { catchError, map, tap } from 'rxjs/operators';   //нужен для обработки ошибок, пришедших от сервера
//The injector, which is the object that is responsible for choosing and injecting the provider where the app requires it.
//Angular creates a single, shared instance of HeroService and injects into any class that asks for it
@Injectable({
  //A provider is something that can create or deliver a service
  providedIn: 'root',
})
export class HeroService {  //export - значит, что где-то мы сможем это импортировать

 constructor(private mService: MessageService,  private hClient: HttpClient) { }   //в конструктор помещаем сервисы, которые будет тут использованы

  //создали метод, возвращающий масств героев откуда-то
 // getHeroes():Hero[]{
 //  return HEROES
 // }
  httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
   private heroesUrl = 'api/heroes';  // URL to web api
   private log(message: string) {
    this.mService.add(`HeroService: ${message}`);
   }
  /** PUT: update the hero on the server */
  //МЕТОД PUT HTTP C ПАРАМЕТРАМИ
  updateHero(hero:Hero):Observable<any>{
    return this.hClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );

  }
  /** МЕТОД DELETE  */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;   //сформировали запрос

  return this.hClient.delete<Hero>(url, this.httpOptions).pipe( //Отправили запрос-получили ответ
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

  /** МЕТОД POST С ПАРАМЕТРАМИ */
addHero (hero: Hero): Observable<Hero> {
  //формирует и отправляет запрос, ожидает принять Observable<Hero> от сервиса (типа добавил)
  return this.hClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe( //сформировали запрос, отправили его
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), //записали событие в лог
    catchError(this.handleError<Hero>('addHero'))                           //Отлавливаем ошибки

  );
}
  //МЕТОД GET БЕЗ ПАРАМЕТРОВ
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`; //Описали путь, по которому пойдет запрос
     //возвращает <Observable<Hero>>, т.к. после того,как пришел ответ, мы в любом случае, даже если ответ с ошибкой, получим Observable<hero>,т.к. если он БЕЗ ошибки то вернет Observable<hero>, если С ошибкой - также вернет Observable<hero>
    return this.hClient.get<Hero>(url).pipe(  
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
     //this.log("getHero was called");
     //return of(HEROES.find(hero => hero.id === id));  //вытаскиваем из массива значение по id
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
  getHeroes(): Observable<Hero[]>{  //class Observable<T> 
   // TODO: send the message _after_ fetching the heroes
    this.mService.add('HeroService: fetched heroes'); //вызвали метод из другого сервиса (добавляем элемент в массив сообщений)
    //return of(HEROES);   //of(HEROES) returns an Observable<Hero[]> that emits a SINGLE value, the array of mock heroes.
  return this.hClient.get<Hero[]>(this.heroesUrl)
    .pipe(
      //tap - метод типа flow, он ничего не делает с данными, а пропускает их через какие-то методы или действия, передает эти данные дальше
      tap(_ => this.log('fetched heroes')), // looks at the observable values, does something with those values, and passes them along
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }


}