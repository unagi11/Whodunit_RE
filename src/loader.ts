import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('DOSPilgi', './font/DOSPilgi.ttf');
    await PIXI.Assets.load('DOSPilgi')
}
