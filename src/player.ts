export type PlayFinishType = "finish" | "halt";

type CallbackMap = {
    [key : string] : (...args:any[]) => any
}

export default class Player {
    
    totalFrame: number = -1;
    private _fps: number = 60;
    private _cursor :number = 0;
    playSubscription: NodeJS.Timeout | null = null;
    playFinishResolve: ((value: PlayFinishType) => void) | null = null;
    private cursorUpdateCallbackMap: CallbackMap = {};

    pause() {
        if (this.playSubscription) {
            clearTimeout(this.playSubscription);
        }
        this.playFinishResolve?.("halt");
    }

    async stop() {
        this.pause();
        await this.setCursor(0);
    }

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

    public isCursorAtTail() {
        return this.cursor === this.totalFrame - 1;
    }

    get fps(): number {
        return this._fps;
    }

    setFps(val:number) {
        this._fps = val;
    }

    get cursor(): number {
        return this._cursor;
    }

    async setCursor(frameNo: number) {
        if (frameNo >= this.totalFrame || frameNo < 0) {
            throw new Error("cursor out of bound")
        }
        this._cursor = frameNo;
        for (const key in this.cursorUpdateCallbackMap) {
            await this.cursorUpdateCallbackMap[key]();
        }
    }

    async tick() {
        if (this.cursor < this.totalFrame - 1) {
            await this.setCursor(this.cursor + 1);
        }
    }

    setTotalFrame(totalFrame: number) {
        if (totalFrame < 0) {
            throw new Error("invalid total frame")
        }
        this.totalFrame = totalFrame;
    }
}