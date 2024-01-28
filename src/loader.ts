import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add({
        alias: 'fonts',
        src: './font_silver.ttf'
    });
    PIXI.Assets.add({
        alias: 'images',
        src: ['./scene_restroom.png', './ui_dialog.png']
    });
    await PIXI.Assets.load(['fonts', 'images'])

    console.log('SYSTEM: All assets loaded.');
}
