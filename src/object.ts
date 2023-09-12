import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';

export class ObjectBase {
	data: ObjectData;
	root: PIXI.Container;
	objects: { [key: string]: Container } = {};

	constructor(data: ObjectData, parent : PIXI.Container) {
		this.data = data;

        this.root = new PIXI.Container();
        this.root.name = data.meta.image;

		Object.values(data.frames).forEach((frame, index) => {
			const layer = data.meta.layers[index];
			const name = layer.name;

			let texture = PIXI.BaseTexture.from(`${data.meta.image}`);
			let rect = frame.frame;
			let rectangle = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);
			let trimmed_texture = new PIXI.Texture(texture, rectangle);

			// 이미지의 일부분을 잘라내어 Sprite 생성
			let sprite = new PIXI.Sprite(trimmed_texture);
			sprite.transform.position.set(frame.spriteSourceSize.x, frame.spriteSourceSize.y);
			sprite.name = name;

			this.objects[name] = sprite;

			// 스테이지에 Sprite 추가
			this.root.addChild(sprite);
		});

        parent.addChild(this.root);
	}
    
	findObject(name: string): Container {
		return this.objects[name];
	}
}

export interface Frames {
	[key: string]: {
		frame: {
			x: number;
			y: number;
			w: number;
			h: number;
		};
		spriteSourceSize: {
			x: number;
			y: number;
			w: number;
			h: number;
		};
		sourceSize: {
			w: number;
			h: number;
		};
	};
}

export interface Meta {
	app: string;
	version: string;
	image: string;
	format: string;
	size: {
		w: number;
		h: number;
	};
	scale: string;
	layers: Layer[];
}

export interface Layer {
	name: string;
	opacity: number;
	blendMode: string;
	data?: string;
}

export interface ObjectData {
	frames: Frames;
	meta: Meta;
}
