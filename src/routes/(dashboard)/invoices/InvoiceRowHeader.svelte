<script lang="ts">
	export let className = '';
</script>

<header class={`table-header invoice-table hidden lg:grid ${className}`}>
	<h3>Status</h3>
	<h3>Due Date</h3>
	<h3>ID</h3>
	<h3>Client</h3>
	<h3 class="text-right">Amount</h3>
	<div />
	<div />
</header>

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}
</style>
