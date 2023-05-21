import { Container, Sprite } from 'pixi.js';
import { SceneBase, SceneData } from './base/scene';
import { Dialog } from './dialog';
import { Helper } from './base/helper';

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

        Helper.addTouchEndEvent(this.frame, _ => { Dialog.show('웃고있는 남자의 그림이다.'); })
        Helper.addTouchEndEvent(this.door, _ => { Dialog.show('내가 들어온 문이다.\n사건을 해결하기 전까지는 나갈수 없다.'); })
        Helper.addTouchEndEvent(this.calendar, _ => { Dialog.show('달력이다.\n오늘은 6월 1일이다.'); })
        Helper.addTouchEndEvent(this.rug, _ => { Dialog.show(['양탄자다.', '뭔가 묻어있는것 같다.']) })
    }
}