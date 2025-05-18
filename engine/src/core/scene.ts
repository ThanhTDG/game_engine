import { Node } from "./node";
import { Renderer } from "./renderer";

export class Scene {
	public rootNodes: Node[] = [];

	public onLoad(renderer: Renderer): void {}

	public addRootNode(node: Node): void {
		if (node.parent) {
			console.warn(
				`Node ${node.name} already has a parent. Removing from previous parent.`
			);
			node.parent.removeChild(node);
		}
		this.rootNodes.push(node);
		node.parent = null;
	}

	public removeRootNode(node: Node): void {
		const index = this.rootNodes.indexOf(node);
		if (index > -1) {
			this.rootNodes.splice(index, 1);
			node.parent = null;
		}
	}

	public update(deltaTime: number): void {
		for (const node of this.rootNodes) {
			node._update(deltaTime);
		}
	}

	public render(renderer: Renderer): void {
		for (const node of this.rootNodes) {
			node._render(renderer);
		}
	}

	public destroy(): void {
		for (const node of [...this.rootNodes]) {
			node.destroy();
		}
		this.rootNodes = [];
	}
}
