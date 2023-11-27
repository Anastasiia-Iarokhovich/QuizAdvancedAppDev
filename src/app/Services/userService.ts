import { User } from "../Models/User";

export class UserService {

  users:User[] = [];

  getAll(): User[] {
    return this.users;
  }

  setCategoryNameAndScore(name: string, score: number): void {
    const existingScore = this.users.find((quizScore) => quizScore.category === name);
    if (existingScore) {
      existingScore.score = score;
    } else {
      this.users.push(new User(123, "User1", name, score));
    }
  }

}

