type ParallaxParams = {
	/** Fraction of scroll distance the element travels; negative = drifts upward. */
	speed?: number;
	/** Spring stiffness — lower feels heavier and lags more. */
	stiffness?: number;
	/** Damping ratio (0–1). Below 1 the element overshoots and bounces back. */
	damping?: number;
};

/**
 * Shifts the element vertically as the page scrolls, driven by a damped
 * spring: the element chases the scroll with inertia, overshoots when the
 * scroll stops, and bounces back into place. Uses the `translate` property
 * so it composes with `transform`-based animations.
 */
export function parallax(node: HTMLElement, params: ParallaxParams = {}) {
	const speed = params.speed ?? 0.3;
	const stiffness = params.stiffness ?? 80;
	const dampingCoeff = 2 * (params.damping ?? 0.6) * Math.sqrt(stiffness);
	let current = 0;
	let velocity = 0;
	let frame = 0;
	let last = 0;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return {};
	}

	function tick(now: number) {
		const dt = Math.min((now - last) / 1000, 0.05);
		last = now;
		const target = window.scrollY * speed;
		const displacement = current - target;

		// Semi-implicit Euler integration of a damped spring
		velocity += (-stiffness * displacement - dampingCoeff * velocity) * dt;
		current += velocity * dt;

		if (Math.abs(current - target) < 0.1 && Math.abs(velocity) < 1) {
			current = target;
			velocity = 0;
			node.style.translate = `0 ${current}px`;
			frame = 0;
			return;
		}

		node.style.translate = `0 ${current}px`;
		frame = requestAnimationFrame(tick);
	}

	function kick() {
		if (!frame) {
			last = performance.now();
			frame = requestAnimationFrame(tick);
		}
	}

	window.addEventListener('scroll', kick, { passive: true });
	current = window.scrollY * speed;
	node.style.translate = `0 ${current}px`;

	return {
		destroy() {
			window.removeEventListener('scroll', kick);
			if (frame) cancelAnimationFrame(frame);
		}
	};
}
