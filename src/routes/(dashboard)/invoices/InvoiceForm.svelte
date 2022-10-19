<script>
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import LineItemRows from './LineItemRows.svelte';

	const blankLineItem = [
		{
			id: '1',
			description: '',
			quantity: 0,
			amount: 0
		}
	];
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold tracking-tight">Add an Invoice</h2>

<form class="grid md:grid-cols-6 md:gap-x-5">
	<!-- client -->
	<div class="field md:col-span-2">
		<label for="client">Client</label>
		<select name="client" id="client">
			<option value="zeal">ZEAL</option>
		</select>
	</div>
	<div class="field flex items-end gap-x-4 md:col-span-2">
		<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
		<Button label="+ Client" onClick={() => {}} style="outline" isAnimated={false} />
	</div>
	<!-- invoice id -->
	<div class="field md:col-span-2">
		<label for="id">Invoice Id</label>
		<input type="number" name="id" />
	</div>
	<!-- due date -->
	<div class="field md:col-span-2">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" />
	</div>
	<!-- issue date -->
	<div class="field md:col-span-2 md:col-start-5">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" />
	</div>
	<!-- subject -->
	<div class="field md:col-span-6">
		<label for="subject">Subject</label>
		<input type="text" name="subject" />
	</div>
	<!-- line items -->
	<div class="field md:col-span-6"><LineItemRows lineItems={blankLineItem} /></div>
	<!-- notes -->
	<div class="field md:col-span-6">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice)</span></label
		><textarea name="notes" id="notes" />
	</div>
	<!-- terms -->
	<div class="field md:col-span-6">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions.)</span></label
		><textarea name="terms" id="terms" />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>
	<!-- buttons -->
	<div class="field md:col-span-2">
		<!-- only visible if editing -->
		<Button
			label="Delete"
			style="textonlydescructive"
			isAnimated={false}
			onClick={() => {}}
			iconLeft={Trash}
		/>
	</div>
	<div class="field flex justify-end gap-x-4 md:col-span-4">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
		<Button label="Save" style="primary" isAnimated={false} onClick={() => {}} />
	</div>
</form>
