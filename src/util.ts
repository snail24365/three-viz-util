import { Mesh, Object3D, Vector3 } from "three";

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

export function getNormal(p1:Vector3, p2:Vector3 ,p3:Vector3):Vector3 {
    const p2p1 = new Vector3().copy(p2).sub(new Vector3().copy(p1));
    const p3p2 = new Vector3().copy(p3).sub(new Vector3().copy(p2));
    return new Vector3().crossVectors(p3p2, p2p1).normalize();
}
