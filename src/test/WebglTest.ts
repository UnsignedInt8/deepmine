import { WebGLCore } from "../core/WebGLCore";
import { vs } from './vs';
import { fs } from './fs';

export class WebglTest extends WebGLCore {

    initContext() {

        // console.log(this.gl, this.program);
        let apos = this.gl.getAttribLocation(this.program, 'apos');
        let asize = this.gl.getAttribLocation(this.program, 'asize');
        let utransform = this.gl.getUniformLocation(this.program, 'utransform');

        // this.gl.vertexAttrib3f(apos, 0, 1, 0);
        this.gl.vertexAttrib1f(asize, 10.0);
        console.log(apos, asize, utransform);
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }

}

console.log(vs, fs);

// export const core = new WebglTest(vs, fs);