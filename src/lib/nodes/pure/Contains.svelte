<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";
    import { beforeUpdate } from "svelte";

    export let data: NodePropsExt["data"];

    beforeUpdate(() => {
        if (!data.args) data.args = [null, null];
        if (!data.function) data.function = "operator.contains";
    });
</script>

<!-- TODO: add a way to disable the input when the input is connected -->
<div id="node">
    <Handle id="0" type="target" position={Position.Left} style="top: 30%" />
    <Handle id="1" type="target" position={Position.Left} style="top: 70%" />
    <div id="inputs">
        <input
            class="nodrag"
            type="text"
            bind:value={data.args[0]}
            on:keydown={(e) => e.stopPropagation() && e.preventDefault()}
        />
        <input
            class="nodrag"
            type="text"
            bind:value={data.args[1]}
            on:keydown={(e) => e.stopPropagation() && e.preventDefault()}
        />
    </div>
    <span>IN</span>
    <Handle
        id="__ignore__"
        type="source"
        position={Position.Right}
        style="top: 50%"
    />
</div>

<style>
    #node {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 2.5rem;
        width: 8rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
    }
    #node span {
        flex: 0 1 auto;
        margin: auto 10px;
    }
    #inputs {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
        padding-left: 5px;
    }
    #inputs input {
        font-size: 7px;
        height: 8px;
        width: 5rem;
    }
    #outputs {
        flex: 0 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 5px;
    }
</style>
