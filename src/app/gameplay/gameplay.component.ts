import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  currentCategory: Array<any> = [];
  displayedColumns: string[] = ['category', 'a', 'b', 'c', 'd'];
  category = [
    'key'
  ]
  userData: any;
  categories = []
  categorySelected!: boolean;
  selectedRow: any
  allCategories: any
  currentCategoryName: any;
  lobbyInfo: any;

  chartTable = new MatTableDataSource<string[]>();
  chartColumns: string[] = ['col0', 'col1', 'col2', 'col3', 'col4', 'col5', 'col6'];
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
  chameleonTable = [
    ['1', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['2', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['3', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['4', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['5', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['6', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['7', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['8', 'x', 'x', 'x', 'x', 'x', 'x']
  ]
  lobbyId: any;
  dataRef: any;
  usersIndex: any;
  randomRow!: number;
  randomColumn!: number;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    this.userData = sessionStorage.getItem('user')
    if (this.userData) {
      this.userData = JSON.parse(this.userData);
    } else {
      // 404
    }
    this.lobbyId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.chartTable.data = this.tableData; // this allows the table mapping

    const objectRef = this.db.object('/cards');
    objectRef.valueChanges().pipe(mergeMap((cards: any) => {
      this.allCategories = cards;
      this.categories = Object.keys(this.allCategories as object).map(el => {
        const name = el
        const obj = {
          key: name
        }
        return obj;
      }) as any;

      return this.db.list(`/lobbies/${this.lobbyId}`).snapshotChanges().pipe(map(res => {
        this.lobbyInfo = this.getCurrentLobbyInfo(res)
        this.lobbyInfo.users = this.lobbyInfo.users.map((el: any) => { el.isChameleon = false; return el });

        if (this.lobbyInfo?.gameState?.gameStarted && !this.userData?.admin) { // when the admin has already started the game
          this.currentCategoryName = (this.allCategories[this.lobbyInfo.gameState.category]).slice(16)
          this.currentCategory = this.mapCategoryTable(this.allCategories)
        }

        if (this.userData.userId === this.lobbyInfo?.gameState?.chameleon) { // switch views
          this.chartTable.data = this.chameleonTable;
        } else {
          this.chartTable.data = this.tableData;
        }

        this.randomRow = this.lobbyInfo?.gameState?.combination?.row;
        this.randomColumn = this.lobbyInfo?.gameState?.combination?.column;

      }))
    })).subscribe();

  }

  getCurrentLobbyInfo(data: any) {
    return data.reduce((acc: any, el: any) => {
      acc[el.payload.key] = el.payload.val();
      return acc;
    }, {})
  }

  mapCategoryTable(incomingData: any) {
    return incomingData[this.lobbyInfo.gameState.category].slice(0, 16).reduce((result: any, value: any, index: any) => {
      const chunkIndex = Math.floor(index / 4);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(value);
      return result;
    }, []);
  }

  nextRound() {
    this.selectedRow = false;
    // assign new chameleon
    this.lobbyInfo.gameState = {
      gameStarted: false,
      category: null,
    };
    this.dataRef.update(this.lobbyInfo); //update lobby with new chameleon
  }

  assingNewChameleon(category: any) {
    this.dataRef = this.db.object(`/lobbies/${this.lobbyId}`);
    const randomUser = this.lobbyInfo.users[Math.floor(Math.random() * this.lobbyInfo.users.length)]

    this.randomRow = Math.floor(Math.random() * this.chameleonTable.length);
    this.randomColumn = Math.floor(Math.random() * 6) + 1;;
    
    this.lobbyInfo.gameState = {
      gameStarted: true,
      category: category.key,
      chameleon: randomUser.userId,
      combination: {
        row: this.randomRow,
        column: this.randomColumn
      }
    };
    this.dataRef.update(this.lobbyInfo); // update lobby with new chameleon
  }

  selectCategory(event: any) {
    this.assingNewChameleon(event)

    this.selectedRow = true;
    this.currentCategoryName = this.allCategories[event.key].slice(16)
    this.currentCategory = this.mapTableData(event);
  }

  mapTableData(category: any) {
    return this.allCategories[category.key].slice(0, 16).reduce((result: any, value: any, index: any) => {
      const chunkIndex = Math.floor(index / 4);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(value);
      return result;
    }, []);
  }

}
