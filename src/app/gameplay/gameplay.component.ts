import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  items: Array<any> = [];
  displayedColumns: string[] = ['category', 'a', 'b', 'c', 'd'];
  category = [
    'key'
  ]
  categories = []

  constructor(
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    // this.db.list('/cards').valueChanges().subscribe((res: any) => {
    //   this.items = res[0].reduce((result: any, value: any, index: any) => {
    //     const chunkIndex = Math.floor(index / 4);
    //     if (!result[chunkIndex]) {
    //       result[chunkIndex] = [];
    //     }
    //     result[chunkIndex].push(value);
    //     return result;
    //   }, []);
    // })
    const objectRef = this.db.object('/cards');
    objectRef.valueChanges().subscribe((data: any) => {
      console.log(data)
      this.categories = Object.keys(data).map(el => {
        const name = el
        const obj = {
          key: name
        }
        return obj;
      }) as any;
      console.log(this.categories)
    });

  }

}
