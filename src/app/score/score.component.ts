import { Component, OnInit} from '@angular/core';
import { UserService } from '../Services/userService';
import { User } from '../Models/User';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {
    this.users = this.userService.getAll();
  }

  ngOnInit(): void {
  }
}
