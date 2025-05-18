export class InputManager {
	private static keys: Set<string> = new Set();
	private static mousePosition: { x: number; y: number } = { x: 0, y: 0 };
	private static mouseClicked: boolean = false;
	private static initialized: boolean = false;

	public static initialize(): void {
		if (this.initialized) return;

		window.addEventListener("keydown", (event) => {
			this.keys.add(event.key.toLowerCase());
		});
		window.addEventListener("keyup", (event) => {
			this.keys.delete(event.key.toLowerCase());
		});

		window.addEventListener("mousemove", (event) => {
			const canvas = document.querySelector("canvas");
			if (canvas) {
				const rect = canvas.getBoundingClientRect();
				this.mousePosition.x = event.clientX - rect.left;
				this.mousePosition.y = event.clientY - rect.top;
			}
		});

		window.addEventListener("mousedown", () => {
			this.mouseClicked = true;
		});

		window.addEventListener("mouseup", () => {
			this.mouseClicked = false;
		});

		this.initialized = true;
	}

	public static isKeyDown(key: string): boolean {
		if (!this.initialized) {
			console.warn(
				"InputManager not initialized. Call InputManager.initialize() first."
			);
			return false;
		}
		return this.keys.has(key.toLowerCase());
	}

	public static getMousePosition(): { x: number; y: number } {
		if (!this.initialized) {
			console.warn(
				"InputManager not initialized. Call InputManager.initialize() first."
			);
			return { x: 0, y: 0 };
		}
		return this.mousePosition;
	}

	public static isMouseClicked(): boolean {
		console.log("Mouse clicked:", this.mouseClicked);
		if (!this.initialized) {
			console.warn(
				"InputManager not initialized. Call InputManager.initialize() first."
			);
			return false;
		}
		return this.mouseClicked;
	}
}
