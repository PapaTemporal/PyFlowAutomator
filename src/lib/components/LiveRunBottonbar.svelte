<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { getContext, tick } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import Bars from "$lib/icons/Bars.svelte";
    import type { NodeExt, Variable } from "$lib/types";
    import type { Edge } from "@xyflow/svelte";

    const id: Writable<string> = getContext("id");
    const name: Writable<string> = getContext("name");
    const nodes: Writable<NodeExt[]> = getContext("nodes");
    const edges: Writable<Edge[]> = getContext("edges");
    const variables: Writable<Variable> = getContext("variables");

    const liveRunOpen: Writable<boolean> = getContext("liveRunOpen");

    let ws: WebSocket;
    let flowResults: Writable<string[]> = writable([]);
    let terminal: HTMLDivElement;

    $: open = $liveRunOpen;
    $: if (open) {
        onOpen();
    } else {
        onClose();
    }

    function onOpen() {
        if (ws === undefined || ws.readyState !== WebSocket.OPEN) {
            ws = new WebSocket("ws://localhost:8000/ws/run");
            ws.onmessage = function (event) {
                flowResults.update((responses) => [...responses, event.data]);
                tick().then(() => {
                    terminal.scrollTop = terminal.scrollHeight;
                });
            };
        }
    }

    function onClose() {
        if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
    }

    function onStart() {
        if ($nodes.length === 0) {
            alert("Flow is empty");
            return;
        }
        if ($nodes.filter((node) => node.type === "START").length === 0) {
            alert("Flow does not have a START node");
            return;
        }
        if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
            flowResults.set([]);
            ws.send(
                JSON.stringify({
                    id: $id,
                    name: $name,
                    nodes: $nodes,
                    edges: $edges,
                    variables: $variables,
                })
            );
        }
    }

    function onStop() {
        if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ stop: true }));
        }
    }

    function onRefresh() {
        onClose();
        onOpen();
        flowResults.set([]);
    }
</script>

<aside class="panel" class:open>
    {#if open}
        <div class="header">
            Live Run
            <div>
                <button on:click={onStart}>Start</button>
                <button on:click={onStop}>Stop</button>
                <button on:click={onRefresh}>Refresh</button>
            </div>
            <Bars
                color="white"
                style="cursor: pointer; border: unset; background-color: unset;"
                onClick={() => liveRunOpen.set(false)}
            />
        </div>
        <div class="terminal" bind:this={terminal}>
            {#each $flowResults as result}
                <div>{result.replace(/\\u03bcs/g, "µs")}</div>
            {/each}
        </div>
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
        width: 100%;
        height: 0;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3;
        transition: height 0.2 ease;
        overflow: auto;
    }

    .panel.open {
        height: 500px;
    }
    .terminal {
        background-color: #000000;
        color: #00ff00;
        font-family: "Courier New", Courier, monospace;
        padding: 10px;
        white-space: pre-wrap;
        overflow: auto;
        height: 100%;
    }
</style>
