import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('fonts', './DOSPilgi.ttf');
    PIXI.Assets.add('images', ['./scene_entrance.png', './scene_lounge.png', './scene_restroom.png', './ui_dialog.png']);
    await PIXI.Assets.load('fonts')
    await PIXI.Assets.load('images')
}
