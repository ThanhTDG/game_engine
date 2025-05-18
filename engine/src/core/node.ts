import { Component } from "./component";
import { Renderer } from "./renderer";

export class Node {
	public x: number;
	public y: number;
	public rotation: number = 0;
	public scaleX: number = 1;
	public scaleY: number = 1;

	public name: string = "Node";

	private listComponent: Component[] = [];
	private _active: boolean = true;
	private _started: boolean = false;

	public children: Node[] = [];
	public parent: Node | null = null;

	constructor(name: string = "Node", x: number = 0, y: number = 0) {
		this.name = name;
		this.x = x;
		this.y = y;
	}

	public set active(value: boolean) {
		this._active = value;
	}

	public get active(): boolean {
		return this._active;
	}

	public addComponent<T extends Component>(component: T): T {
		this.listComponent.push(component);
		component.node = this;
		if (component.onLoad) {
			component.onLoad();
		}
		return component;
	}

	public getComponent<T extends Component>(
		constructor: new (...args: any[]) => T
	): T | null {
		for (const component of this.listComponent) {
			if (component instanceof constructor) {
				return component;
			}
		}
		return null;
	}
	public removeChild(child: Node): void {
		const index = this.children.indexOf(child);
		if (index !== -1) {
			this.children.splice(index, 1);
			child.parent = null;
		}
	}

	public addChild(child: Node): void {
		if (child.parent) {
			child.parent.removeChild(child);
		}
		this.children.push(child);
		child.parent = this;
	}

	public _update(deltaTime: number): void {
		if (!this._active) {
			return;
		}

		if (!this._started) {
			for (const component of this.listComponent) {
				if (component.onStart) {
					component.onStart();
				}
			}
			this._started = true;
		}

		for (const component of this.listComponent) {
			if (component.onUpdate) {
				component.onUpdate(deltaTime);
			}
		}

		for (const child of this.children) {
			child._update(deltaTime);
		}
	}

	public _render(renderer: Renderer): void {
		if (!this._active) {
			return;
		}

		renderer.context.save();

		for (const component of this.listComponent) {
			if (component.onRender) {
				component.onRender(renderer);
			}
		}

		for (const child of this.children) {
			child._render(renderer);
		}

		renderer.context.restore();
	}

	public destroy(): void {
		for (const component of this.listComponent) {
			if (component.onDestroy) {
				component.onDestroy();
			}
		}
		this.listComponent = [];

		for (const child of [...this.children]) {
			child.destroy();
		}
		this.children = [];

		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}
