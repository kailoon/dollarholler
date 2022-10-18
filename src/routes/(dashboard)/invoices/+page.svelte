<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import { loadInvoices, invoices } from '$lib/stores/InvoiceStore';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
	import supabase from '$lib/utils/supabase';
	import { onMount } from 'svelte';
	import BlankState from './BlankState.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';

	onMount(async () => {
		loadInvoices();

		const { data, error } = await supabase.from('Client').select('*');
	});
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- search field -->
	{#if $invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}
	<div>
		<Button label="+ Invoice" onClick={() => {}} />
	</div>
</div>

<!-- Invoice list -->
<div>
	<!-- Invoices -->
	{#if $invoices === null}
		Loading...
	{:else if $invoices.length <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader />
		{#each $invoices as invoice}
			<div class="flex flex-col-reverse">
				<InvoiceRow {invoice} />
			</div>
		{/each}
		<footer>
			<CircledAmount label="Total" amount={`$${centsToDollars(sumInvoices($invoices))}`} />
		</footer>
	{/if}
</div>
