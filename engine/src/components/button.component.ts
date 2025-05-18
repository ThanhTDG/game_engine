import { Component } from "../core/component";
import { InputManager } from "../core/input-manager";
import { Renderer } from "../core/renderer";

export class Button extends Component {
	private _onClick: (() => void) | null = null;
	private _isHovered: boolean = false;

	public width: number;
	public height: number;
	public color: string;
	public hoverColor: string;
	public label: string;
	public textColor: string;

	constructor(
		width: number,
		height: number,
		color: string,
		hoverColor: string = "lightblue",
		label: string = "",
		textColor: string = "white"
	) {
		super();
		this.width = width;
		this.height = height;
		this.color = color;
		this.hoverColor = hoverColor;
		this.label = label;
		this.textColor = textColor;
	}

	public setOnClick(callback: () => void): void {
		this._onClick = callback;
	}

	public onUpdate(deltaTime: number): void {
		if (!this.node) return;

		const mousePos = InputManager.getMousePosition();
		const { x, y } = this.node;

		this._isHovered =
			mousePos.x >= x - this.width / 2 &&
			mousePos.x <= x + this.width / 2 &&
			mousePos.y >= y - this.height / 2 &&
			mousePos.y <= y + this.height / 2;

		if (this._isHovered && InputManager.isMouseClicked()) {
			if (this._onClick) {
				this._onClick();
			}
		}
	}

	public onRender(renderer: Renderer): void {
		if (!this.node) {
			console.error("Button is not attached to a Node.");
			return;
		}
		const { x, y } = this.node;

		renderer.context.fillStyle = this._isHovered ? this.hoverColor : this.color;
		renderer.context.fillRect(
			x - this.width / 2,
			y - this.height / 2,
			this.width,
			this.height
		);

		renderer.context.strokeStyle = "white";
		renderer.context.strokeRect(
			x - this.width / 2,
			y - this.height / 2,
			this.width,
			this.height
		);

		if (this.label) {
			renderer.context.fillStyle = this.textColor;
			renderer.context.font = "16px Arial";
			renderer.context.textAlign = "center";
			renderer.context.textBaseline = "middle";
			renderer.context.fillText(this.label, x, y);
		}
	}
}
