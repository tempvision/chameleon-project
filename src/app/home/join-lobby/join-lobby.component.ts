import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateLobbyComponent } from '../create-lobby/create-lobby.component';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent implements OnInit {
  lobbyForm!: FormGroup;
  items!: Array<any>;

  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<JoinLobbyComponent>) {
    this.db.list('/lobbies').valueChanges().subscribe(res => {
      this.items = res;
      console.log(res)
    })
  }

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      userName: ['', Validators.required],
      lobbyName: ['', Validators.required],
      lobbyPassword: ['', Validators.required],
    });

  }

  joinLobby() {
    if (!this.lobbyForm.valid) {
      return;
    }

    const lobby = this.getLobbyName();
    const searchedLobby = this.items.findIndex((el: any) => el.lobbyName === "lena");
    console.log(this.items[searchedLobby])
    const foundLobby = this.items[searchedLobby]


    if (searchedLobby > -1) {
      const ref = this.db.object(`lobbies/${foundLobby.uniqueId}`);
      foundLobby.users.push({ name: this.getUserName()?.value })
      ref.update(foundLobby)
      this.dialogRef.close();
      this.router.navigate(['game', foundLobby.uniqueId]);
    } else {
      return;
    }

  }


  getUserName() {
    return this.lobbyForm.get('userName');
  }

  getLobbyPassword() {
    return this.lobbyForm.get('lobbyPassword');
  }


  getLobbyName() {
    return this.lobbyForm.get('lobbyName');
  }

}
