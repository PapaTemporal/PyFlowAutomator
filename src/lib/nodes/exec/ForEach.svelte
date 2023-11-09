<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { Position } from "@xyflow/system";
    import { Handle } from "@xyflow/svelte";

    import type { NodePropsExt } from "$lib/types";

    export let data: NodePropsExt["data"];

    // unused props - we need to list them here in order to prevent warnings
    export let targetPosition: NodePropsExt["targetPosition"] = Position.Top;
    export let sourcePosition: NodePropsExt["sourcePosition"] = Position.Bottom;
    export let id: NodePropsExt["id"] = "";
    export let selected: NodePropsExt["selected"] = undefined;
    export let type: NodePropsExt["type"] = undefined;
    export let zIndex: NodePropsExt["zIndex"] = undefined;
    export let dragging: NodePropsExt["dragging"] = false;
    export let dragHandle: NodePropsExt["dragHandle"] = undefined;
    export let xPos: NodePropsExt["xPos"] = 0;
    export let yPos: NodePropsExt["yPos"] = 0;
    export let isConnectable: NodePropsExt["isConnectable"] = undefined;
</script>

<div id="node">
    <Handle
        id="e-in"
        type="target"
        position={Position.Left}
        style="top: 10px; left: -5px; border: unset; border-radius: unset; border-top-left-radius: 2px; border-bottom-left-radius: 2px; height: 10px;"
    />
    <Handle
        id="array"
        type="target"
        position={Position.Left}
        style="top: 45px;"
    />
    <div id="header">
        <span>FOREACH</span>
    </div>
    <div id="body">
        <div id="inputs">
            <span style="height: 10px;">array</span>
        </div>
        <div id="outputs">
            <span style="transform: translate(0, -20%);">item</span>
            <span style="transform: translate(0, 25%);">continue</span>
        </div>
    </div>
    <Handle
        id="next_function"
        type="source"
        position={Position.Right}
        style="top: 10px; right: -5px; border: unset; border-radius: unset; border-top-right-radius: 2px; border-bottom-right-radius: 2px; height: 10px;"
        on:connect={(e) => {
            e.stopPropagation();
            e.preventDefault();
            data.kwargs.next_function = e.detail.connection.target;
        }}
    />
    <Handle
        id="__ignore__"
        type="source"
        position={Position.Right}
        style="top: 31px;"
    />
    <Handle
        id="e-out"
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
    #inputs span {
        margin-left: 5px;
        margin-bottom: 8px;
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
