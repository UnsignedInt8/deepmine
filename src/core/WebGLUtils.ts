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

    static createProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]) {
        let program = gl.createProgram();
        shaders.forEach(s => gl.attachShader(program, s));
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(program);
        }

        return program;
    }
}