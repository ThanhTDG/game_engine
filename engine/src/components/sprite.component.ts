import { Component } from "../core/component";
import { Renderer } from "../core/renderer";

export class Sprite extends Component {
	protected image: HTMLImageElement | null = null;
	protected width: number = 0;
	protected height: number = 0;
	private _errorMessage: string | null = null;

	constructor(imageSrc: string, width: number = 200, height: number = 200) {
		super();
		this.width = width;
		this.height = height;
		this.loadImage(imageSrc);
	}

	private loadImage(imageSrc: string): void {
		this.image = new Image();

		this.image.crossOrigin = "anonymous";
		this.image.src = imageSrc;

		this.image.onload = () => {
			this.width = this.width;
			this.height = this.height;
			this._errorMessage = null;
		};

		this.image.onerror = () => {
			console.error(`Failed to load sprite image: ${imageSrc}`);
			this.image = null;
			this._errorMessage = "Failed to load image";
		};
	}

	public setImage(newImage: HTMLImageElement): void {
		this.image = newImage;
		this.width = newImage.width;
		this.height = newImage.height;
		this._errorMessage = null;
	}
	setImageFromUrl(imageSrc: string): void {
		this.image = new Image();
		this.image.crossOrigin = "anonymous";
		this.image.src = imageSrc;

		this.image.onload = () => {
			this.width = this.width;
			this.height = this.height;
			this._errorMessage = null;
		};

		this.image.onerror = () => {
			console.error(`Failed to load sprite image: ${imageSrc}`);
			this.image = null;
			this._errorMessage = "Failed to load image";
		};
	}
	public onUpdate(deltaTime: number): void {
		if (!this.node) {
			console.error("Sprite is not attached to a Node.");
			return;
		}
		const { x, y, scaleX, scaleY, rotation } = this.node;

		this.node.x = x;
		this.node.y = y;
		this.node.scaleX = scaleX;
		this.node.scaleY = scaleY;
		this.node.rotation = rotation;
	}

	public onRender(renderer: Renderer): void {
		if (!this.node) {
			return;
		}
		const { x, y, scaleX, scaleY, rotation } = this.node;

		renderer.context.save();
		renderer.context.translate(x, y);
		renderer.context.rotate((rotation * Math.PI) / 180);
		renderer.context.scale(scaleX, scaleY);

		if (this.image) {
			renderer.context.drawImage(
				this.image,
				-this.width / 2,
				-this.height / 2,
				this.width,
				this.height
			);
		} else if (this._errorMessage) {
			renderer.context.fillStyle = "red";
			renderer.context.font = "16px Arial";
			renderer.context.textAlign = "center";
			renderer.context.fillText(this._errorMessage, 0, 0);
		}

		renderer.context.restore();
	}
}
