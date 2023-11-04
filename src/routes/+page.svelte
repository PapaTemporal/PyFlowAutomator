<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import {
        SvelteFlow,
        Controls,
        Background,
        BackgroundVariant,
        MiniMap,
        type EdgeTypes,
        type Edge,
    } from "@xyflow/svelte";
    import { writable, type Writable } from "svelte/store";
    import { setContext } from "svelte";
    import "@xyflow/svelte/dist/style.css";
    import type { NodeTypesExt, NodeExt, Variable } from "$lib/types";
    import * as operator_nodes from "$lib/nodes";
    import Deletable from "$lib/edges/Deletable.svelte";
    import MenuBar from "$lib/components/MenuBar.svelte";
    import StatusBar from "$lib/components/StatusBar.svelte";
    import FlowConfigSidebar from "$lib/components/FlowConfigSidebar.svelte";
    import MyFlowSidebar from "$lib/components/MyFlowSidebar.svelte";
    import LiveRunBottonbar from "$lib/components/LiveRunBottonbar.svelte";
    import { pureNodes, executableNodes, specialNodes } from "$lib/constants";

    const nodeTypes: NodeTypesExt = operator_nodes;

    const id: Writable<string> = writable("1234567890");
    const name: Writable<string> = writable("Flow1234567890");
    const nodes: Writable<NodeExt[]> = writable([]);
    const edges: Writable<Edge[]> = writable([]);
    const variables: Writable<Variable> = writable({});

    setContext("id", id);
    setContext("name", name);
    setContext("nodes", nodes);
    setContext("edges", edges);
    setContext("variables", variables);

    const edgeTypes: EdgeTypes = {
        Deletable,
    };

    function onDrop(e: DragEvent) {
        e.preventDefault();
        const target = (e.target as HTMLElement)
            ?.firstElementChild as HTMLElement;
        const rect = target?.getBoundingClientRect() as DOMRect;
        const scale = rect.width / target?.offsetWidth;

        let nodeType = e.dataTransfer?.getData("type");
        const varName = e.dataTransfer?.getData("varName");
        const varValue = e.dataTransfer?.getData("varValue");

        let contextMenu: HTMLDivElement | null = null;

        if (varName) {
            // Create a new context menu
            contextMenu = document.createElement("div");
            contextMenu.style.position = "absolute";
            contextMenu.style.display = "flex";
            contextMenu.style.flexDirection = "column";
            contextMenu.style.alignItems = "center";
            contextMenu.style.justifyContent = "center";
            contextMenu.style.backgroundColor = "#333";
            contextMenu.style.color = "white";
            contextMenu.style.padding = "5px";
            contextMenu.style.borderRadius = "3px";
            contextMenu.style.zIndex = "1000";
            contextMenu.style.cursor = "pointer";
            contextMenu.style.userSelect = "none";
            contextMenu.style.fontFamily = "Arial, Helvetica, sans-serif";
            contextMenu.style.fontSize = "14px";
            contextMenu.style.gap = "5px";
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;

            // Add "get" and "set" options to the context menu
            const getOption = document.createElement("button");
            getOption.textContent = "GET";
            getOption.addEventListener("click", () => {
                nodeType = "GET_VARIABLE";
                createNode();
            });
            contextMenu.appendChild(getOption);

            const setOption = document.createElement("button");
            setOption.textContent = "SET";
            setOption.addEventListener("click", () => {
                nodeType = "SET_VARIABLE";
                createNode();
            });
            contextMenu.appendChild(setOption);

            document.body.appendChild(contextMenu);

            window.addEventListener("click", onClickAway);
        } else {
            createNode();
        }

        function onClickAway() {
            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
                window.removeEventListener("click", onClickAway);
            }
        }

        function createNode() {
            let data = {};

            if (nodeType == "GET_VARIABLE") {
                data = specialNodes[nodeType.toLowerCase()];
                data = { ...data, kwargs: { variable_name: varName } };
            }

            if (nodeType == "SET_VARIABLE") {
                data = specialNodes[nodeType.toLowerCase()];
                data = {
                    ...data,
                    kwargs: { variable_name: varName, value: varValue },
                };
            }

            let key = (nodeType as string)
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">");
            if (pureNodes.hasOwnProperty(key)) {
                data = JSON.parse(JSON.stringify(pureNodes[key]));
                nodeType = "PURE";
            }

            if ({ ...executableNodes, ...specialNodes }.hasOwnProperty(key)) {
                data = JSON.parse(
                    JSON.stringify({ ...executableNodes, ...specialNodes }[key])
                );
                nodeType = nodeType?.toUpperCase() as string;
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

            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
                window.removeEventListener("click", onClickAway);
            }
        }
    }

    let configOpen = writable(false);
    let myFlowOpen = writable(false);
    let liveRunOpen = writable(false);

    setContext("configOpen", configOpen);
    setContext("myFlowOpen", myFlowOpen);
    setContext("liveRunOpen", liveRunOpen);
</script>

<div class="main">
    <MenuBar />
    <div class="body">
        <MyFlowSidebar />
        <div class="main-center">
            <SvelteFlow
                id={$id}
                {nodes}
                {edges}
                {nodeTypes}
                {edgeTypes}
                fitView
                on:dragover={(e) => e.preventDefault()}
                on:drop={onDrop}
            >
                <Controls />
                <Background variant={BackgroundVariant.Lines} />
                <MiniMap />
            </SvelteFlow>
            <LiveRunBottonbar />
        </div>
        <FlowConfigSidebar />
    </div>
    <StatusBar />
</div>

<style>
    .main {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .body {
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        bottom: 25px;
        display: flex;
    }
    .main-center {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
