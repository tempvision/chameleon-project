import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  items!: any;
  tableColumns: Array<string> = ['category', 'a', 'b', 'c', 'd']

  dataSource = new MatTableDataSource([
    {
      column1: '1', column2: 'Second', column3: 'Third', column4: 'Fourth', column5: 'Fifth'
    },
    {
      column1: '2', column2: 'Second', column3: 'Third', column4: 'Fourth', column5: 'Fifth'
    },
    {
      column1: '3', column2: 'Second', column3: 'Third', column4: 'Fourth', column5: 'Fifth'
    },
    { column1: '4', column2: 'Second', column3: 'Third', column4: 'Fourth', column5: 'Fifth' }
  ]);

  constructor(
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.db.list('/cards').valueChanges().subscribe(res => {
      this.items = res[0];
      console.log(res[0])
    })
  }

}
