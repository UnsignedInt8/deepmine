export const fs = `#version 300 es

precision mediump float;

in vec4 color;
out vec4 outColor;
uniform vec4 uColor;

void main(){
    outColor = vec4(0, 1, 0, 1);
}`;