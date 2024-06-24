import { Component, model, ModelSignal } from '@angular/core';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent {
  blockGame: ModelSignal<boolean> = model.required<boolean>();
  turn: ModelSignal<string> = model.required<string>();
  game: ModelSignal<number[][]> = model.required<number[][]>();
  clickBox(element: any): void {
    const id: string = element.id.slice(-2);
    const x: number = parseInt(id.charAt(0));
    const y: number = parseInt(id.charAt(1));
    if (
      this.turn() === 'cross' &&
      this.game()[x][y] === 0 &&
      !this.blockGame()
    ) {
      element.className = 'block cross';
      this.turn.set('circle');
      this.game()[x][y] = 1;
    } else if (
      this.turn() === 'circle' &&
      this.game()[x][y] === 0 &&
      !this.blockGame()
    ) {
      element.className = 'block circle';
      this.turn.set('cross');
      this.game()[x][y] = 2;
    }
  }
}
