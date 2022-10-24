import {
    Object3D
} from "three";
import { dispose } from "./util";

export default class FrameObject3D extends Object3D {

    private _currentFrame: number = 0;
    private frameModels: {
        [frame: number]: (Object3D | undefined)
    } = {};

    setFrame(frameNo: number): void {
        this._currentFrame = frameNo;

        for (const key in this.frameModels) {
            const model = this.frameModels[key];
            if (model !== undefined) {
                model.visible = false;
            }
        }
        const currentModel = this.frameModels[this._currentFrame];
        if (currentModel !== undefined) {
            currentModel.visible = true;
        }
    }

    getCurrentFrame(): number {
        return this._currentFrame;
    }

    addFrame(frameNo: number, object3d: Object3D): void {
        if (this.frameModels[frameNo] !== undefined && this.frameModels[frameNo] !== object3d) {
            this.removeFrame(frameNo);
        }
        this.frameModels[frameNo] = object3d;
        this.add(object3d);
    }

    removeFrame(frameNo: number): void {
        const model = this.frameModels[frameNo];
        if (model !== undefined) {
            this.remove(model);
            dispose(model);    
        }
        this.frameModels[frameNo] = undefined;
    }
}