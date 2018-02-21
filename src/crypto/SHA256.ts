import { WebGLCore } from "../core/WebGLCore";

export class SHA256 extends WebGLCore {

    protected initContext() {
    }


    hash(data?: Uint8Array) {
        let dataLoc = this.gl.getUniformLocation(this.program, 'data')!;
        let lengthLoc = this.gl.getUniformLocation(this.program, 'dataLength')!;

        let textureBuffer = new Float32Array(10000);
        for (let i = 0; i < textureBuffer.length; i++) {
            // let color = Math.floor((Math.random()) * 255) + 0.001;
            // textureBuffer[i] = color / 1000;
            textureBuffer[i] = 0;
            // console.log(color, textureBuffer[i]);
        }

        this.gl.uniform1i(lengthLoc, textureBuffer.length);

        console.log(textureBuffer);
        let time = Date.now();
        let texture = this.gl.createTexture()!;
        const RGBA32F = 34836;

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, RGBA32F, 100, textureBuffer.length / 4 / 100, 0, this.gl.RGBA, this.gl.FLOAT, textureBuffer);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.uniform1i(dataLoc, 0);

        this.gl.drawArrays(this.gl.POINTS, 0, 1);

        console.log(Date.now() - time);

        let readBuf = new Uint8Array(4);
        this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, readBuf);

        console.log(readBuf, Buffer.from(readBuf.buffer).toString('hex'), Date.now() - time, 'ms');
        setTimeout(() => {
        }, 1000);
        this.gl.deleteTexture(texture);
    }

}