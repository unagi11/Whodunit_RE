
export class GameManager {

    private static _instance: GameManager;
    static get instance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }

    constructor() {

    }
}