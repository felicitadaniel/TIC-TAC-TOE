import { Component, WritableSignal, effect, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CanvasComponent, NgIf],
})
export class AppComponent {
  title: string;
  game: WritableSignal<number[][]> = model.required<number[][]>();
  turn: WritableSignal<string> = model.required<string>();
  blockGame: boolean;

  constructor() {
    this.title = 'Tic-Tac-Toe Game';
    this.game.set([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    this.turn.set('cross');
    this.blockGame = false;
    effect(() => {
      // CHECK FOR A WINNER
      if (this.turn()) {
        for (let i = 0; i < 3; i++) {
          if (
            (this.game()[0][i] === 1 &&
              this.game()[1][i] === 1 &&
              this.game()[2][i] === 1) ||
            (this.game()[i][0] === 1 &&
              this.game()[i][1] === 1 &&
              this.game()[i][2] === 1) ||
            (this.game()[0][0] === 1 &&
              this.game()[1][1] === 1 &&
              this.game()[2][2] === 1) ||
            (this.game()[0][2] === 1 &&
              this.game()[1][1] === 1 &&
              this.game()[2][0] === 1)
          ) {
            console.log('X Wins');
            this.blockGame = true;
            break;
          } else if (
            (this.game()[0][i] === 2 &&
              this.game()[1][i] === 2 &&
              this.game()[2][i] === 2) ||
            (this.game()[i][0] === 2 &&
              this.game()[i][1] === 2 &&
              this.game()[i][2] === 2) ||
            (this.game()[0][0] === 2 &&
              this.game()[1][1] === 2 &&
              this.game()[2][2] === 2) ||
            (this.game()[0][2] === 2 &&
              this.game()[1][1] === 2 &&
              this.game()[2][0] === 2)
          ) {
            console.log('O Wins');
            this.blockGame = true;
            break;
          }
        }
      }
    });
  }

  resetGame(): void {
    this.game.set([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    this.turn.set('cross');
    this.blockGame = false;
  }

  checkForwinner() {}
}
