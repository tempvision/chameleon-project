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
  lobbyId!: string;

  constructor(
    private db: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.lobbyId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.db.list(`/lobbies/${this.activatedRoute.snapshot.paramMap.get('id')}`).valueChanges().subscribe((res: any) => {
      this.currentUsers = res[3];
    })
  }

  startGame() {
    this.router.navigate([`game/${this.lobbyId}`])
  }

}
