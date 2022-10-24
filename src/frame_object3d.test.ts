import { Object3D } from 'three';
import FrameObject3D from './frame_object3d';

test("test getCurrentFrame", async () => {
    const frameObject = new FrameObject3D();
    const frameNo = 10;
    frameObject.setFrame(frameNo);
    expect(frameObject.getCurrentFrame()).toBe(frameNo);
});

test("test setFrame", async () => {
    const frameObject = new FrameObject3D();
    const frameNo = 1;
    frameObject.setFrame(frameNo);
    expect(frameObject.getCurrentFrame()).toBe(frameNo);
});

test("test addFrame", async () => {
    const frameObject = new FrameObject3D();
    const frameNo = 0;
    frameObject.addFrame(frameNo, new Object3D());
    frameObject.addFrame(frameNo + 1, new Object3D());
    frameObject.addFrame(frameNo + 2, new Object3D());
    expect(frameObject.children.length).toBe(3);
});

test("test removeFrame", async () => {
    const frameObject = new FrameObject3D();
    frameObject.addFrame(0, new Object3D());
    frameObject.addFrame(1, new Object3D());
    frameObject.addFrame(2, new Object3D());
    frameObject.removeFrame(1);
    frameObject.removeFrame(2);
    expect(frameObject.children.length).toBe(1);
});