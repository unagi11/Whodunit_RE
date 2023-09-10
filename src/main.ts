import * as LOADER from './loader';
import * as PIXI from 'pixi.js';
import { Dialog } from './dialog';
import { SceneManager, SceneType } from './scene';

import hologram_src from './shader/hologram.frag';

/**
 * pixi application 생성
 */
export const app = new PIXI.Application({
	view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
	resolution: 1,
	autoDensity: true,
	backgroundColor: 0x555555,
	width: global.DESIGN_WIDTH,
	height: global.DESIGN_HEIGHT,
	antialias: false,
    resizeTo: window
});
global.app = app;

global.DESIGN_WIDTH = 480;
global.DESIGN_HEIGHT = 360;

global.RATIO_WIDTH = 4;
global.RATIO_HEIGHT = 3;

global.LETTER_WIDTH = 0;
global.LETTER_HEIGHT = 0;

global.target_fps = 30;
global.debug_mode = true;

global.root = new PIXI.Container();
app.stage.addChild(global.root);
const root = global.root as PIXI.Container;
root.name = 'root';

const global_filter = new PIXI.Filter(undefined, hologram_src);
root.filters = [global_filter];

let u_time = 0;
app.ticker.add(delta => {
    u_time += delta / 100;
    global_filter.uniforms.u_time = u_time;
})

main();

/** 메인 함수 */
async function main() {
	await LOADER.load_all();

	let resize = () => {
		let inner_ratio = window.innerWidth / window.innerHeight;
		let design_ratio = global.DESIGN_WIDTH / global.DESIGN_HEIGHT;

        let scale = 1.
		// 윈도우 width가 더 긴경우
		if (inner_ratio > design_ratio) {
			scale = window.innerHeight / global.DESIGN_HEIGHT;
			global.LETTER_WIDTH = window.innerWidth / 2 - ((window.innerHeight / global.RATIO_HEIGHT) * global.RATIO_WIDTH) / 2;
			global.LETTER_HEIGHT = 0;
		}
		// 윈도우 height가 더 긴경우
		else {
			scale = window.innerWidth / global.DESIGN_WIDTH;
			global.LETTER_WIDTH = 0;
			global.LETTER_HEIGHT = window.innerHeight / 2 - ((window.innerWidth / global.RATIO_WIDTH) * global.RATIO_HEIGHT) / 2;
        }

        global.REAL_WIDTH = global.DESIGN_WIDTH * scale;
        global.REAL_HEIGHT = global.DESIGN_HEIGHT * scale;

        global_filter.uniforms.u_resolution = [global.REAL_WIDTH, global.REAL_HEIGHT];

        root.transform.scale.set(scale);
        root.transform.position.set(global.LETTER_WIDTH, global.LETTER_HEIGHT);
        
        console.log (global.REAL_WIDTH, global.REAL_HEIGHT);
	}

	window.onresize = resize;
	resize();

    app.ticker.minFPS = global.target_fps;
    app.ticker.maxFPS = global.target_fps;

    let fps_text = new PIXI.Text('FPS', {fill: 0xffffff});
    app.stage.addChild(fps_text);
    app.ticker.add(() => {
        fps_text.text = 'FPS : ' + app.ticker.FPS.toFixed(0);
    })

    SceneManager.loadScene(SceneType.Lounge);
}