<script>
	import Search from '$lib/components/icon/Search.svelte';
</script>

<div class="relative flex w-full items-baseline">
	<div class="mr-2 mt-auto text-pastelPurple">
		<Search />
	</div>
	<input
		type="text"
		name="search"
		placeholder="Search by keyword"
		class="search w-full border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-base text-black outline-none focus:border-solid focus:border-b-lavenderIndigo md:w-[14rem] lg:w-72 lg:text-xl"
	/>
	<button class="font-sansSerif text-lg font-black text-pastelPurple lg:text-xl">Search</button>
	<!-- new invoice button -->
</div>
