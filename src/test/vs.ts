export const vs = `#version 300 es

in vec4 a_pos;
in float a_size;
uniform vec4 utransform;
out vec4 color;

void main(){
    gl_Position = vec4(0, 0, 0, 0);
    gl_PointSize = 10.0;
}`;