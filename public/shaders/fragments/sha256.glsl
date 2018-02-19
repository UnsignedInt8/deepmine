#version 300 es
#pragma debug(on)

// Source from https://github.com/B-Con/crypto-algorithms/blob/master/sha256.c

#define SHA256_BLOCK_SIZE 32

#define ROTLEFT(a,b) (((a) << (b)) | ((a) >> (32-(b))))
#define ROTRIGHT(a,b) (((a) >> (b)) | ((a) << (32-(b))))

#define CH(x,y,z) (((x) & (y)) ^ (~(x) & (z)))
#define MAJ(x,y,z) (((x) & (y)) ^ ((x) & (z)) ^ ((y) & (z)))
#define EP0(x) (ROTRIGHT(x,2) ^ ROTRIGHT(x,13) ^ ROTRIGHT(x,22))
#define EP1(x) (ROTRIGHT(x,6) ^ ROTRIGHT(x,11) ^ ROTRIGHT(x,25))
#define SIG0(x) (ROTRIGHT(x,7) ^ ROTRIGHT(x,18) ^ ((x) >> 3))
#define SIG1(x) (ROTRIGHT(x,17) ^ ROTRIGHT(x,19) ^ ((x) >> 10))

precision highp float;

struct SHA256_CTX {
	uint data[64];
	uint datalen;
	uint bitlen;
	uint state[8];
};

const uint k[] = uint[] (
	0x428a2f98u,0x71374491u,0xb5c0fbcfu,0xe9b5dba5u,0x3956c25bu,0x59f111f1u,0x923f82a4u,0xab1c5ed5u,
	0xd807aa98u,0x12835b01u,0x243185beu,0x550c7dc3u,0x72be5d74u,0x80deb1feu,0x9bdc06a7u,0xc19bf174u,
	0xe49b69c1u,0xefbe4786u,0x0fc19dc6u,0x240ca1ccu,0x2de92c6fu,0x4a7484aau,0x5cb0a9dcu,0x76f988dau,
	0x983e5152u,0xa831c66du,0xb00327c8u,0xbf597fc7u,0xc6e00bf3u,0xd5a79147u,0x06ca6351u,0x14292967u,
	0x27b70a85u,0x2e1b2138u,0x4d2c6dfcu,0x53380d13u,0x650a7354u,0x766a0abbu,0x81c2c92eu,0x92722c85u,
	0xa2bfe8a1u,0xa81a664bu,0xc24b8b70u,0xc76c51a3u,0xd192e819u,0xd6990624u,0xf40e3585u,0x106aa070u,
	0x19a4c116u,0x1e376c08u,0x2748774cu,0x34b0bcb5u,0x391c0cb3u,0x4ed8aa4au,0x5b9cca4fu,0x682e6ff3u,
	0x748f82eeu,0x78a5636fu,0x84c87814u,0x8cc70208u,0x90befffau,0xa4506cebu,0xbef9a3f7u,0xc67178f2u
);

void sha256_transform(inout SHA256_CTX ctx, inout uint data[64])
{
	uint a, b, c, d, e, f, g, h, i, j, t1, t2, m[64];

	for (i = 0u, j = 0u; i < 16u; ++i, j += 4u)
		m[i] = (data[j] << 24u) | (data[j + 1u] << 16u) | (data[j + 2u] << 8u) | (data[j + 3u]);
	for ( ; i < 64u; ++i)
		m[i] = SIG1(m[i - 2u]) + m[i - 7u] + SIG0(m[i - 15u]) + m[i - 16u];

	a = ctx.state[0];
	b = ctx.state[1];
	c = ctx.state[2];
	d = ctx.state[3];
	e = ctx.state[4];
	f = ctx.state[5];
	g = ctx.state[6];
	h = ctx.state[7];

	for (i = 0u; i < 64u; ++i) {
		t1 = h + EP1(e) + CH(e,f,g) + k[i] + m[i];
		t2 = EP0(a) + MAJ(a,b,c);
		h = g;
		g = f;
		f = e;
		e = d + t1;
		d = c;
		c = b;
		b = a;
		a = t1 + t2;
	}

	ctx.state[0] += a;
	ctx.state[1] += b;
	ctx.state[2] += c;
	ctx.state[3] += d;
	ctx.state[4] += e;
	ctx.state[5] += f;
	ctx.state[6] += g;
	ctx.state[7] += h;
}

void sha256_init(inout SHA256_CTX ctx)
{
	ctx.datalen = 0u;
	ctx.bitlen = 0u;
	ctx.state[0] = 0x6a09e667u;
	ctx.state[1] = 0xbb67ae85u;
	ctx.state[2] = 0x3c6ef372u;
	ctx.state[3] = 0xa54ff53au;
	ctx.state[4] = 0x510e527fu;
	ctx.state[5] = 0x9b05688cu;
	ctx.state[6] = 0x1f83d9abu;
	ctx.state[7] = 0x5be0cd19u;
}

void sha256_update(inout SHA256_CTX ctx, uint data[2], uint len)
{
	uint i;

	for (i = 0u; i < len; ++i) {
		ctx.data[ctx.datalen] = data[i];
		ctx.datalen++;
		if (ctx.datalen == 64u) {
			sha256_transform(ctx, ctx.data);
			ctx.bitlen += 512u;
			ctx.datalen = 0u;
		}
	}
}


void sha256_final(inout SHA256_CTX ctx, inout uint hash[32])
{
	uint i;

	i = ctx.datalen;

	// Pad whatever data is left in the buffer.
	if (ctx.datalen < 56u) {
		ctx.data[i++] = 0x80u;
		while (i < 56u)
			ctx.data[i++] = 0x00u;
	}
	else {
		ctx.data[i++] = 0x80u;
		while (i < 64u)
			ctx.data[i++] = 0x00u;
		sha256_transform(ctx, ctx.data);
		
        for (int j = 0; j < 56; j++) {
            ctx.data[j] = 0u;
        }
	}

	// Append to the padding the total message's length in bits and transform.
	ctx.bitlen += ctx.datalen * 8u;
	ctx.data[63] = ctx.bitlen;
	ctx.data[62] = ctx.bitlen >> 8;
	ctx.data[61] = ctx.bitlen >> 16;
	ctx.data[60] = ctx.bitlen >> 24;
	ctx.data[59] = ctx.bitlen >> 32;
	ctx.data[58] = ctx.bitlen >> 40;
	ctx.data[57] = ctx.bitlen >> 48;
	ctx.data[56] = ctx.bitlen >> 56;
	sha256_transform(ctx, ctx.data);

	// Since this implementation uses little endian byte ordering and SHA uses big endian,
	// reverse all the bytes when copying the final state to the output hash.
	for (i = 0u; i < 4u; ++i) {
		hash[i]       = (ctx.state[0] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 4u]  = (ctx.state[1] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 8u]  = (ctx.state[2] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 12u] = (ctx.state[3] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 16u] = (ctx.state[4] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 20u] = (ctx.state[5] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 24u] = (ctx.state[6] >> (24u - i * 8u)) & 0x000000ffu;
		hash[i + 28u] = (ctx.state[7] >> (24u - i * 8u)) & 0x000000ffu;
	}
}

out vec4 result;
uniform sampler2D data;
uniform sampler2D coinb1;
uniform float coinb1Length;
uniform sampler2D coinb2;
uniform float coinb2Length;
uniform sampler2D merkleTree;
uniform float merkleTreeLength;
uniform uint version;
uniform uint bits;
uniform uint time;

void hash256() {
	SHA256_CTX ctx;
	sha256_init(ctx);

	for (float x = 0.0; x < coinb1Length; x++) {
		texture(coinb1, vec2(x / coinb1Length, 0));
	}
}

void main() {
	SHA256_CTX ctx;
	sha256_init(ctx);
	// sha256_

	vec4 v = texture(data, vec2(0, 0));
	// #error v.
	// result = vec4(1, 1, 0, 1);
	result = v;
}