import * as PIXI from 'pixi.js';
import { ObjectBase, ObjectData } from './object';
import ui_dialog_json from '../static/ui_dialog.json';
import { CursorType, Helper } from './helper';

export class Dialog extends ObjectBase {

    private static _instance: Dialog;
    text_update ?: (delta: number) => void;
    get texting () { return !!this.text_update; }

    static get instance(): Dialog {
        if (!Dialog._instance || !Dialog._instance.root.parent) {
            Dialog._instance = new Dialog(global.root);
        }
        return Dialog._instance;
    }
    
    text_box: PIXI.Text;
    close : PIXI.Sprite;
    frame : PIXI.Sprite;

    constructor(parent : PIXI.Container) {
        super(ui_dialog_json, parent);

        this.close = this.findObject('close') as PIXI.Sprite;
        this.frame = this.findObject('frame') as PIXI.Sprite;

        let text_style = {
            fontFamily : 'Silver',
            fontSize: 64,
            lineHeight: 64,
            wordWrap : true,
            wordWrapWidth : 1000
        }
        this.text_box = new PIXI.Text('test', text_style);
        this.text_box.position.set(30, 30);
        
        this.frame.addChild(this.text_box)
    }

    static show(texts: string | string[]) {
        if (typeof texts == 'string') texts = [texts];
        if ([...texts].length == 0) return;

        let index = 0;
        texts = [...texts];

        Dialog.instance.root.visible = true;
        Dialog.play(texts[index]);
        
        Helper.addTouchEndEvent(
            {
                container: Dialog.instance.close,
                cursor: CursorType.DEFAULT,
                func: _ => {
                    if (Dialog.instance.texting) Dialog.end(texts[index]);
                    else if (index < texts.length - 1) Dialog.play(texts[++index]);
                    else Dialog.instance.root.visible = false;
                }
            }
        )
    }

    static play(text : string) {
        let global_app = global.app as PIXI.Application;
        let time = 0;

        let text_update = (delta : number) => {
            time += delta / 2;
            let len = Math.floor(time);
            Dialog.instance.text_box.text = text.slice(0, len);

            if (len >= text.length) this.end(text);
        }

        global_app.ticker.add(text_update);
        Dialog.instance.text_update = text_update;
        console.log(text)
    }

    static end(text : string) {
        if (!Dialog.instance.text_update) return;
        let global_app = global.app as PIXI.Application;

        Dialog.instance.text_box.text = text;
        global_app.ticker.remove(Dialog.instance.text_update);
        Dialog.instance.text_update = undefined;
    }
}