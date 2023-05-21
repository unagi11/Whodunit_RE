import * as PIXI from 'pixi.js';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('DOSPilgi', './font/DOSPilgi.ttf');
    PIXI.Assets.add('pngs', [
        './ase/scene_entrance.png',
        './ase/ui_dialog.png'
    ])
    await PIXI.Assets.load('DOSPilgi')
    await PIXI.Assets.load('pngs')
}
