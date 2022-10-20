import Player, {
    PlayFinishType
} from "./player";
import { sleep } from "./util";

test("seek should move cursor to the number", async () => {
    const player = new Player();
    player.setTotalFrame(5)
    await player.setCursor(3);
    expect(player.cursor).toBe(3);
});

test("seek out of index throw error", async () => {
    const t = async () => {
        const player = new Player();
        player.setTotalFrame(5);
        await player.setCursor(5);
    }
    await expect(t).rejects.toThrow();
});

test("tick move cursor to next fame", async () => {
    const player = new Player();
    player.setTotalFrame(5)
    await player.tick();
    expect(player.cursor).toBe(1)
});

test("if cursor is at tail, tick doesn't move cursor", async () => {
    const player = new Player();
    player.setTotalFrame(5);
    await player.setCursor(4);
    await player.tick();
    expect(player.cursor).toBe(4)
});

test("play behavior test", async () => {
    const player = new Player();
    player.setTotalFrame(10);
    await player.play();
    expect(player.cursor).toBe(9)
});

test("play end behavior test", async () => {
    const player = new Player();
    player.setTotalFrame(10);
    const endType: PlayFinishType = await player.play();
    expect(endType).toBe("finish");
});

test("play end behavior test2", async () => {
    const player = new Player();
    player.setTotalFrame(100);
    player.setFps(100);
    let endPromise = player.play();
    player.pause();
    let endType: PlayFinishType = await endPromise;
    expect(endType).toBe("halt");

    endPromise = player.play();
    await player.stop();
    expect(endType).toBe("halt");
});

test("pause behavior test", async () => {
    const player = new Player();
    const totalFrame = 500;
    player.setTotalFrame(totalFrame);
    player.setFps(300);
    const endPromise = player.play();
    setTimeout(() => {
        player.pause();
    }, 10)
    await endPromise;
    expect(player.cursor).not.toBe(totalFrame - 1);
    expect(player.cursor).not.toBe(0);
});

test("stop behavior test", async () => {
    const player = new Player();
    const totalFrame = 100;
    player.setTotalFrame(totalFrame);
    player.setFps(50);
    const endPromise = player.play();
    setTimeout(async () => {
        await player.stop();
    }, 10)
    await endPromise;
    expect(player.cursor).toBe(0)
});

test("play pause stop integrate test", async () => {
    const player = new Player();
    const totalFrame = 100;
    player.setTotalFrame(totalFrame);
    player.setFps(300);

    player.play();
    await sleep(10);
    player.pause();
    expect(player.isCursorAtTail()).toBe(false);
    
    player.play();
    await sleep(10);
    await player.stop();
    expect(player.isCursorAtTail()).toBe(false);
    
    await player.play();
    expect(player.isCursorAtTail()).toBe(true);

});