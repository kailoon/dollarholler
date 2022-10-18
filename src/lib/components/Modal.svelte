<script lang="ts">
	import Overlay from '$lib/components/Overlay.svelte';
	import Portal from '$lib/components/Portal.svelte';
	import Cancel from '$lib/components/icon/Cancel.svelte';
	import { createEventDispatcher } from 'svelte';

	export let isVisible = false;

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
/>

{#if isVisible}
	<Portal>
		<Overlay />
		<div class="center fixed inset-0 z-modal">
			<div class="relative min-h-[230px] w-full max-w-[450px] rounded-lg bg-white px-10 py-7">
				<button
					class="absolute right-4 top-4 text-pastelPurple hover:text-daisyBush"
					on:click={() => dispatch('close')}><Cancel /></button
				>
				<slot><!-- optional fallback --></slot>
			</div>
		</div>
	</Portal>
{/if}
