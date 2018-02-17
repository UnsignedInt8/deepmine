
export abstract class WebGLCore {

    private canvas: HTMLCanvasElement;
    private gl: WebGLRenderingContext;

    constructor() {
        this.init();
    }

    private init() {
        let canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = canvas.height = 1;

        let gl = canvas.getContext('webgl2') as WebGLRenderingContext;
        gl.viewport(0, 0, 1, 1);

        this.canvas = canvas;
        this.gl = gl;
    }

    /**
     * Build WebGL execution environment
     * @param vs vertex shader program source code
     * @param fs fragment shader program source code
     */
    protected buildExec(vs: string, fs: string) {

    }
}