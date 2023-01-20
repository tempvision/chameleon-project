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
  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogRef: MatDialogRef<CreateLobbyComponent>) { }

  ngOnInit(): void {
    this.lobbyForm = this.fb.group({
      userName: ['', Validators.required],
      lobbyName: ['', Validators.required],
      lobbyPassword: ['', Validators.required],
    });

  }

  createLobby() {
    if (!this.lobbyForm.valid) {
      return;
    }

    const itemsRef = this.db.list('/lobbies');

    const lobbyInfo = {
      "lobbyName": this.getLobbyName()?.value,
      "lobbyPassword": this.getLobbyPassword()?.value,
      "users": [{
        name: this.getUserName()?.value
      }]
    }

    const newPostRef = itemsRef.push(lobbyInfo); // get the ref of the newly created item
    const newPostId = newPostRef.key;

    newPostRef.update({
      ...lobbyInfo,
      uniqueId: newPostId // add the unique id to the new item
    })

    this.router.navigate(['game', newPostId]);
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

}
