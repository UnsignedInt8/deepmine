export class WebGLUtils {

    static createShader(gl: WebGLRenderingContext, type: number, code: string) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw gl.getShaderInfoLog(shader);
        }

        return shader;
    }

    static createProgram(gl: WebGLRenderingContext) {
        let program = gl.createProgram;
    }
}