<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { createEventDispatcher } from "svelte";
    import type { Node, Edge } from "@xyflow/svelte";

    import {
        sample_nodes,
        sample_edges,
        sample_variables,
    } from "$lib/sample/logic_flow";

    import type { Variable } from "$lib/types";

    export let nodes: Writable<Node[]> = writable([]);
    export let edges: Writable<Edge[]> = writable([]);
    export let variables: Writable<Variable> = writable({});

    $: currentFlow = {
        start_id: $edges.find((edge) => edge.source == "start")?.target,
        nodes: $nodes,
        edges: $edges,
        variables: $variables,
    };

    const dispatch = createEventDispatcher();

    function copyToClipboard() {
        const text = JSON.stringify(currentFlow, null, 4);
        navigator.clipboard.writeText(text).then(
            () => dispatch("copy", text),
            (e) => dispatch("fail", e)
        );
    }

    function loadSample() {
        nodes.set(sample_nodes);
        edges.set(sample_edges);
        variables.set(sample_variables);
    }

    function loadFromClipboard() {
        navigator.clipboard.readText().then(
            (text) => {
                try {
                    const flow = JSON.parse(text);
                    nodes.set(flow.nodes);
                    edges.set(flow.edges);
                    variables.set(flow.variables);
                } catch (e) {
                    console.log(e);
                }
            },
            (e) => console.log(e)
        );
    }

    function clearFlow() {
        nodes.set([]);
        edges.set([]);
        variables.set([]);
    }
</script>

<div class="header">File</div>
<div class="body">
    <button on:click={loadSample}>load sample</button>
    <button on:click={loadFromClipboard}>load clipboard</button>
    <button on:click={clearFlow}>clear</button>
    <button on:click={copyToClipboard}>copy</button>
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
    }
    .body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }
</style>
