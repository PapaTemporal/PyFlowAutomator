<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    // third-party
    import {
        SvelteFlow,
        Controls,
        Background,
        BackgroundVariant,
        MiniMap,
        Panel,
        type EdgeTypes,
        type Edge,
    } from "@xyflow/svelte";
    import { writable, type Writable } from "svelte/store";
    import "@xyflow/svelte/dist/style.css";
    // local types
    import type { NodeTypesExt, NodeExt, Variable } from "$lib/types";
    // local nodes
    import ForEach from "$lib/nodes/exec/ForEach.svelte";
    import JsonExtract from "$lib/nodes/exec/JsonExtract.svelte";
    import Branch from "$lib/nodes/exec/Branch.svelte";
    import HttpGet from "$lib/nodes/exec/HttpGet.svelte";
    import SetVariable from "$lib/nodes/exec/SetVariable.svelte";
    import Print from "$lib/nodes/exec/Print.svelte";
    import GetVariable from "$lib/nodes/pure/custom/GetVariable.svelte";
    import Start from "$lib/nodes/exec/Start.svelte";
    import * as operator_nodes from "$lib/nodes";
    // local edges
    import Deletable from "$lib/edges/Deletable.svelte";
    // local components
    import PropertiesSection from "$lib/components/PropertiesSection.svelte";
    import LiveDebugSection from "$lib/components/LiveDebugSection.svelte";
    // local constants
    const unlistedNodes = ["Start", "GetVariable", "SetVariable"];

    const variables: Writable<Variable> = writable({});
    const nodes: Writable<NodeExt[]> = writable([]);
    const edges: Writable<Edge[]> = writable([]);

    const nodeTypes: NodeTypesExt = {
        ...operator_nodes,
        ForEach,
        JsonExtract,
        Branch,
        HttpGet,
        SetVariable,
        Print,
        GetVariable,
        Start,
    };

    const nodeList = Object.keys(nodeTypes).filter(
        (key) => !unlistedNodes.includes(key)
    );

    const edgeTypes: EdgeTypes = {
        Deletable,
    };

    function onDrop(e: DragEvent) {
        e.preventDefault();
        const target = (e.target as HTMLElement)
            ?.firstElementChild as HTMLElement;
        const rect = target?.getBoundingClientRect() as DOMRect;
        const scale = rect.width / target?.offsetWidth;

        let data = {};
        let nodeType = e.dataTransfer?.getData("type");
        const varName = e.dataTransfer?.getData("varName");
        const varValue = e.dataTransfer?.getData("varValue");

        if (nodeType == "GetVariable") {
            data = { kwargs: { variable_name: varName } };
        }

        if (nodeType == "SetVariable") {
            data = { kwargs: { variable_name: varName, value: varValue } };
        }

        const tmpNode = {
            id: Math.trunc(Math.random() * 100000).toString(),
            type: nodeType,
            data: data,
            position: {
                x: (e.clientX - rect.left) / scale,
                y: (e.clientY - rect.top) / scale,
            },
        };

        $nodes = [...$nodes, tmpNode];
    }
</script>

<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
    <SvelteFlow
        {nodes}
        {edges}
        {nodeTypes}
        {edgeTypes}
        fitView
        on:dragover={(e) => e.preventDefault()}
        on:drop={onDrop}
    >
        <Panel position="top-left">
            <PropertiesSection {nodes} {edges} {variables} {nodeList} />
        </Panel>
        <Panel position="top-right">
            <LiveDebugSection {nodes} {edges} {variables} />
        </Panel>
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
        <MiniMap />
    </SvelteFlow>
</div>
