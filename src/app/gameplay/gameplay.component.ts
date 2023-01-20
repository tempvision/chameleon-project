import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
items!: any;
  constructor(
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.db.list('/lobbies').valueChanges().subscribe(res => {
      this.items = res;
      console.log(this.items[0])
    })
  }

}
