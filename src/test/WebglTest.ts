import { WebGLCore } from "../core/WebGLCore";
import { vs } from './vs';
import { fs } from './fs';

export class WebglTest extends WebGLCore {

}

export const core = new WebglTest(vs, fs);