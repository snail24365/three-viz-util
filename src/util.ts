import { Mesh, Object3D } from "three";

export async function sleep(millisecond: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("wake up");
        }, millisecond);
    });
}

export function dispose(model: Object3D): void {
    if (model instanceof Mesh) {
        model.geometry.dispose();
        model.material.dispose();
    }

    model.children.forEach((child) => {
        dispose(child);
    });
}