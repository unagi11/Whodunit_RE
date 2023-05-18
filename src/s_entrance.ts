import { Container, Sprite } from 'pixi.js';
import { SceneBase, SceneData } from './base/scene';
import { Dialog } from './dialog';

export class SceneEntrance extends SceneBase {

    rug : Sprite
    calendar : Sprite
    frame : Sprite
    door : Sprite
    BG : Sprite
    
    constructor(data: SceneData, parent : Container) {
        super(data, parent);

        this.rug = this.findObject('rug') as Sprite;
        this.calendar = this.findObject('calendar') as Sprite;
        this.frame = this.findObject('frame') as Sprite;
        this.door = this.findObject('door') as Sprite;
        this.BG = this.findObject('BG') as Sprite;

        this.rug.on('pointerdown', (a) => {
            Dialog.getInstance().show('rug');
        });
    }
}