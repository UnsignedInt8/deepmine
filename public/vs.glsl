#version 300 es

in vec4 apos;
in float asize;
uniform vec4 utransform;
out vec4 color;

void main(){
    gl_Position = apos + utransform;
    gl_PointSize = asize;
    color = gl_Position;
}