import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LobbyModel } from 'src/app/shared/models/lobby-model';

@Component({
  selector: 'app-join-lobby',
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.css']
})
export class JoinLobbyComponent implements OnInit, OnDestroy {
  lobbyForm!: FormGroup;
  lobbies!: LobbyModel[];
  lobbySub: Subscription;

  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<JoinLobbyComponent>) {
    this.lobbySub = this.db.list<LobbyModel>('/lobbies').valueChanges().subscribe((res: LobbyModel[]) => {
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

  joinLobby() {
    if (!this.lobbyForm.valid) {
      return;
    }

    const lobby = this.getLobbyName()?.value;
    const searchedLobby = this.lobbies.findIndex((el: LobbyModel) => el.lobbyName === lobby);

    if (searchedLobby > -1) {
      const foundLobby = this.lobbies[searchedLobby]
      const users = this.db.list('/users')
      const newUserRef = users.push(this.getUserName().value) // create user
      const newUserId = newUserRef.key as string;

      const ref = this.db.object(`lobbies/${foundLobby.uniqueId}`);
      foundLobby.users.push({ name: this.getUserName().value, userId: newUserId, admin: false })
      ref.update(foundLobby)
      sessionStorage.setItem('user', `{ "name": "${this.getUserName().value}", "userId": "${newUserId}", "admin": false }`)
      this.router.navigate(['lobby', foundLobby.uniqueId]);
      this.dialogRef.close();
    } else {
      return;
    }

  }

  getUserName(): FormGroup {
    return this.lobbyForm.get('userName') as FormGroup;
  }

  getLobbyPassword(): FormGroup {
    return this.lobbyForm.get('lobbyPassword') as FormGroup;
  }

  getLobbyName(): FormGroup {
    return this.lobbyForm.get('lobbyName') as FormGroup;
  }

  ngOnDestroy(): void {
    this.lobbySub.unsubscribe();
  }

}
