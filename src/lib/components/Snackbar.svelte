<script lang="ts">
	import { snackbar } from '$lib/stores/SnackbarStore';
	import Portal from '$lib/components/Portal.svelte';
	import SnackbarMessage from './SnackbarMessage.svelte';
	import Cancel from './icon/Cancel.svelte';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';
</script>

<Portal>
	<div class="fixed top-5 left-1/2 z-toaster -translate-x-1/2">
		{#each $snackbar as content (content.id)}
			<div in:fly={{ opacity: 0, y: -100 }} out:fade={{ duration: 200 }} animate:flip>
				<div
					class="mb-2 inline-block rounded-lg px-5 py-4 text-lg font-bold"
					class:info={content.type === 'info'}
					class:warning={content.type === 'warning'}
					class:error={content.type === 'error'}
					class:success={content.type === 'success'}
				>
					<div class="flex gap-4">
						<SnackbarMessage message={content.message} />
						<button
							on:click={() => {
								snackbar.remove(content.id);
							}}><Cancel /></button
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Portal>

<style lang="postcss">
	.info {
		@apply bg-prim text-daisyBush;
	}
	.warning {
		@apply bg-goldenFizz text-scarlet;
	}
	.error {
		@apply bg-scarlet text-goldenFizz;
	}
	.success {
		@apply bg-robinEggBlue text-daisyBush;
	}
</style>
