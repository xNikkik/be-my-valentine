import { Injectable } from "@angular/core";
import { ArcRotateCamera, Color4, Engine, HemisphericLight, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

@Injectable({
    providedIn: 'root'
})
export class AppScene {
    public async createScene(engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
        const scene: Scene = new Scene(engine);
        scene.clearColor = new Color4(0.95, 0.33, 0.33, 0.75);
        scene.createDefaultEnvironment({
            createGround: false,
            createSkybox: false,
            toneMappingEnabled: true
        });

        let camera: ArcRotateCamera = new ArcRotateCamera('camera', 0.5 * Math.PI, 0.5 * Math.PI, 130, new Vector3(0, 25, 0), scene);
        camera.attachControl(canvas, true);
        camera.lowerBetaLimit = 0.05 * Math.PI / 2;
        camera.upperBetaLimit = 1.95 * Math.PI / 2;
        camera.wheelDeltaPercentage = 0.015;
        camera.minZ = 0.001;
        camera.lowerRadiusLimit = 100;
        camera.upperRadiusLimit = 150;
        camera.panningSensibility = 0;

        let light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 2.5;

        const meshResult = await SceneLoader.ImportMeshAsync("", "/assets/love_low_poly.glb", "", scene);
        const model = meshResult.meshes[0];

        model.position = new Vector3(0, 0, 0);

        scene.registerBeforeRender(() => {
            model.rotate(Vector3.Up(), -Math.PI / 500);
        })

        return scene;
    }

}