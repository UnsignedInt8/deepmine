export const vs = `#version 300 es

in vec4 apos;
in float asize;
uniform vec4 utransform;
out vec4 color;

void main(){
    gl_Position = vec4(0, 0, 0, 0);
}`;