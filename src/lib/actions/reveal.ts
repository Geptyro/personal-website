type RevealParams = { delay?: number };

/**
 * Fades the element in (with a slight upward slide) when it enters the viewport.
 * `delay` (ms) staggers items revealed together.
 */
export function reveal(node: HTMLElement, params: RevealParams = {}) {
	const delay = params.delay ?? 0;
	node.classList.add('reveal');
	if (delay) node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('reveal-visible');
					observer.disconnect();
					// Clear the stagger delay once revealed so hover transitions stay snappy.
					setTimeout(() => {
						node.style.transitionDelay = '';
					}, delay + 700);
				}
			}
		},
		{ rootMargin: '0px 0px -60px 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
