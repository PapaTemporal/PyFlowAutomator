<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import Bars from "$lib/icons/Bars.svelte";
    import NodesSection from "./NodesSection.svelte";
    import VariablesSection from "./VariablesSection.svelte";

    export let duration = 0.2;
    export let size: string = "250px";

    const myFlowOpen: Writable<boolean> = getContext("myFlowOpen");

    $: style = `--duration: ${duration}s; --size: ${size}; flex: 0 0 auto;`;
    $: open = $myFlowOpen;
</script>

<aside class="panel" class:open {style}>
    {#if open}
        <div class="header">
            My Flow<Bars
                color="white"
                style="cursor: pointer; border: unset; background-color: unset;"
                onClick={() => myFlowOpen.set(false)}
            />
        </div>
        <VariablesSection />
        <NodesSection />
    {/if}
</aside>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        color: white;
        height: 20px;
        border-bottom: #484848 2px solid;
    }
    .panel {
        width: 0px;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3;
        transition: width var(--duration) ease;
        overflow: auto;
    }

    .panel.open {
        width: var(--size);
    }
</style>
