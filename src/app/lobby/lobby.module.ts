import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LobbyComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    MatButtonModule
  ]
})
export class LobbyModule { }
