import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.css']
})
export class CreateLobbyComponent implements OnInit {
  lobbyForm!: FormGroup;
  allLobbies: any;
  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<CreateLobbyComponent>) { }

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      userName: ['', Validators.required],
      lobbyName: ['', [Validators.required, Validators.pattern("^[0-9]*$"),]],
      lobbyPassword: ['', Validators.required],
    });

    const objectRef = this.db.list('/lobbies');
    objectRef.valueChanges().subscribe(res => {
      this.allLobbies = res;
    })

  }

  createLobby() {
    if (!this.lobbyForm.valid) {
      return;
    }

    this.deleteOldLobbies();

    const users = this.db.list('/users')
    const newUserRef = users.push(this.getUserName()?.value) // create user
    const newUserId = newUserRef.key;

    const itemsRef = this.db.list('/lobbies');

    this.checkIfNameIsTaken()

    if (this.lobbyForm.controls['lobbyName'].errors) {
      return;
    }

    const lobbyInfo = {
      "lobbyName": this.getLobbyName()?.value,
      "lobbyPassword": this.getLobbyPassword()?.value,
      "users": [{
        name: this.getUserName()?.value,
        userId: newUserId,
        admin: true
      }],
      "timestamp": new Date().getTime(),
    }

    const newPostRef = itemsRef.push(lobbyInfo); // get the ref of the newly created item

    newPostRef.update({
      ...lobbyInfo,
      uniqueId: newPostRef.key // add the unique id to the new item
    })

    sessionStorage.setItem('user', `{ "name": "${this.getUserName()?.value}", "userId": "${newUserId}", "admin": true }`)

    this.router.navigate(['lobby', newPostRef.key]);
    this.dialogRef.close();

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

  checkIfNameIsTaken() {
    const hasAMatch = this.allLobbies.some((el: any) => el.lobbyName.toString() === this.getLobbyName()?.value);
    if (hasAMatch) {
      this.lobbyForm.controls['lobbyName'].setErrors({ nameTaken: true });
    } else {
      this.lobbyForm.controls['lobbyName'].setErrors(null);
    }
  }

  deleteOldLobbies() {
    const millisecondsInOneDay: number = 86400000;
    const currentDate: number = new Date().getTime();
    const olderThenOneDay = this.allLobbies.filter((el: any) => currentDate - el.timestamp > millisecondsInOneDay).forEach((el: any) => {
      this.db.list('/lobbies').remove(el);
      // delete users as well
    });
  }

}
