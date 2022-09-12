import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from '../heroes/heroes.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { HeroDetailsComponent }  from '../hero-details/hero-details.component'; 
import { TemplateComponent } from '../template/template.component';
exports: [ RouterModule ]  //Экспортируем ИЗМЕНЕННЫЙ RouterModule, чтобы его можно было использовать в других компонентах
//Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
//это-просто переменная - массив, в котором собраны все пути и модкли, которые будут имспользованы в приложении
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //Добавили путь по умолчанию- с начальной страницы будет перенаправлен сюда /dashboard. Т.е. перенаправляем с '' пути на '/dashboard' путь
  { path: 'heroes', component: HeroesComponent },//component: the component that the router should create when navigating to this route.
  { path: 'dashboard', component: DashboardComponent },   //ссылка на таблицу
  { path: 'details/:id', component: HeroDetailsComponent }, //ссылка на конкретного героя из списка(таблицы) по:id (наполняется прямо в HTML коде таблицы)
  { path: 'template', component: TemplateComponent},
];

@NgModule({
imports: [
  RouterModule,
  RouterModule.forRoot(routes),          
],
})

export class AppRoutingModule { }