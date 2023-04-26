import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { HomeModule } from '../home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameplayModule } from '../gameplay/gameplay.module';
import { LobbyModule } from '../lobby/lobby.module';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RandomPositionDirective } from '../shared/directives/random-position.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RandomPositionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HomeModule,
    GameplayModule,
    LobbyModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
