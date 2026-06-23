<script lang="ts">
</script>

<a href="/" id="logotype">
	<img
		src="assets/logo.png"
		alt="Collective Unconscious logo"
		width="348px"
		height="50px"
		id="big-cu-logo"
	/>
	<img
		src="assets/logo_small.png"
		alt="Collective Unconscious logo"
		width="56px"
		height="50px"
		id="small-cu-logo"
	/>
</a>

<style>
	#big-cu-logo {
		display: block;
	}
	#small-cu-logo {
		display: none;
	}

	/* Mobile view: smaller logo */
	@media (max-width: 780px) {
		#small-cu-logo {
			display: block;
		}
		#big-cu-logo {
			display: none;
		}
	}
</style>
