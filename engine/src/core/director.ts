import { GameLoop } from "./game-loop";
import { InputManager } from "./input-manager";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export class Director {
	private static _instance: Director;
	public static get instance(): Director {
		if (!Director._instance) {
			Director._instance = new Director();
		}
		return Director._instance;
	}

	private gameLoop: GameLoop;
	private _renderer: Renderer | null = null;
	private _currentScene: Scene | null = null;
	private _paused: boolean = false;
	private _initialized: boolean = false;

	private constructor() {
		this.gameLoop = new GameLoop(this.tick.bind(this));
	}

	public get renderer(): Renderer | null {
		return this._renderer;
	}

	public get currentScene(): Scene | null {
		return this._currentScene;
	}

	public init(canvasId: string, width: number, height: number): void {
		if (this._initialized) {
			console.warn("Director already initialized.");
			return;
		}
		this._renderer = new Renderer(canvasId, width, height);
		InputManager.initialize();
		this._initialized = true;
	}

	public runScene(scene: Scene): void {
		if (!this._initialized || !this._renderer) {
			console.error(
				"Director not initialized. Call init() first with a canvas."
			);
			return;
		}
		if (this._currentScene) {
			this._currentScene.destroy(); // Dọn dẹp scene cũ
		}
		this._currentScene = scene;
		if (this._currentScene.onLoad) {
			this._currentScene.onLoad(this._renderer);
		}
	}

	private tick(deltaTime: number): void {
		if (this._paused || !this._currentScene || !this._renderer) {
			return;
		}

		this._currentScene.update(deltaTime);

		this._renderer.clear();
		this._currentScene.render(this._renderer);
	}

	public start(): void {
		if (!this._initialized) {
			console.error("Director not initialized. Call init() first.");
			return;
		}
		if (!this._currentScene) {
			console.error("No scene is running. Call runScene() first.");
			return;
		}
		this.gameLoop.start();
	}

	public pause(): void {
		this._paused = true;
		console.log("Director paused");
	}

	public resume(): void {
		this._paused = false;
		console.log("Director resumed");
	}

	public stop(): void {
		this.gameLoop.stop();
		if (this._currentScene) {
			this._currentScene.destroy();
			this._currentScene = null;
		}
		console.log("Director stopped");
	}
}
