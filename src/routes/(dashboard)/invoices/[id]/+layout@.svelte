<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Arrow from '$lib/components/icon/Arrow.svelte';

	let prevPage: string | undefined = undefined;

	afterNavigate((navigation) => {
		prevPage = navigation?.from?.url?.pathname;
	});
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			goto(prevPage || '/invoices');
		}
	}}
/>

<div class="h-full min-h-screen bg-whisper pt-16 pb-32 lg:pt-12">
	<main class="mx-auto min-h-screen max-w-screen-lg">
		<a href={prevPage ? prevPage : '/invoices'} class="fixed top-7 left-7 text-pastelPurple">
			<Arrow />
		</a>
		<slot />
	</main>
</div>
