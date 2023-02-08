import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit {
  currentUsers!: Array<any>;

  constructor(
    private db: AngularFireDatabase,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.paramMap.get('id'))
    this.db.list(`/lobbies/${this.router.snapshot.paramMap.get('id')}`).valueChanges().subscribe((res: any) =>{
      console.log(res)
      this.currentUsers = res[3];
      console.log(this.currentUsers)
    })
  }

}
