import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameplayRoutingModule } from './gameplay-routing.module';
import { GameplayComponent } from './gameplay.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    GameplayComponent
  ],
  imports: [
    CommonModule,
    GameplayRoutingModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class GameplayModule { }
