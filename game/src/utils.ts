import { Button, Node, Scene } from "game-engine";

export type Position = {
	x: number;
	y: number;
};
export type Size = {
	width: number;
	height: number;
};
export type ButtonConfig = {
	position: Position;
	size: Size;
	name: string;
	color: string;
	hoverColor?: string;
	label?: string;
	textColor?: string;
};

export function createButton(
	ButtonConfig: ButtonConfig = {
		position: { x: 0, y: 0 },
		size: { width: 100, height: 50 },
		name: "Button",
		color: "blue",
		hoverColor: "lightblue",
		label: "Click Me",
		textColor: "white",
	},
	onClick: () => void
): { button: Button; buttonNode: Node } {
	const {
		position: { x, y },
		size: { width, height },
		name,
		color,
		hoverColor = "lightblue",
		label = "Click Me",
		textColor = "white",
	} = ButtonConfig;

	const button = new Button(width, height, color, hoverColor, label, textColor);

	const buttonNode = new Node(name);
	buttonNode.x = x;
	buttonNode.y = y;
	buttonNode.addComponent(button);

	button.setOnClick(onClick);

	return { button, buttonNode };
}
