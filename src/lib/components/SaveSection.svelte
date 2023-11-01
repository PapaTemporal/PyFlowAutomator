<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { createEventDispatcher } from "svelte";
    import type { Node, Edge } from "@xyflow/svelte";
    import Drawer from "./Drawer.svelte";

    import {
        sample_nodes,
        sample_edges,
        sample_variables,
    } from "$lib/sample/logic_flow";
    import Play from "$lib/icons/Play.svelte";
    import Stop from "$lib/icons/Stop.svelte";
    import Clear from "$lib/icons/Clear.svelte";

    import type { Variable } from "$lib/types";

    export let nodes: Writable<Node[]> = writable([]);
    export let edges: Writable<Edge[]> = writable([]);
    export let variables: Writable<Variable> = writable({});
    export let nodeList: string[] = [];

    $: currentFlow = {
        nodes: $nodes,
        edges: $edges,
        variables: $variables,
    };

    let ws: WebSocket;
    let open = false;
    let responses = writable<string[]>([]);

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

    function loadAll() {
        const nodesPerRow = 5;
        const nodeHeight = 70;
        const nodeWidth = 200;
        let x = 0;
        let y = 0;
        let newNodes = [];
        for (let i = 0; i < nodeList.length; i++) {
            newNodes.push({
                id: Math.trunc(Math.random() * 100000).toString(),
                type: nodeList[i],
                data: {},
                position: { x: x * nodeWidth, y: y * nodeHeight },
            });
            x++;
            if (x >= nodesPerRow) {
                x = 0;
                y++;
            }
        }
        nodes.set(newNodes);
        edges.set([]);
        variables.set({});
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
        variables.set({});
    }

    function run() {
        dispatch("run", currentFlow);
    }

    function runLive(e: MouseEvent) {
        open = true;
        if (ws === undefined || ws.readyState !== WebSocket.OPEN) {
            ws = new WebSocket("ws://localhost:8000/ws/run");
            ws.onmessage = function (event) {
                responses.update((responses) => [event.data, ...responses]);
            };
        }
        e.preventDefault();
    }

    function closeConnection(e: MouseEvent) {
        open = false;
        if (ws === undefined || ws.readyState !== WebSocket.OPEN) {
            return;
        }
        ws.close();
        e.preventDefault();
    }

    function sendStartMessage(e: MouseEvent) {
        if (ws === undefined || ws.readyState !== WebSocket.OPEN) {
            return;
        }
        responses.set([]);
        ws.send(JSON.stringify(currentFlow));
        e.preventDefault();
    }

    function sendStopMessage(e: MouseEvent) {
        if (ws === undefined || ws.readyState !== WebSocket.OPEN) {
            return;
        }
        console.log("stop");
        ws.send(JSON.stringify({ stop: true }));
        e.preventDefault();
    }
</script>

<div class="header">File</div>
<div class="body">
    <button on:click={run}>run</button>
    <button on:click={runLive}>run live</button>
    <button on:click={loadSample}>load sample</button>
    <button on:click={loadAll}>load all nodes</button>
    <button on:click={loadFromClipboard}>load clipboard</button>
    <button on:click={clearFlow}>clear</button>
    <button on:click={copyToClipboard}>copy</button>
</div>
<Drawer bind:open placement="bottom" onClickAway={closeConnection} size="50%">
    <div class="controls">
        <Play
            style="display: flex; justify-content: center; align-items: center; cursor: pointer; border: unset; background-color: unset;"
            color="green"
            onClick={sendStartMessage}
        />
        <Stop
            style="display: flex; justify-content: center; align-items: center; cursor: pointer; border: unset; background-color: unset;"
            color="red"
            onClick={sendStopMessage}
        />
        <Clear
            style="display: flex; justify-content: center; align-items: center; cursor: pointer; border: unset; background-color: unset;"
            color="white"
            onClick={() => responses.set([])}
        />
        <h1>Flow Results</h1>
    </div>
    <article class="data">
        {#each $responses as response}
            <p
                style="border: 3px solid; padding: 10px; border-radius: 5px; margin: unset;"
            >
                {response}
            </p>
        {/each}
    </article>
</Drawer>

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
    .controls {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px;
    }
    .data {
        padding: 8px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        margin: 0 auto;
        max-width: 1920px;
        gap: 10px;
    }
</style>
