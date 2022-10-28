import { BufferAttribute, DoubleSide, Mesh, MeshPhongMaterial } from 'three';
import { Object3D } from 'three';
import { BufferGeometry } from 'three';

export default class GeometryMerger {

    merge(object3d: Object3D) {
        const positionBuffer:number[] = [];
        const normalBuffer:number[] = [];
        const colorBuffer: number[] = [];
        const indices: number[] = [];
        this.merge_subroutine(object3d, positionBuffer, normalBuffer, colorBuffer, indices, { vertexOffset: 0 });

        const result = new Mesh();
        result.geometry.setAttribute("position", new BufferAttribute(new Float32Array(positionBuffer), 3));
        result.geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normalBuffer), 3));
        result.geometry.setAttribute("color", new BufferAttribute(new Float32Array(colorBuffer), 3));

        result.geometry.setIndex(new BufferAttribute(new Uint32Array(indices), 1));
        result.material = new MeshPhongMaterial({ vertexColors: true, side:DoubleSide });
        return result;
    }

    private merge_subroutine(
        object3d: Object3D,
        positionBuffer: number[],
        normalBuffer: number[],
        colorBuffer: number[],
        indices: number[],
        offsetObject:{ vertexOffset: number}
    ):void {
        if (object3d instanceof Mesh) {
            const geometry = object3d.geometry as BufferGeometry;

            const geometryIndice = geometry.getIndex()?.array;
            const vertexOffset = offsetObject.vertexOffset / 3;
            if (geometryIndice) {
                for (let i = 0; i < geometryIndice.length; i++) {
                    indices.push(geometryIndice[i] + vertexOffset);
                }
            } else {
                
                for (let i = 0; i < geometry.getAttribute("position").count; i++) {
                    indices.push(i + vertexOffset)
                }
            }

            object3d.updateMatrixWorld();
            const position = geometry.getAttribute("position").applyMatrix4(object3d.matrixWorld)
            
            let normal = null;
            let color = null;

            if (geometry.hasAttribute("normal")) {
                normal = geometry.getAttribute("normal");
            }

            if (geometry.hasAttribute("color")) {
                color = geometry.getAttribute("color");
            }

            for (let i = 0; i < position.array.length; i++) {
                positionBuffer[offsetObject.vertexOffset] = position.array[i];
                normalBuffer[offsetObject.vertexOffset] = normal?.array[i] ?? 0;
                colorBuffer[offsetObject.vertexOffset] = color?.array[i] ?? 0;
                offsetObject.vertexOffset++;
            }
        }
        for (const child of object3d.children) {
            this.merge_subroutine(child, positionBuffer, normalBuffer, colorBuffer, indices, offsetObject);
        }
    }

}