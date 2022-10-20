export type PlayFinishType = "finish" | "halt";

type CallbackMap = {
    [key : string] : ((frameNo:number, ...args:any[]) => any) | undefined
}

export default class Player {
    
    _totalFrame: number = -1;
    private _fps: number = 60;
    private _cursor :number = 0;
    playSubscription: NodeJS.Timeout | null = null;
    playFinishResolve: ((value: PlayFinishType) => void) | null = null;
    private cursorUpdateCallbackMap: CallbackMap = {};

    async play():Promise<PlayFinishType> {
        const endPromise = new Promise<PlayFinishType>((resolve) => {
            this.playFinishResolve = resolve;
        });

        const period = (1 / this.fps) * 1000;

        const tickUntilFinish = async () => {
            if (this.isCursorAtTail()) {
                this.playFinishResolve?.("finish");
                return;
            }
            await this.tick();
            this.playSubscription = setTimeout(tickUntilFinish, period);
        }
        this.playSubscription = setTimeout(tickUntilFinish, period);
        return endPromise;
    }

    pause(): void {
        if (this.playSubscription) {
            clearTimeout(this.playSubscription);
        }
        this.playFinishResolve?.("halt");
    }

    stop(): void {
        this.pause();
        this.cursor = 0;
    }


    async update(): Promise<void> {
        for (const key in this.cursorUpdateCallbackMap) {
            await this.cursorUpdateCallbackMap[key]?.(this.cursor);
        }
    }

    addUpdateCallback(key: string, func: (frameNo:number, ...args: any[]) => any): void {
        this.cursorUpdateCallbackMap[key] = func;
    }

    removeUpdateCallback(key: string): void {
        this.cursorUpdateCallbackMap[key] = undefined;
    }

    async tick(): Promise<number> {
        if (this.cursor < this.totalFrame - 1) {
            this.cursor += 1;
            await this.update();
        }
        return this.cursor;
    }

    public isCursorAtTail(): boolean {
        return this.cursor === this.totalFrame - 1;
    }

    get fps(): number {
        return this._fps;
    }

    set fps(val:number) {
        this._fps = val;
    }

    get cursor(): number {
        return this._cursor;
    }

    set cursor(frameNo: number) {
        if (frameNo >= this.totalFrame || frameNo < 0) {
            throw new Error("cursor out of bound")
        }
        this._cursor = frameNo;
    }

    get totalFrame() {
        return this._totalFrame;
    }

    set totalFrame(numFrame: number) {
        if (numFrame < 0) {
            throw new Error("invalid total frame")
        }
        this._totalFrame = numFrame;
    }
}