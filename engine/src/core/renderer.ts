export class Renderer {
	public canvas: HTMLCanvasElement;
	public context: CanvasRenderingContext2D;

	constructor(canvasId: string, width: number, height: number) {
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
			throw new Error(`Canvas with id ${canvasId} not found`);
		}
		this.canvas = canvas;
		this.canvas.width = width;
		this.canvas.height = height;
		const context = this.canvas.getContext("2d");
		if (!context) {
			throw new Error(
				`Failed to get 2D context for canvas with id ${canvasId}`
			);
		}
		this.context = context;
	}

	public clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public drawRectangle(
		x: number,
		y: number,
		width: number,
		height: number,
		color: string
	) {
		this.context.fillStyle = color;
		this.context.fillRect(x, y, width, height);
	}
}
