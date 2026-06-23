<script>
	import ProfileButtons from "./ProfileButtons.svelte";
	import SiteLogo from "./SiteLogo.svelte";
</script>

<header>
	<SiteLogo />
	<ProfileButtons />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}
</style>
