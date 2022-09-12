import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component'
import { RouterModule } from '@angular/router';
import { HeroService } from './hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
import { TemplateComponent } from './template/template.component';
//Every component must be declared in exactly one NgModule.
@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, RouterModule, HttpClientModule,HttpClientInMemoryWebApiModule,HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })], 
  //сюда надо добавить RouterModule и AppRoutingModule чтобы app-routing.modile заработал
  declarations: [ AppComponent, HelloComponent, HeroesComponent, HeroDetailsComponent, MessagesComponent, DashboardComponent, TemplateComponent],
  bootstrap:    [ AppComponent ],
  providers: [HeroService, MessageService, InMemoryDataService]
})
export class AppModule { }
