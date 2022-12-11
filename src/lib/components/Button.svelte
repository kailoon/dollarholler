<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let label: string;
	export let onClick: () => void;
	export let isAnimated = true;
	export let style:
		| 'primary'
		| 'secondary'
		| 'destructive'
		| 'outline'
		| 'textonly'
		| 'textonlydescructive' = 'primary';
	export let height: 'short' | 'regular' = 'regular';
	export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
	export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
	class="button"
	class:isAnimated
	class:primary={style === 'primary'}
	class:secondary={style === 'secondary'}
	class:destructive={style === 'destructive'}
	class:outline={style === 'outline'}
	class:textonly={style === 'textonly'}
	class:textonlydescructive={style === 'textonlydescructive'}
	class:short={height === 'short'}
	on:click|preventDefault={() => onClick()}
>
	{#if iconLeft}
		<div class="mr-2"><svelte:component this={iconLeft} /></div>
	{/if}
	{label}
	{#if iconRight}
		<div class="mr-2"><svelte:component this={iconRight} /></div>
	{/if}
</button>

<style lang="postcss">
	.isAnimated {
		@apply translate-y-0 shadow-colored transition-all hover:-translate-y-2  hover:shadow-coloredHover;
	}
	.primary {
		@apply bg-lavenderIndigo text-white;
	}
	.secondary {
		@apply bg-gallery text-daisyBush;
	}
	.destructive {
		@apply bg-scarlet text-goldenFizz;
	}
	.textonly {
		@apply bg-transparent px-0 text-lavenderIndigo underline hover:no-underline;
	}
	.outline {
		@apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
	}
	.textonlydescructive {
		@apply bg-transparent px-0 text-scarlet no-underline hover:underline;
	}
	.short {
		@apply !py-1;
	}
</style>
