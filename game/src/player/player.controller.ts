import { Config } from "../config";
import { Button, Scene } from "game-engine";
import { createButton } from "../utils";
import { Player } from "./player";

export class PlayerController {
	private buttons: { [key: string]: Button } = {};
	private scene: Scene;
	private player: Player;

	constructor(scene: Scene) {
		this.scene = scene;
		this.player = this.createPlayer();
		this.scene.addRootNode(this.player.node);
		this.createButtons();
	}

	private createPlayer(): Player {
		return new Player(
			"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
			{ x: 400, y: 300 },
			5
		);
	}
	public changePlayerImage(imageSrc: string): void {
		this.player.changeImage(imageSrc);
	}

	private createButtons(): void {
		const buttonConfigs = this.getButtonConfigs();

		buttonConfigs.forEach((config) => {
			const { button, buttonNode } = createButton(
				{
					position: config.position,
					size: { width: 100, height: 50 },
					name: config.name,
					color: "blue",
					hoverColor: "lightblue",
					label: config.label,
					textColor: "white",
				},
				config.onClick
			);

			this.buttons[config.name] = button;
			this.scene.addRootNode(buttonNode);
		});
	}

	private getButtonConfigs(): Array<{
		name: string;
		position: { x: number; y: number };
		label: string;
		onClick: () => void;
	}> {
		const baseX = Config.game.width - 120;
		const baseY = Config.game.height - 35;
		const buttonSpacing = 60;

		return [
			{
				name: "ButtonUp",
				position: { x: baseX, y: baseY - buttonSpacing * 2 },
				label: "Up",
				onClick: () => this.player.move({ x: 0, y: -1 }),
			},
			{
				name: "ButtonDown",
				position: { x: baseX, y: baseY },
				label: "Down",
				onClick: () => this.player.move({ x: 0, y: 1 }),
			},
			{
				name: "ButtonLeft",
				position: { x: baseX - buttonSpacing, y: baseY - buttonSpacing },
				label: "Left",
				onClick: () => this.player.move({ x: -1, y: 0 }),
			},
			{
				name: "ButtonRight",
				position: { x: baseX + buttonSpacing, y: baseY - buttonSpacing },
				label: "Right",
				onClick: () => this.player.move({ x: 1, y: 0 }),
			},
		];
	}
}
