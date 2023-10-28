<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { Node, Edge } from "@xyflow/svelte";
    import type { Variable } from "$lib/types";

    import NodesSection from "./NodesSection.svelte";
    import VariablesSection from "./VariablesSection.svelte";
    import Bars from "$lib/icons/Bars.svelte";
    import SaveSection from "./SaveSection.svelte";

    export let nodes: Writable<Node[]> = writable([]);
    export let edges: Writable<Edge[]> = writable([]);
    export let variables: Writable<Variable> = writable({});
    export let nodeList: string[] = [];

    let propertiesOpen = false;
</script>

{#if propertiesOpen}
    <Bars
        color="white"
        style="position:absolute; left: 10px; top: 8px; cursor: pointer; border: unset; background-color: unset;"
        onClick={() => {
            propertiesOpen = !propertiesOpen;
        }}
    />
    <div class="panel">
        <SaveSection {nodes} {edges} {variables} />
        <VariablesSection {nodes} {edges} {variables} />
        <NodesSection {nodeList} />
    </div>
{:else}
    <Bars
        color="black"
        style="position:absolute; left: 10px; top: 8px; cursor: pointer; border: unset; background-color: unset;"
        onClick={() => {
            propertiesOpen = !propertiesOpen;
        }}
    />
{/if}

<style>
    .panel {
        display: flex;
        flex-direction: column;
        min-width: 250px;
        color: white;
        border-radius: 10px;
        background-color: #333;
        overflow: hidden;
    }
</style>
