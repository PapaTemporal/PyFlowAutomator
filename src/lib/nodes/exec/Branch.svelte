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
        if (!data.kwargs.true) data.kwargs.true = null;
        if (!data.kwargs.false) data.kwargs.false = null;
        if (!data.function) data.function = "branch";
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
        id="condition"
        type="target"
        position={Position.Left}
        style="top: 45px;"
    />
    <div id="header">
        <span>IF</span>
    </div>
    <div id="body">
        <div id="inputs">
            <input type="checkbox" style="height: 10px;" />
        </div>
        <div id="outputs">
            <span style="transform: translate(0, -20%);">true</span>
            <span style="transform: translate(0, 25%);">else</span>
        </div>
    </div>
    <Handle
        id="true"
        type="source"
        position={Position.Right}
        style="top: 31px; right: -5px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
    <Handle
        id="false"
        type="source"
        position={Position.Right}
        style="top: 46px; right: -5px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
    />
</div>

<style>
    #node {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 3.5rem;
        width: 6rem;
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
        justify-content: flex-end;
        align-items: center;
        height: 100%;
    }
    #inputs input {
        margin-bottom: 7px;
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
    label {
        line-height: 15px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15px;
    }
    label:hover {
        cursor: pointer;
    }
    .exec {
        background-color: #f0f0f0;
        height: fit-content;
        width: fit-content;
    }
</style>
