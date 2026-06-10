type ParallaxParams = { speed?: number };

/**
 * Shifts the element vertically as the page scrolls, at a fraction of the
 * scroll speed — lower `speed` = further away. Uses the `translate` property
 * so it composes with `transform`-based animations on the same element.
 */
export function parallax(node: HTMLElement, params: ParallaxParams = {}) {
	const speed = params.speed ?? 0.3;
	let frame = 0;

	function update() {
		frame = 0;
		node.style.translate = `0 ${window.scrollY * speed}px`;
	}

	function onScroll() {
		if (!frame) frame = requestAnimationFrame(update);
	}

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return {};
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	update();

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		}
	};
}
