import { Object3D } from "three";

export default class FrameObject3D extends Object3D {

    _currentFrame: number = 0;
    private frameModels = {};

    setFrame(frameNo:number) {
        this._currentFrame = frameNo;

        // for (const key of this.frameModels) {
        //     this.frameModels[key]
        // }
    }

}