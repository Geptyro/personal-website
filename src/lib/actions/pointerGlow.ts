/**
 * Tracks the pointer over the element and exposes its position as
 * --glow-x / --glow-y CSS custom properties, for spotlight hover effects.
 */
export function pointerGlow(node: HTMLElement) {
	function onMove(event: PointerEvent) {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
		node.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
	}

	node.addEventListener('pointermove', onMove);
	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
		}
	};
}
