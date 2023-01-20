import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameplayRoutingModule } from './gameplay-routing.module';
import { GameplayComponent } from './gameplay.component';


@NgModule({
  declarations: [
    GameplayComponent
  ],
  imports: [
    CommonModule,
    GameplayRoutingModule
  ]
})
export class GameplayModule { }
