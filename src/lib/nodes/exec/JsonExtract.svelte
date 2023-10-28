<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";
    import { beforeUpdate, onMount } from "svelte";

    export let data: NodePropsExt["data"];

    beforeUpdate(() => {
        if (!data.kwargs) data.kwargs = {};
        if (!data.kwargs.expression) data.kwargs.expression = "";
        if (!data.function) data.function = "custom.extract_json";
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
        id="json_obj"
        type="target"
        position={Position.Left}
        style="top: 52px;"
    />
    <div id="header">
        <span>JSONEXT</span>
    </div>
    <input
        class="nodrag"
        on:keydown={(e) => e.stopPropagation() && e.preventDefault()}
        placeholder="expression"
        bind:value={data.kwargs.expression}
        type="text"
    />
    <div id="body">
        <div id="inputs">
            <span style="transform: translate(0, -30%);">obj</span>
        </div>
        <div id="outputs">
            <span style="transform: translate(0, -30%);">return</span>
        </div>
    </div>
    <Handle
        id="e-out"
        type="source"
        position={Position.Right}
        style="top: 10px; right: -5px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
    <Handle
        id="__ignore__"
        type="source"
        position={Position.Right}
        style="top: 52px;"
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
        margin: 5px;
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
    #body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1 1 auto;
        width: 100%;
    }
    #inputs {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
        padding-left: 5px;
    }
    #outputs {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
        padding-right: 5px;
    }
</style>
