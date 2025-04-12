import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

  interface Lobby {
    uniqueId: string;
    lobbyName: string;
  }

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent implements OnInit {
  lobbies: any[] = [];
  lobbyForm!: FormGroup;
  selectedLobby: Lobby | null = null;
  showForm: boolean = false;



  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<JoinLobbyComponent>
  ) {
    this.db.list('/lobbies').valueChanges().subscribe((res:any[]) => {
      this.lobbies = res;
    })
  }
  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      userName: ['', Validators.required],
      lobbyName: ['', Validators.required],
      lobbyPassword: ['', Validators.required],
    });

  }
  selectLobby(lobby: any) {
    this.selectedLobby = lobby;
    this.getLobbyName()?.setValue(this.selectedLobby?.lobbyName);
    this.showForm = true;
  }

  joinLobby() {
    if (!this.lobbyForm.valid) {
      return;
    }
    const searchedLobbyIndex = this.lobbies.findIndex((el: any) => el.uniqueId === this.selectedLobby?.uniqueId);

    if (searchedLobbyIndex > -1) {
      const foundLobby = this.lobbies[searchedLobbyIndex]
      const password = this.getLobbyPassword()?.value

      if (password === foundLobby.lobbyPassword) {
        const users = this.db.list('/users')
        const newUserRef = users.push(this.getUserName()?.value) // create user
        const newUserId = newUserRef.key;

        const ref = this.db.object(`lobbies/${foundLobby.uniqueId}`);
        foundLobby.users.push({ name: this.getUserName()?.value, userId: newUserId, admin: false })
        ref.update(foundLobby)
        sessionStorage.setItem('user', `{ "name": "${this.getUserName()?.value}", "userId": "${newUserId}", "admin": false }`)
        this.router.navigate(['lobby', foundLobby.uniqueId]);
        this.dialogRef.close();
      } else {
        return;
      }

    }else {
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
