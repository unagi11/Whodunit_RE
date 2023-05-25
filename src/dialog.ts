import * as PIXI from 'pixi.js';
import { ObjectBase, ObjectData } from './object';
import ui_dialog_json from '../static/object/ui_dialog.json';
import { Helper } from './helper';

export class Dialog extends ObjectBase {

    private static _instance: Dialog;
    static get instance(): Dialog {
        if (!Dialog._instance || !Dialog._instance.root.parent) {
            Dialog._instance = new Dialog(global.root);
        }
        return Dialog._instance;
    }
    
    text_box: PIXI.Text;
    panel : PIXI.Sprite;
    frame : PIXI.Sprite;

    constructor(parent : PIXI.Container) {
        super(ui_dialog_json, parent);

        this.panel = this.findObject('panel') as PIXI.Sprite;
        this.frame = this.findObject('frame') as PIXI.Sprite;

        let text_style = {
            fontFamily : 'DOSPilgi',
            fontSize: 16,
            lineHeight: 20,
            wordWrap : true,
            wordWrapWidth : 400
        }
        this.text_box = new PIXI.Text('test', text_style);
        this.text_box.position.set(20, 16);
        
        this.frame.addChild(this.text_box)
    }

    static show(texts: string | string[]) {
        if (typeof texts == 'string') texts = [texts];
        if ([...texts].length == 0) return;

        let index = 0;
        texts = [...texts];

        let instance = Dialog.instance;
        instance.root.visible = true;
        instance.text_box.text = texts[index];
        console.log(texts[index])
        
        Helper.addTouchEndEvent(instance.panel, _ => {
            index++;
            if (index >= texts.length) {
                instance.root.visible = false;
                return;
            }
            instance.text_box.text = texts[index];
            console.log(texts[index])
        })
    }
}