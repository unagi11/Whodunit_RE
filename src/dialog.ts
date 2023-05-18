import * as PIXI from 'pixi.js';

export class Dialog {

    // use singleton pattern
    private static instance: Dialog;
    static getInstance(): Dialog {
        if (!Dialog.instance) {
            Dialog.instance = new Dialog();
        }
        return Dialog.instance;
    }

    dialog: PIXI.Container;
    dialogBG: PIXI.Sprite;
    dialogText: PIXI.Text;

    constructor() {

        this.dialog = new PIXI.Container();
        this.dialogBG = new PIXI.Sprite();
        this.dialogText = new PIXI.Text();

        this.dialog.addChild(this.dialogBG);
        this.dialogBG.addChild(this.dialogText);

        // 클릭하면 끄기
        this.dialogBG.interactive = true;
        this.dialogBG.on('pointerdown', () => {
            this.dialog.visible = false;
        });
    }

    show(text: string) {
        this.dialogText.text = text;
        this.dialog.visible = true;
    }
}