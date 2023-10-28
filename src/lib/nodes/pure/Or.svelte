<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";
    import { beforeUpdate } from "svelte";

    export let data: NodePropsExt["data"];

    beforeUpdate(() => {
        if (!data.args) data.args = [false, false];
        if (!data.function) data.function = "operator.or_";
    });
</script>

<!-- TODO: add a way to disable the input when the input is connected -->
<div id="node">
    <Handle id="0" type="target" position={Position.Left} style="top: 30%" />
    <Handle id="1" type="target" position={Position.Left} style="top: 70%" />
    <div id="inputs">
        <input bind:checked={data.args[0]} class="nodrag" type="checkbox" />
        <input bind:checked={data.args[1]} class="nodrag" type="checkbox" />
    </div>
    <span>OR</span>
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
        height: 2rem;
        width: 4rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
    }
    #node span {
        flex: 0 1 auto;
        margin: auto 12px;
    }
    #inputs {
        width: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #inputs input {
        height: 8px;
    }
</style>
