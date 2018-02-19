import { WebGLCore } from "../core/WebGLCore";

export class SHA256 extends WebGLCore {

    private dataLoc: WebGLUniformLocation;

    protected initContext() {
        this.dataLoc = this.gl.getUniformLocation(this.program, 'data')!;
    }


    hash(data?: Uint8Array) {
        let textureBuffer = new Float32Array(4);
        for (let i = 0; i < textureBuffer.length; i++) {
            let color = (Math.random()) * 255;
            textureBuffer[i] = color / 1000;
            console.log(color, textureBuffer[i]);
        }
        // console.log(textureBuffer);
        let texture = this.gl.createTexture()!;
        const RGBA32F = 34836;

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, RGBA32F, textureBuffer.length / 4, 1, 0, this.gl.RGBA, this.gl.FLOAT, textureBuffer);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.uniform1i(this.dataLoc, 0);

        this.gl.drawArrays(this.gl.POINTS, 0, 1);

        let readBuf = new Uint8Array(4);
        this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, readBuf);

        let flBuf = new Float32Array(4);
        this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.FLOAT, flBuf);
        console.log(readBuf,flBuf);
        this.gl.deleteTexture(texture);
    }

}