import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.css']
})
export class CreateLobbyComponent implements OnInit {
  lobbyForm!: FormGroup;
  allLobbies?: Lobby[];

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<CreateLobbyComponent>
  ) { }

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      userName: ['', Validators.required],
      lobbyName: ['', Validators.required],
      lobbyPassword: ['', Validators.required]
    });

    const objectRef = this.db.list<any>('/lobbies');
    objectRef.valueChanges().subscribe((res: Lobby[]) => {
      this.allLobbies = res;
    });
  }

  createLobby(): void {
    if (!this.lobbyForm.valid) {
      return;
    }

    this.deleteOldLobbies();

    const users = this.db.list('/users');
    const newUserRef = users.push(this.getUserName()?.value); // create user
    const newUserId = newUserRef.key as string;

    const itemsRef = this.db.list<any>('/lobbies');

    this.checkIfNameIsTaken();

    if (this.lobbyForm.controls['lobbyName'].errors) {
      return;
    }

    const lobbyInfo: Lobby = {
      lobbyName: this.getLobbyName()?.value,
      lobbyPassword: this.getLobbyPassword()?.value,
      users: [{
        name: this.getUserName()?.value,
        userId: newUserId,
        admin: true
      }],
      timestamp: new Date().getTime()
    };

    const newPostRef = itemsRef.push(lobbyInfo); // get the ref of the newly created item

    newPostRef.update({
      ...lobbyInfo,
      uniqueId: newPostRef.key // add the unique id to the new item
    });

    sessionStorage.setItem(
      'user',
      JSON.stringify({
        name: this.getUserName()?.value,
        userId: newUserId,
        admin: true
      })
    );

    this.router.navigate(['lobby', newPostRef.key]);
    this.dialogRef.close();
  }

  getUserName(): any {
    return this.lobbyForm.get('userName');
  }

  getLobbyPassword(): any {
    return this.lobbyForm.get('lobbyPassword');
  }

  getLobbyName(): any {
    return this.lobbyForm.get('lobbyName');
  }

  checkIfNameIsTaken(): void {
    const hasAMatch = this.allLobbies?.some(
      (el: any) => el.lobbyName.toString() === this.getLobbyName()?.value
    );
    if (hasAMatch) {
      this.lobbyForm.controls['lobbyName'].setErrors({ nameTaken: true });
    } else {
      this.lobbyForm.controls['lobbyName'].setErrors(null);
    }
  }

  deleteOldLobbies() {
    const millisecondsInOneDay: number = 86400000;
    const currentDate: number = new Date().getTime();
    const olderThenOneDay = this.allLobbies?.filter((el: any) => currentDate - el.timestamp > millisecondsInOneDay).forEach((el: any) => {
      this.db.list('/lobbies').remove(el.uniqueId);
      // delete users as well
    });
  }

}

interface Lobby {
  gameState?: object;
  lobbyName: string;
  lobbyPassword: string;
  users: {
    name: string;
    userId: string;
    admin: boolean;
  }[];
  timestamp: number;
}
