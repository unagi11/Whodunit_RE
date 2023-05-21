import { Container, FederatedEventHandler } from 'pixi.js';

export class Helper {
    static addTouchEndEvent(btn : Container, func : FederatedEventHandler) {
        btn.interactive = true;
        btn.onpointerdown = func;
    }
}