import { Config } from "../config";
import { Node, Sprite } from "game-engine";
import { Position } from "../utils";

export class Player {
	node: Node;
	sprite: Sprite;
	speed: number;
	canvasWidth: number;
	canvasHeight: number;

	constructor(
		imageSrc: string = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
		position: Position = {
			x: Config.game.width / 2,
			y: Config.game.height / 2,
		},
		speed: number = 5,
		canvasWidth: number = Config.game.width,
		canvasHeight: number = Config.game.height
	) {
		this.sprite = new Sprite(imageSrc);
		this.node = new Node("Player");
		this.node.x = position.x;
		this.node.y = position.y;
		this.sprite.setImageFromUrl(imageSrc);
		this.node.addComponent(this.sprite);
		this.speed = speed;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
	}

	changeImage(imageSrc: string): void {
		this.sprite.setImageFromUrl(imageSrc);
	}

	move(direction: { x: number; y: number }): void {
		const newX = this.node.x + direction.x * this.speed;
		const newY = this.node.y + direction.y * this.speed;

		if (newX >= 0 && newX <= this.canvasWidth) {
			this.node.x = newX;
		}
		if (newY >= 0 && newY <= this.canvasHeight) {
			this.node.y = newY;
		}

		console.log(`Player moved to position (${this.node.x}, ${this.node.y})`);
	}
}
