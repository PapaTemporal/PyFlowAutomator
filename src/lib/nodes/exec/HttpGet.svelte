<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";

    export let data: NodePropsExt["data"];
</script>

<div id="node">
    <Handle
        id="e-in"
        type="target"
        position={Position.Left}
        style="top: 10px; left: -5px; border: unset; border-radius: unset; border-top-left-radius: 2px; border-bottom-left-radius: 2px; height: 10px;"
    />
    <Handle id="0" type="target" position={Position.Left} style="top: 33px;" />
    <div id="header">
        <span>HTTP GET</span>
    </div>
    <div id="body">
        <div id="inputs">
            <input
                class="nodrag"
                type="text"
                style="height: 10px;"
                bind:value={data.args[0]}
                on:keydown={(e) => e.stopPropagation() && e.preventDefault()}
                placeholder="url"
            />
        </div>
        <div id="outputs">
            <span>json/text</span>
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
        style="top: 33px;"
    />
</div>

<style>
    #node {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 3rem;
        width: 13rem;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        font-family: sans-serif;
        font-size: 9px;
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
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        height: 100%;
        padding-left: 5px;
    }
    #inputs input {
        flex: 0 1 auto;
        height: 10px;
        margin: 7px 0 0 0;
    }
    #outputs {
        flex: 0 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        padding-right: 5px;
    }
    #outputs span {
        margin: 10px 0 0 0;
    }
</style>
