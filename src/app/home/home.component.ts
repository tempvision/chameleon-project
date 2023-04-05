import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { relative } from 'path';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private dialog: MatDialog, private db: AngularFireDatabase) { }

  openCreateLobbyDialog() {
    this.dialog.open(CreateLobbyComponent);
  }

  openJoinLobbyDialog() {
    this.dialog.open(JoinLobbyComponent);
  }
}


