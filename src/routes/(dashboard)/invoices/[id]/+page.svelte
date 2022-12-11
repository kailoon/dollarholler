<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { convertDate } from '$lib/utils/dateHelpers';
	import type { Invoice } from 'src/global';
	import LineItemRows from '../LineItemRows.svelte';

	export let data: { invoice: Invoice };

	const printInvoice = () => {
		console.log('print invoice');
	};

	const copyLink = () => {
		console.log('copy link');
	};

	const payInvoice = () => {
		console.log('pay invoice');
	};

	const sendInvoice = () => {
		console.log('send invoice');
	};
</script>

<div class="fixed z-0 mb-16 flex w-full max-w-screen-lg justify-between">
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex items-center gap-4">
		<Button
			label="Print"
			style="outline"
			height="short"
			isAnimated={false}
			onClick={printInvoice}
		/>
		<Button label="Copy Link" height="short" onClick={copyLink} />
		<Button label="Pay Invoice" height="short" onClick={payInvoice} />
		<Button label="Send Invoice" height="short" onClick={sendInvoice} />
	</div>
</div>

<div
	class="relative top-32 z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice"
>
	<div class="col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="compressed fm"
		/>
	</div>

	<div class="col-span-2 col-start-5 pt-4">
		<div class="label">From</div>
		<p>Amy Dutton<br /></p>
	</div>

	<div class="col-span-3">
		<div class="label">Bill To:</div>
		<p>
			<strong>{data.invoice.client.name}</strong><br />
			{data.invoice.client.email}<br />
			{data.invoice.client.street} <br />
			{data.invoice.client.city}, {data.invoice.client.state}
			{data.invoice.client.zip}
		</p>
	</div>

	<div class="col-span-2 col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDate(data.invoice.dueDate)}</p>
	</div>
	<div class="col-span-3">
		<div class="label">Issue Date</div>
		<p>{convertDate(data.invoice.issueDate)}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>{data.invoice.subject}</p>
	</div>

	<div class="col-span-6">
		<!-- LineItems -->
		<LineItemRows
			lineItems={data.invoice.lineItems}
			isEditable={false}
			discount={data?.invoice?.discount || 0}
		/>
	</div>

	{#if data.invoice.notes}
		<div class="col-span-6">
			<div class="label">Notes</div>
			<p>{data.invoice.notes}</p>
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<p>
				{data.invoice.terms}
			</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-black;
	}
	p {
		@apply text-gray-600;
	}
</style>