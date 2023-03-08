import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameplayRoutingModule } from './gameplay-routing.module';
import { GameplayComponent } from './gameplay.component';

import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    GameplayComponent
  ],
  imports: [
    CommonModule,
    GameplayRoutingModule,
    MatTableModule
  ]
})
export class GameplayModule { }
