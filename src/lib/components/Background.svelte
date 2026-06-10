<script lang="ts">
	import { parallax } from '$lib/actions/parallax';
</script>

<div class="bg" aria-hidden="true">
	<div class="blob a" use:parallax={{ speed: -0.12 }}></div>
	<div class="blob b" use:parallax={{ speed: -0.2 }}></div>
	<div class="blob c" use:parallax={{ speed: -0.06 }}></div>
	<div class="blob d" use:parallax={{ speed: -0.16 }}></div>
	<div class="blob e" use:parallax={{ speed: -0.09 }}></div>
</div>

<style>
	.bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		animation: float 16s ease-in-out infinite alternate;
	}

	.a {
		width: 34rem;
		height: 34rem;
		background: var(--violet);
		top: -10rem;
		left: -8rem;
		opacity: 0.32;
	}

	.b {
		width: 30rem;
		height: 30rem;
		background: var(--pink);
		top: 35vh;
		right: -10rem;
		opacity: 0.26;
		animation-delay: -4s;
	}

	.c {
		width: 22rem;
		height: 22rem;
		background: var(--orange);
		top: 20vh;
		left: 38vw;
		opacity: 0.18;
		animation-delay: -8s;
	}

	.d {
		width: 28rem;
		height: 28rem;
		background: var(--cyan);
		bottom: -12rem;
		left: -6rem;
		opacity: 0.2;
		animation-delay: -12s;
	}

	.e {
		width: 24rem;
		height: 24rem;
		background: var(--pink);
		bottom: 6vh;
		right: 28vw;
		opacity: 0.14;
		animation-delay: -6s;
	}

	@keyframes float {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(3rem, -2.5rem) scale(1.12);
		}
	}
</style>
