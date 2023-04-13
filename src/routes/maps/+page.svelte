<script lang="ts">
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";

    const type = $page.url.searchParams.get("type")!;

    let viewRef: HTMLDivElement;

    let cleanup: () => void;

    onMount(async () => {
        const { init } = await import("$lib/mapping");
        cleanup = await init(viewRef, type);
    });

    onDestroy(() => {
        cleanup && cleanup();
    });
</script>

<div bind:this={viewRef} basemap="arcgis-dark-gray" class="w-full h-full">
</div>

