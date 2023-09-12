import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('fonts', './DOSPilgi.ttf');
    PIXI.Assets.add('images', [ './sc_entrance.png', './sc_lounge.png', './ui_dialog.png' ])
    await PIXI.Assets.load('fonts')
    await PIXI.Assets.load('images')
}
