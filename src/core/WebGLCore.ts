import { WebGLUtils } from "./WebGLUtils";

export abstract class WebGLCore {

    protected canvas: HTMLCanvasElement;
    protected gl: WebGLRenderingContext;
    protected program: WebGLProgram;

    constructor(vs: string, fs: string) {
        this.init();
        this.initProgram(vs, fs);
        this.initContext();
    }

    private init() {
        let canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = canvas.height = 1;

        let gl = canvas.getContext('webgl2') as WebGLRenderingContext;
        
        this.canvas = canvas;
        this.gl = gl;
    }

    /**
     * Build WebGL execution environment
     * @param vs vertex shader program source code
     * @param fs fragment shader program source code
     */
    private initProgram(vs: string, fs: string) {
        let shaders = [WebGLUtils.createShader(this.gl, this.gl.VERTEX_SHADER, vs)!, WebGLUtils.createShader(this.gl, this.gl.FRAGMENT_SHADER, fs)!];
        let program = WebGLUtils.createProgram(this.gl, shaders)!;

        this.gl.useProgram(program);
        this.program = program;
    }

    abstract initContext();
}