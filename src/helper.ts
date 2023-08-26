import { Container, FederatedEventHandler } from 'pixi.js';

export class Helper {

    static addTouchEndEvent(btn : Container, func : FederatedEventHandler, cursor : boolean = false) {
        btn.interactive = true;
        btn.onpointerdown = func;
        btn.onpointerover = () => { btn.cursor = 'pointer'; };
        btn.onpointerleave = () => {
            console.log('leave');
            btn.cursor = 'default'; };
    }
}