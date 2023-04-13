<script lang="ts">
    type PowerPlants = {
        types: string[];
    };

    export let data: PowerPlants;
</script>

<div
    class="bg-white border border-gray-200 w-full h-full text-gray-900 text-xl"
>
    {#if !data?.types.length}
        Loading...
    {:else}
        {#each data?.types as type}
            <a href={`/maps?type=${type}`}>
                <div
                    class="p-2 px-6 border-b w-full cursor-pointer hover:border-l-4 hover:border-l-blue-700"
                >
                    {type}
                </div>
            </a>
        {/each}
    {/if}
</div>
