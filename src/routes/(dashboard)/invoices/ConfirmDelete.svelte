<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { deleteInvoice } from '$lib/stores/InvoiceStore';
	import { centsToDollars, sumLineItems } from '$lib/utils/moneyHelpers';
	import type { Invoice } from 'src/global';
	import { createEventDispatcher } from 'svelte';
	import { snackbar } from '$lib/stores/SnackbarStore';

	export let isModalShowing = false;
	export let invoice: Invoice;
	const dispatch = createEventDispatcher();
</script>

<!-- Modal -->
<Modal isVisible={isModalShowing} on:close>
	<div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
		<div class="text-center text-xl font-bold text-daisyBush">
			Are you sure you want to delete this invoice to <span class="text-scarlet"
				>{invoice.client.name}</span
			>
			for
			<span class="text-scarlet">{`${centsToDollars(sumLineItems(invoice.lineItems))}`}</span> ?
		</div>
		<div class="flex gap-4">
			<Button
				label="Cancel"
				onClick={() => {
					dispatch('close');
				}}
				isAnimated={false}
				style="secondary"
			/>
			<Button
				label="Yes, Delete It"
				onClick={() => {
					deleteInvoice(invoice);
					dispatch('close');
					snackbar.send({
						message: 'Your invoice was successfully deleted',
						type: 'success'
					});
				}}
				isAnimated={false}
				style="destructive"
			/>
		</div>
	</div>
</Modal>
