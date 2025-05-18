import { Scene } from "game-engine";
import { PlayerController } from "./player/player.controller";

export class GameScene extends Scene {
	private _playerController: PlayerController;
	static instance: GameScene;
	constructor() {
		super();
		this._playerController = new PlayerController(this);
	}
	static getInstance(): GameScene {
		if (!GameScene.instance) {
			GameScene.instance = new GameScene();
		}
		return GameScene.instance;
	}

	changePlayerImage(imageSrc: string): void {
		this._playerController.changePlayerImage(imageSrc);
	}

	public onLoad(): void {
		this._playerController = new PlayerController(this);
	}
}
