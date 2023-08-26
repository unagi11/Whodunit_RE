import * as PIXI from 'pixi.js';
import { SceneManager, SceneType } from './scene';
import { app } from './main';

export enum CursorType {
    DEFAULT = 'default',
    HELP = 'help',
    MOVE = 'alias',
    ZOOM = 'zoom-in',
}

export interface TouchArgs {
    container : PIXI.Container;
    func : PIXI.FederatedEventHandler;
    cursor ?: CursorType;
    hitArea ?: number[];
}

export class Helper {

    static addTouchChangeScene(container : PIXI.Container, scene_type : SceneType) {
        Helper.addTouchEndEvent({
            container,
            func: _ => SceneManager.loadScene(scene_type),
            cursor: CursorType.MOVE,
        })
    }

    static addTouchEndEvent(args : TouchArgs) {
        let { container, func, cursor, hitArea } = args;

        container.interactive = true;
        container.onpointerdown = e => {
            func(e);
            document.body.style.cursor = CursorType.DEFAULT;
        };

        container.onpointermove = (e) => {
			document.body.style.cursor = cursor || CursorType.HELP;
		};
        container.onpointerout = e => {
            document.body.style.cursor = CursorType.DEFAULT;
        }

        // container.cursor = cursor || CursorType.HELP;
        if (hitArea) container.hitArea = new PIXI.Polygon(hitArea);
        if (global.debug_mode) {
            hitArea = hitArea || [0, 0, container.width, 0, container.width, container.height, 0, container.height];
            
            const graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0xFF0000, 1);
            graphics.drawPolygon(hitArea);
            container.addChild(graphics);
        }
    }
}