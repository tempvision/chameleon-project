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
  lobbyId!: any;
  isAdmin!: boolean;

  constructor(
    private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log(sessionStorage.getItem('user'))
    this.isAdmin = JSON.parse(sessionStorage.getItem('user') as any).admin;
  }

  ngOnInit(): void {
    this.lobbyId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.db.list(`/lobbies/${this.lobbyId as string}`).valueChanges().subscribe((res: any) => {
      this.currentUsers = res[4];
    })
  }

  startGame() {
    this.router.navigate([`game/${this.lobbyId}`])
  }

}
