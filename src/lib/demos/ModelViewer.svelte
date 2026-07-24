<script lang="ts" module>
	import * as THREE from 'three';

	// The homestead-assets pipeline bakes every model's UVs against one shared
	// texture atlas; the GLBs ship without textures and get this material at load.
	let cachedAtlasMaterial: THREE.MeshStandardMaterial | null = null;

	function getAtlasMaterial(): THREE.MeshStandardMaterial {
		if (cachedAtlasMaterial) return cachedAtlasMaterial;

		const loader = new THREE.TextureLoader();
		const baseColor = loader.load('/mesh-x/atlas/atlas_base_color.webp');
		baseColor.colorSpace = THREE.SRGBColorSpace;
		const orm = loader.load('/mesh-x/atlas/atlas_orm.webp');
		const emission = loader.load('/mesh-x/atlas/atlas_emission.webp');
		for (const tex of [baseColor, orm, emission]) {
			tex.flipY = false;
			tex.wrapS = THREE.RepeatWrapping;
			tex.wrapT = THREE.RepeatWrapping;
		}

		cachedAtlasMaterial = new THREE.MeshStandardMaterial({
			map: baseColor,
			roughnessMap: orm,
			roughness: 1.0,
			metalnessMap: orm,
			metalness: 1.0,
			aoMap: orm,
			emissiveMap: emission,
			emissive: new THREE.Color(1, 1, 1)
		});
		return cachedAtlasMaterial;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	let {
		src,
		atlas = false,
		interactive = true
	}: { src: string; atlas?: boolean; interactive?: boolean } = $props();

	let container: HTMLDivElement;
	let load: ((url: string) => void) | undefined = $state();

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
		camera.position.set(10, 8, 10);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		container.appendChild(renderer.domElement);

		scene.add(new THREE.AmbientLight(0xffffff, 2.6));
		const key = new THREE.DirectionalLight(0xffffff, 2.8);
		key.position.set(3, 5, 4);
		scene.add(key);
		const fill = new THREE.DirectionalLight(0xffffff, 1.3);
		fill.position.set(-3, 2, -2);
		scene.add(fill);
		const rim = new THREE.DirectionalLight(0x8b5cf6, 1.1);
		rim.position.set(0, 3, -4);
		scene.add(rim);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.9;
		controls.enablePan = false;
		controls.minDistance = 4;
		controls.maxDistance = 34;
		controls.enabled = interactive;

		const loader = new GLTFLoader();
		let model: THREE.Object3D | null = null;
		let mixer: THREE.AnimationMixer | null = null;

		load = (url: string) => {
			loader.load(url, (gltf) => {
				if (model) scene.remove(model);
				model = gltf.scene;
				mixer = null;

				if (atlas) {
					const material = getAtlasMaterial();
					model.traverse((obj) => {
						const mesh = obj as THREE.Mesh;
						if (mesh.isMesh) mesh.material = material;
					});
				}

				// normalize size and center so every model frames the same
				const box = new THREE.Box3().setFromObject(model);
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				model.position.sub(center);
				const maxDim = Math.max(size.x, size.y, size.z) || 1;
				model.scale.setScalar(6 / maxDim);
				model.position.multiplyScalar(6 / maxDim);
				scene.add(model);
				controls.target.set(0, 0, 0);

				if (gltf.animations.length) {
					mixer = new THREE.AnimationMixer(model);
					for (const clip of gltf.animations) mixer.clipAction(clip).play();
				}
			});
		};

		const resize = () => {
			const { clientWidth: w, clientHeight: h } = container;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(container);

		const clock = new THREE.Clock();
		let raf = 0;
		const frame = () => {
			raf = requestAnimationFrame(frame);
			mixer?.update(clock.getDelta());
			controls.update();
			renderer.render(scene, camera);
		};
		frame();

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			controls.dispose();
			renderer.dispose();
			renderer.domElement.remove();
			if (model) {
				scene.remove(model);
				model.traverse((child) => {
					const mesh = child as THREE.Mesh;
					if (mesh.geometry) mesh.geometry.dispose();
					// shared atlas material is never disposed
				});
			}
		};
	});

	// reload when the parent swaps `src` (viewer tabs)
	$effect(() => {
		const url = src;
		load?.(url);
	});
</script>

<div class="viewer" bind:this={container}></div>

<style>
	.viewer {
		width: 100%;
		height: 100%;
	}

	.viewer :global(canvas) {
		display: block;
	}
</style>
