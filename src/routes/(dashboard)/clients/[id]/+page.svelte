<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Search from '$lib/components/Search.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import { isLate } from '$lib/utils/dateHelpers';
	import { centsToDollars, sumInvoices } from '$lib/utils/moneyHelpers';
	import BlankState from '../../invoices/BlankState.svelte';
	import InvoiceRow from '../../invoices/InvoiceRow.svelte';
	import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
	import ClientForm from '../ClientForm.svelte';

	let isClientFormShowing = false;
	let isEditingCurrentCLient = false;

	export let data: { client: Client };

	const editClient = () => {
		isEditingCurrentCLient = true;
		isClientFormShowing = true;
	};

	const closePanel = () => {
		isClientFormShowing = false;
	};

	const getDraft = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';

		const draftInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'draft'
		);
		return centsToDollars(sumInvoices(draftInvoices));
	};

	const getPaid = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';

		const paidInvoices = data.client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');
		return centsToDollars(sumInvoices(paidInvoices));
	};

	const getTotalOvderdue = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';

		const paidInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
		);
		return centsToDollars(sumInvoices(paidInvoices));
	};

	const getTotalOutstanding = (): string => {
		if (!data.client.invoices || data.client.invoices.length < 1) return '0.00';

		const paidInvoices = data.client.invoices.filter(
			(invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)
		);
		return centsToDollars(sumInvoices(paidInvoices));
	};
</script>

<svelte:head>
	<title>{data.client.name} | The Dollar Holler</title>
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
	<h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data.client.name}</h1>
	<Button isAnimated={false} style="textonly" iconLeft={Edit} onClick={editClient} label="Edit" />
</div>

<!-- summary -->
<div class="mb-10 grid gap-4 rounded-lg bg-gallery py-7 px-10 lg:grid-cols-4">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>{getTotalOvderdue()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>{getTotalOutstanding()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>{getDraft()}</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>{getPaid()}</div>
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
