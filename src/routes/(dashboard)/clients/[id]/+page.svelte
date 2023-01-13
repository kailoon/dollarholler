<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Search from '$lib/components/Search.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import { loadInvoices } from '$lib/stores/InvoiceStore';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
	import supabase from '$lib/utils/supabase';
	import { onMount } from 'svelte';
	import BlankState from '../../invoices/BlankState.svelte';
	import InvoiceRow from '../../invoices/InvoiceRow.svelte';
	import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
	import ClientForm from '../ClientForm.svelte';

	let isClientFormShowing = false;
	let isEditingCurrentCLient = false;

	onMount(async () => {
		loadInvoices();

		const { data, error } = await supabase.from('Client').select('*');
	});

	const editClient = () => {
		isEditingCurrentCLient = true;
		isClientFormShowing = true;
	};

	const closePanel = () => {
		isClientFormShowing = false;
	};

	export let data: Client;
</script>

<svelte:head>
	<title>Client | The Dollar Holler</title>
</svelte:head>

<div
	class="mb-7 flex flex-col-reverse items-start justify-between gap-y-6 md:flex-row md:items-center md:gap-y-4 lg:mb-16"
>
	<!-- search field -->
	{#if data.client.invoices && data.client.invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}
	<div>
		<Button
			label="+ Client"
			onClick={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<div class="mb-7 flex w-full items-center justify-between">
	<h1 class="font-sansSerif text-3xl font-bold text-daisyBush">Compressed.fm</h1>
	<Button isAnimated={false} style="textonly" iconLeft={Edit} onClick={editClient} label="Edit" />
</div>

<!-- summary -->
<div class="mb-10 grid gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
</div>

<!-- Invoice list -->
<div>
	<!-- Invoices -->
	{#if data.client.invoices === null}
		Loading...
	{:else if data.client.invoices.length <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader />
		{#each data.client.invoices as invoice}
			<div class="flex flex-col-reverse">
				<InvoiceRow {invoice} />
			</div>
		{/each}
		<footer>
			<CircledAmount
				label="Total"
				amount={`$${centsToDollars(sumInvoices(data.client.invoices))}`}
			/>
		</footer>
	{/if}
</div>

<!-- slidepanel -->
{#if isClientFormShowing}
	<!-- content here -->
	<SlidePanel on:closePanel={closePanel}
		><ClientForm
			{closePanel}
			formStatus={isEditingCurrentCLient ? 'edit' : 'create'}
			client={isEditingCurrentCLient ? data.client : undefined}
		/></SlidePanel
	>
{/if}

<style lang="postcss">
	.summary-block {
		@apply text-center;
	}
	.label {
		@apply text-sm font-black text-[#A397aD];
	}

	sup {
		@apply relative -top-2;
	}

	.number {
		@apply truncate text-[2.5rem] font-black text-purple;
	}
</style>
