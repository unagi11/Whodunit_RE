import * as LOADER from './loader';
import * as PIXI from 'pixi.js';
import scene_entrance_json from '../static/ase/scene_entrance.json';
import { SceneEntrance } from './s_entrance';

/**
 * pixi application 생성
 */
export const app = new PIXI.Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: 1,
	autoDensity: true,
	backgroundColor: 0x331111,
	width: global.DESIGN_WIDTH,
	height: global.DESIGN_HEIGHT,
	antialias: false,
});
global.app = app;

global.DESIGN_WIDTH = 480;
global.DESIGN_HEIGHT = 360;

global.RATIO_WIDTH = 4;
global.RATIO_HEIGHT = 3;

global.LETTER_WIDTH = 0;
global.LETTER_HEIGHT = 0;

global.root = new PIXI.Container();
app.stage.addChild(global.root);

// main 함수 실행
main();

/**
 * 메인 함수 실행
 */
async function main() {
	await LOADER.load_all();

	function resize() {
		let inner_ratio = window.innerWidth / window.innerHeight;
		let design_ratio = global.DESIGN_WIDTH / global.DESIGN_HEIGHT;
		let root = global.root as PIXI.Container;

		// 윈도우 width가 더 긴경우
		if (inner_ratio > design_ratio) {
			let scale = window.innerHeight / global.DESIGN_HEIGHT;
			global.LETTER_WIDTH = window.innerWidth / 2 - ((window.innerHeight / global.RATIO_HEIGHT) * global.RATIO_WIDTH) / 2;
			global.LETTER_HEIGHT = 0;

			root.transform.scale.set(scale);
			root.transform.position.set(global.LETTER_WIDTH, global.LETTER_HEIGHT);
			app.renderer.resize(window.innerWidth, window.innerHeight);
		}
		// 윈도우 height가 더 긴경우
		else {
			let scale = window.innerWidth / global.DESIGN_WIDTH;
			global.LETTER_WIDTH = 0;
			global.LETTER_HEIGHT = window.innerHeight / 2 - ((window.innerWidth / global.RATIO_WIDTH) * global.RATIO_HEIGHT) / 2;

			root.transform.scale.set(scale);
			root.transform.position.set(global.LETTER_WIDTH, global.LETTER_HEIGHT);
			app.renderer.resize(window.innerWidth, window.innerHeight);
		}
	}

	window.onresize = resize;
	resize();

	let s_entrance = new SceneEntrance(scene_entrance_json, global.root);
}