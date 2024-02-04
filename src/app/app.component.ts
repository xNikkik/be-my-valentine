import { Component, OnInit } from '@angular/core';
import { Engine, Scene } from '@babylonjs/core';
import { AppScene } from './app.scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'be-my-valentine';
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  success: boolean = false;
  
  constructor(private appScene: AppScene) {}

  async ngOnInit(): Promise<void> {
    this.canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
    this.engine = new Engine(this.canvas);
    this.scene = await this.appScene.createScene(this.engine, this.canvas);
    await this.app();
  }

  private async app(): Promise<void> {
    this.engine.runRenderLoop(() => {
      if(this.scene) {
        this.scene.render();
      }
    });

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  successClicked(): void {
    this.success = true;
  }

  randomPosition(): void {
    const noBtn = document.getElementById('no');
  
    const randomX = Math.floor(Math.random() * window.screen.width * 0.6);
    const randomY = Math.floor(Math.random() * window.screen.height * 0.6);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
  }
}
