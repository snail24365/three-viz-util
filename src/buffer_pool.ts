class FiniteBufferPool<T> implements BufferPool<T>{

    constructor() {
        
    }

    get(index: number): T {
        throw new Error("Method not implemented.");
    }
}


export interface BufferPool<T> {
    get(index: number): T;
}

// fixed size buffer pool
// stream buffer pool