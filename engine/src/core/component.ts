import { Node } from "./node";
import { Renderer } from "./renderer";

export abstract class Component {
	public node!: Node;
	// lifecycle components
	public onLoad?(): void {}
	public onStart?(): void {}
	public onUpdate?(deltaTime: number): void {}
	public onRender?(renderer: Renderer): void;
	public onDestroy?(): void {}
}
