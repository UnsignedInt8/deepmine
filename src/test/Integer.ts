import * as GPUJS from 'gpu.js';
// import { UInt32 } from '../lib/UInt32';

const GPU = new GPUJS();
function UInt32(b1: number, b2: number, b3: number, b4: number) {
    return [b1, b2, b3, b4];
}
GPU.addFunction(UInt32);

export const uint32func = GPU.createKernel(function (x) {
    return x;
}).setOutput([1]).setFloatOutput(false).setFloatOutputForce(false).setFloatTextures(false);
