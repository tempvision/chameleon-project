import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chameleon';
  userId!: string;
  items: any;

  constructor(private db: AngularFireDatabase) {
    this.generateUserId();
  }

  generateUserId(): void {
    if (sessionStorage.getItem('userId')) {
      this.userId = sessionStorage.getItem('userId')!;
    } else {
      this.userId = uuidv4();
      sessionStorage.setItem('userId', this.userId);
    }
  }
}
