<script lang="ts">
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import ThreeDots from '$lib/components/icon/Three-dots.svelte';
	import View from '$lib/components/icon/View.svelte';
	import Send from '$lib/components/icon/Send.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { convertDate, isLate } from '$lib/utils/dateHelpers';
	import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
	import type { Invoice } from 'src/global';

	export let invoice: Invoice;
	let isAdditionalMenuShowing = false;
	let isOptionsDisabled = false;

	const handleDelete = () => {
		console.log('deleting');
	};
	const handleEdit = () => {
		console.log('editing');
	};
	const handleSendInvoice = () => {
		console.log('sending invoice');
	};

	const getInvoiceLabel = () => {
		if (invoice.invoiceStatus === 'draft') {
			return 'draft';
		} else if (invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'sent';
		} else if (invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)) {
			isOptionsDisabled = true;
			return 'late';
		} else if (invoice.invoiceStatus === 'paid') {
			isOptionsDisabled = true;
			return 'paid';
		}
	};
</script>

<article
	class="invoice-table invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
>
	<div class="status"><Tag className="ml-auto lg:ml-0" label={getInvoiceLabel()} /></div>
	<div class="dueDate text-sm lg:text-lg">{convertDate(invoice.dueDate)}</div>
	<div class="invoiceNumber text-sm lg:text-lg">{invoice.invoiceNumber}</div>
	<div class="clientName truncate whitespace-nowrap text-base font-bold lg:text-xl">
		{invoice.client.name}
	</div>
	<div class="amount text-right font-mono text-sm font-bold lg:text-lg">
		${centsToDollars(sumLineItems(invoice.lineItems))}
	</div>
	<div class="lg:center viewButton hidden text-sm lg:text-lg">
		<a href="/" class="text-pastelPurple hover:text-daisyBush"><View /></a>
	</div>
	<div class="lg:center moreButton relative hidden text-sm lg:text-lg">
		<button
			class="text-pastelPurple hover:text-daisyBush"
			on:click={() => {
				isAdditionalMenuShowing = !isAdditionalMenuShowing;
			}}><ThreeDots /></button
		>
		{#if isAdditionalMenuShowing}
			<AdditionalOptions
				options={[
					{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
					{ label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
					{ label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: false }
				]}
			/>
		{/if}
	</div>
</article>

<style lang="postcss">
	.invoice-row {
		grid-template-areas: 'invoiceNumber invoiceNumber' 'clientName amount' 'dueDate status';
	}
	@media (min-width: 1024px) {
		.invoice-row {
			grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
		}
	}

	.invoice-row .status {
		grid-area: status;
	}
	.invoice-row .dueDate {
		grid-area: dueDate;
	}
	.invoice-row .invoiceNumber {
		grid-area: invoiceNumber;
	}
	.invoice-row .clientName {
		grid-area: clientName;
	}
	.invoice-row .amount {
		grid-area: amount;
	}
	.invoice-row .moreButton {
		grid-area: moreButton;
	}
	.invoice-row .viewButton {
		grid-area: viewButton;
	}
</style>
