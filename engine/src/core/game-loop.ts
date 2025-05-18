export class GameLoop {
	private lastTime: number = 0;
	private animationFrameId: number = 0;
	private isRunning: boolean = false;
	private tickCallback: (deltaTime: number) => void;

	constructor(tickCallback: (deltaTime: number) => void) {
		this.tickCallback = tickCallback;
	}
	private loop = (timestamp: number) => {
		if (!this.isRunning) {
			return;
		}
		const deltaTime = timestamp - this.lastTime;
		this.tickCallback(deltaTime);
		this.animationFrameId = requestAnimationFrame(this.loop);
	};
	public start() {
		if (this.isRunning) {
			return;
		}

		this.isRunning = true;
		this.lastTime = performance.now();
		this.animationFrameId = requestAnimationFrame(this.loop);
	}

	public stop() {
		if (!this.isRunning) {
			return;
		}
		this.isRunning = false;

		if (this.animationFrameId !== 0) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = 0;
		}
	}
}
