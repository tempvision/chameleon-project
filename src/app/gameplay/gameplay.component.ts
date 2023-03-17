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
  categorySelected!: boolean;
  selectedRow: any
  allCategories: any
  currentCategory: any;

  dataSource = new MatTableDataSource<string[]>();
  chartColumns: string[] = ['col0','col1', 'col2', 'col3', 'col4', 'col5', 'col6'];
  tableData = [
    ['1', "a1", "b2", "c3", "d4", "a2", "b1"],
    ['2', "c4", "d3", "a4", "b3", "c2", "d1"],
    ['3', "a3", "b4", "c1", "d2", "a4", "b3"],
    ['4', "c2", "d1", "a3", "b4", "c1", "d2"],
    ['5', "a2", "b1", "c4", "d3", "a1", "b2"],
    ['6', "c3", "d4", "a1", "b2", "c4", "d3"],
    ['7', "a4", "b3", "c2", "d1", "a3", "b4"],
    ['8', "c1", "d2", "a2", "b1", "c3", "d4"]
  ];

  constructor(
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    this.db.list('/cards').valueChanges().subscribe((res: any) => {
  
    })
    const objectRef = this.db.object('/cards');
    objectRef.valueChanges().subscribe((data: any) => {
      this.allCategories = data
      this.categories = Object.keys(data).map(el => {
        const name = el
        const obj = {
          key: name
        }
        return obj;
      }) as any;
    });

  }

  selectRow(event: any) {
    this.selectedRow = true;
    this.currentCategory = this.allCategories[event.key].slice(16)
    this.items =this.allCategories[event.key].slice(0, 16).reduce((result: any, value: any, index: any) => {
      const chunkIndex = Math.floor(index / 4);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(value);
      return result;
    }, []);
    console.log(this.items)
  }

}
