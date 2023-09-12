import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('fonts', './font/DOSPilgi.ttf');
    PIXI.Assets.add('images', [ './object/sc_entrance.png', './object/sc_lounge.png', './object/ui_dialog.png' ])
    await PIXI.Assets.load('fonts')
    await PIXI.Assets.load('images')
}
