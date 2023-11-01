<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";
    import { beforeUpdate } from "svelte";

    export let data: NodePropsExt["data"];

    beforeUpdate(() => {
        if (!data.kwargs) data.kwargs = {};
        if (!data.kwargs.variable_name) data.kwargs.variable_name = null;
        if (!data.kwargs.value) data.kwargs.value = null;
        if (!data.function) data.function = "set_variable";
    });
</script>

<div id="node">
    <Handle
        id="e-in"
        type="target"
        position={Position.Left}
        style="top: 10px; left: -5px; border: unset; border-radius: unset; border-top-left-radius: 2px; border-bottom-left-radius: 2px; height: 10px;"
    />
    <Handle
        id="value"
        type="target"
        position={Position.Left}
        style="top: 50px;"
    />
    <div id="header">
        <span>SET</span>
    </div>
    <span id="var">{data.kwargs.variable_name}</span>
    <input
        class="nodrag"
        type="text"
        style="height: 10px;"
        bind:value={data.kwargs.value}
        on:keydown={(e) => e.stopPropagation() && e.preventDefault()}
        placeholder="data"
    />
    <Handle
        id="e-out"
        type="source"
        position={Position.Right}
        style="top: 10px; right: -5px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
</div>

<style>
    #node {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 4rem;
        width: 10rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
    }
    #node input {
        flex: 0 1 auto;
        height: 10px;
        margin: 0 0 7px 0;
    }
    #var {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 auto;
    }
    #header {
        flex: 0 1 auto;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid black;
        background-color: #f0f0f0;
        overflow: hidden;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>
