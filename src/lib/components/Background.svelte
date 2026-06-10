<script lang="ts">
	import { parallax } from '$lib/actions/parallax';
</script>

<div class="bg" aria-hidden="true">
	<div class="blob a" use:parallax={{ speed: -0.12, stiffness: 90, damping: 0.62 }}></div>
	<div class="blob b" use:parallax={{ speed: -0.2, stiffness: 60, damping: 0.55 }}></div>
	<div class="blob c" use:parallax={{ speed: -0.06, stiffness: 130, damping: 0.7 }}></div>
	<div class="blob d" use:parallax={{ speed: -0.16, stiffness: 50, damping: 0.5 }}></div>
	<div class="blob e" use:parallax={{ speed: -0.09, stiffness: 110, damping: 0.65 }}></div>
	<div class="grain"></div>
</div>

<style>
	.bg {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	/* Radial gradients instead of blur(): same soft look, far cheaper to composite */
	.blob {
		position: absolute;
		background: radial-gradient(circle closest-side, var(--c), transparent 72%);
		animation: float 16s ease-in-out infinite alternate;
	}

	.a {
		--c: var(--violet);
		width: 50rem;
		height: 50rem;
		top: -16rem;
		left: -14rem;
		opacity: 0.45;
	}

	.b {
		--c: var(--pink);
		width: 44rem;
		height: 44rem;
		top: 35vh;
		right: -16rem;
		opacity: 0.35;
		animation-delay: -4s;
	}

	.c {
		--c: var(--orange);
		width: 32rem;
		height: 32rem;
		top: 18vh;
		left: 34vw;
		opacity: 0.26;
		animation-delay: -8s;
	}

	.d {
		--c: var(--cyan);
		width: 42rem;
		height: 42rem;
		bottom: -18rem;
		left: -12rem;
		opacity: 0.3;
		animation-delay: -12s;
	}

	.e {
		--c: var(--pink);
		width: 36rem;
		height: 36rem;
		bottom: 2vh;
		right: 24vw;
		opacity: 0.2;
		animation-delay: -6s;
	}

	/* Subtle noise kills gradient banding on dark backgrounds */
	.grain {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-repeat: repeat;
		opacity: 0.05;
		mix-blend-mode: overlay;
	}

	@keyframes float {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(3rem, -2.5rem) scale(1.12);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blob {
			animation: none !important;
		}
	}
</style>
