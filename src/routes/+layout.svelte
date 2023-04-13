<script lang="ts">
    import config from "@arcgis/core/config";
    import { page } from "$app/stores";
    import '$lib/css/styles.css';
    import "../index.css";

    config.apiKey = import.meta.env.VITE_API_KEY;
</script>

<div class="flex flex-col h-screen">
    <header
        class="sticky top-0 z-30 w-full px-2 py-4 text-[#FFFFFF] bg-[#007AC2] shadow-xl"
    >
        {#if $page.url.pathname === "/maps"}
            <a href="/"><span>{"<"}</span></a>
        {/if}
        <span class="mx-5">SvelteKit and ArcGIS</span>
    </header>
    <main class="flex h-full flex-col items-center justify-center">
        <div class="h-full w-full flex flex-col items-center justify-center">
            <slot />
        </div>
    </main>
</div>
