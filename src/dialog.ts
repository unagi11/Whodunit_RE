import * as PIXI from 'pixi.js';
import { SceneBase, SceneData } from './base/scene';
import ui_dialog_json from '../static/ase/ui_dialog.json';

export class Dialog extends SceneBase {

    // use singleton pattern
    private static instance: Dialog;
    static getInstance(): Dialog {
        if (!Dialog.instance) {
            Dialog.instance = new Dialog(global.root);
        }
        return Dialog.instance;
    }
    
    text: PIXI.Text;
    panel : PIXI.Sprite;
    frame : PIXI.Sprite;

    constructor(parent : PIXI.Container) {
        super(ui_dialog_json, parent);

        this.panel = this.findObject('panel') as PIXI.Sprite;
        this.frame = this.findObject('frame') as PIXI.Sprite;

        // load font POSPilgi

        


        let text_style = {
            fontFamily : 'font/DunGeunMo.ttf',
            fontSize: 16,
            wordWrap : true,
            wordWrapWidth : 400
        }
        this.text = new PIXI.Text('test', text_style);
        this.text.position.set(20, 20);

        this.frame.addChild(this.text)

        this.panel.on('pointerdown', () => {
            this.root.visible = false;
        });
    }

    static show(text: string) {
        let instance = Dialog.getInstance();
        instance.text.text = text;
        instance.root.visible = true;
    }
}