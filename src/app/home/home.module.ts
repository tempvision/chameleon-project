import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';

import { FlexLayoutModule } from '@angular/flex-layout'


import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateLobbyComponent,
    JoinLobbyComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCommonModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
})
export class HomeModule { }
