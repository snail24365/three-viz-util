type BufferPoolMeta = {
    totalFrame: number,
    chunkSize: number,
}

interface Producer<T> {
    getDataAt(frame: number): T
    getChunkAt(chunkNo: number): Array<T>
}

export class BufferPool<T> implements Pool<T>{

    private slot: Array<T> = [];

    constructor(producer:Producer<T>, meta:BufferPoolMeta) {
        
    }

    private async getChunk(chunkNo: number): Promise<Array<T>> {


        return [];
    }

    async get(index: number): Promise<T> {
        if (this.slot[index] !== undefined) {
            return this.slot[index];
        }
        
        throw new Error("Method not implemented.");
    }
}


export interface Pool<T> {
    get(index: number): Promise<T>;
}
