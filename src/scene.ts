import { Container, Sprite } from 'pixi.js';
import { ObjectBase, ObjectData } from './object';
import { Dialog } from './dialog';
import { Helper } from './helper';
import sc_entrance_data from '../static/ase/scene_entrance.json';

export enum SceneType {
    Entrance = 'Entrance',
    Hallway = 'Hallway',
    Kitchen = 'Kitchen',
    BathRoom = 'BathRoom',
    LivingRoom = 'LivingRoom',
    BedRoom = 'BedRoom',
}

export class SceneManager {

    private static _instance: SceneManager;
    static get instance(): SceneManager {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager();
        }
        return SceneManager._instance;
    }

    current_scene ?: SceneBase;

    static loadScene(scene_type : SceneType) {
        let instance = SceneManager.instance;

        if (scene_type == instance.current_scene?.scene_type) return instance.current_scene;

        global.root.removeChildren();

        switch (scene_type) {
            case SceneType.Entrance:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;

            case SceneType.Hallway:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;

            case SceneType.Kitchen:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;

            case SceneType.BathRoom:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;

            case SceneType.LivingRoom:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;

            case SceneType.BedRoom:
                instance.current_scene = new SceneEntrance(sc_entrance_data, global.root);
                break;
        }

        return instance.current_scene;
    }
}

abstract class SceneBase extends ObjectBase {
    abstract scene_type : SceneType;
}

export class SceneEntrance extends SceneBase {
    scene_type: SceneType = SceneType.Entrance;

    rug : Sprite
    calendar : Sprite
    frame : Sprite
    door : Sprite
    BG : Sprite
    
    constructor(data: ObjectData, parent : Container) {
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