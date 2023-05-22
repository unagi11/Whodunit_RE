import * as PIXI from 'pixi.js';
import { SceneManager } from './scene';
import { GameManager } from './game';

/**
 * 에셋을 로드 하는 함수.
 */
export async function load_all() {
    PIXI.Assets.add('DOSPilgi', './font/DOSPilgi.ttf');
    PIXI.Assets.add('pngs', [
        './object/sc_entrance.png',
        './object/ui_dialog.png'
    ])
    await PIXI.Assets.load('DOSPilgi')
    await PIXI.Assets.load('pngs')

    SceneManager.instance;
    GameManager.instance;
}
