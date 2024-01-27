import { Container, Sprite } from 'pixi.js';
import { ObjectBase, ObjectData } from './object';
import { Dialog } from './dialog';
import { CursorType, Helper } from './helper';
import scene_entrance_json from '../static/scene_entrance.json';
import scene_lounge_json from '../static/scene_lounge.json';
import scene_restroom_json from '../static/scene_restroom.json';

export enum SceneLayer {
    BACKGROUND = 'BACKGROUND',
    Dialog = 'Dialog',
}

export enum SceneType {
    RESTROOM = 'RESTROOM',
    ENTRANCE = 'ENTRANCE',
    LOUNGE = 'LOUNGE',
    KITCHEN = 'KITCHEN',
    LIVINGROOM = 'LIVINGROOM',
    BEDROOM = 'BEDROOM',
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

        let n_scene = global.n_scene as Container;
        n_scene.removeChildren();

        switch (scene_type) {
            case SceneType.ENTRANCE:
                instance.current_scene = new SceneEntrance(scene_entrance_json, n_scene);
                break;

            case SceneType.LOUNGE:
                instance.current_scene = new SceneLounge(scene_lounge_json, n_scene);
                break;

            case SceneType.KITCHEN:
                break;

            case SceneType.RESTROOM:
                instance.current_scene = new SceneRestroom(scene_restroom_json, n_scene);
                break;

            case SceneType.LIVINGROOM:
                break;

            case SceneType.BEDROOM:
                break;
        }

        return instance.current_scene;
    }
}

abstract class SceneBase extends ObjectBase {
    abstract scene_type : SceneType;
}

export class SceneRestroom extends SceneBase {
    scene_type: SceneType = SceneType.RESTROOM;

    door : Sprite;
    mirror : Sprite;
    toilet : Sprite;
    bath : Sprite;

    constructor(data: ObjectData, parent : Container) {
        super(data, parent);

        this.door = this.findObject('door') as Sprite;
        this.mirror = this.findObject('mirror') as Sprite;
        this.toilet = this.findObject('toilet') as Sprite;
        this.bath = this.findObject('bath') as Sprite;

        Helper.addTouchEndEvent({
            container: this.door,
            func: () => Dialog.show('문이다.\n잠겨있다.'),
        });

        Helper.addTouchEndEvent({
            container: this.mirror,
            func: () => Dialog.show('거울이다.\n뭔가 묻어있는것 같다.'),
        });

        Helper.addTouchEndEvent({
            container: this.toilet,
            func: () => Dialog.show('변기다.\n뭔가 묻어있는것 같다.'),
        });

        Helper.addTouchEndEvent({
            container: this.bath,
            func: () => Dialog.show('욕조다.\n뭔가 묻어있는것 같다.'),
        });
    }
}

export class SceneEntrance extends SceneBase {
    scene_type: SceneType = SceneType.ENTRANCE;

    rug : Sprite
    calendar : Sprite
    frame : Sprite
    door_outside : Sprite
    door_lounge: Sprite;
    BG : Sprite
    
    constructor(data: ObjectData, parent : Container) {
        super(data, parent);

        this.rug = this.findObject('rug') as Sprite;
        this.calendar = this.findObject('calendar') as Sprite;
        this.frame = this.findObject('frame') as Sprite;
        this.door_outside = this.findObject('door_outside') as Sprite;
        this.door_lounge = this.findObject('door_lounge') as Sprite;
        this.BG = this.findObject('BG') as Sprite;

        Helper.addTouchEndEvent({
            container: this.frame,
            func: () => Dialog.show('웃고있는 남자의 그림이다.'),
        });
        Helper.addTouchEndEvent({
            container: this.door_outside,
            func: () => Dialog.show('내가 들어온 문이다.\n사건을 해결하기 전까지는 나갈수 없다.'),
        });

        Helper.addTouchEndEvent({
            container: this.calendar,
            func: () => Dialog.show('달력이다.\n오늘은 6월 1일이다.'),
            cursor: CursorType.ZOOM,
        });

        Helper.addTouchEndEvent({
            container: this.rug,
            func: () => Dialog.show(['양탄자다.', '뭔가 묻어있는것 같다.']),
        });

        Helper.addTouchChangeScene(this.door_lounge, SceneType.LOUNGE);
    }
}

export class SceneLounge extends SceneBase {
    scene_type: SceneType = SceneType.LOUNGE;
    door_entrance: Sprite;
    sofa: Sprite;

    constructor(data: ObjectData, parent : Container) {
        super(data, parent);

        this.door_entrance = this.findObject('door_entrance') as Sprite;
        this.sofa = this.findObject('sofa') as Sprite;

        Helper.addTouchChangeScene(this.door_entrance, SceneType.ENTRANCE);

        Helper.addTouchEndEvent({
			container: this.sofa,
			func: () => Dialog.show('소파다.\n누군가 앉아있었던 흔적이 남아있다.'),
			hitArea: [0, 40, 100, 0, 100, 100, 0, 100],
		});
    }
}