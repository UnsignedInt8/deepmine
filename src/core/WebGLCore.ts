/**
 * WebGL Core Class
 * 
 * Documents:
 * 1. https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
 */

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
        canvas.width = canvas.height = 10;

        let gl = canvas.getContext('webgl2') as WebGLRenderingContext;

        this.canvas = canvas;
        this.gl = gl;

        document.body.appendChild(canvas);
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

    protected abstract initContext();

    protected putUniformData(activeTexture: number, texIndex: number, field: string, data: ArrayBufferView) {
        const RGBA32F = 34836;

        let tex = this.gl.createTexture();
        let loc = this.gl.getUniformLocation(this.program, field);

        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, RGBA32F, 100, Math.floor(data.byteLength / 4 / 100), 0, this.gl.RGBA, this.gl.FLOAT, data);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.uniform1i(loc, texIndex);

        return tex;
    }
}