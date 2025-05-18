import { Config } from "./config";
import { Director } from "game-engine";
import { GameScene } from "./game-scene";

window.onload = () => {
	const director = Director.instance;
	let height = Config.game.height;
	let width = Config.game.width;
	director.init("gameCanvas", width, height);

	const gameScene = new GameScene();
	director.runScene(gameScene);

	director.start();

	const fileInput = document.getElementById("fileInput") as HTMLInputElement;
	const loadImageButton = document.getElementById(
		"loadImageButton"
	) as HTMLButtonElement;

	if (!loadImageButton) {
		console.error("Button element not found!");
		return;
	}

	loadImageButton.addEventListener("click", () => {
		const imageUrl = fileInput.value.toString();
		if (!imageUrl) {
			console.error("No URL provided!");
			return;
		} else {
			gameScene.changePlayerImage(imageUrl);
		}
	});
};
