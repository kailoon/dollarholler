<script lang="ts">
	const portal = (node: HTMLElement) => {
		let target: HTMLBodyElement | null;
		const update = () => {
			target = document.querySelector('body');
			target?.appendChild(node);
			node.hidden = false;
		};

		const destroy = () => {
			if (node.parentNode) node.parentNode.removeChild(node);
		};
		update();

		return { update, destroy };
	};
</script>

<div hidden use:portal>
	<slot>
		<!-- optional -->
	</slot>
</div>
