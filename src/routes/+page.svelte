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
    import type { NodeExt, Variable, PureConfig } from "$lib/types";
    import { nodeTypes } from "$lib/nodes";
    import Deletable from "$lib/edges/Deletable.svelte";
    import MenuBar from "$lib/components/menubar/MenuBar.svelte";
    import StatusBar from "$lib/components/StatusBar.svelte";
    import FlowConfigSidebar from "$lib/components/FlowConfigSidebar.svelte";
    import MyFlowSidebar from "$lib/components/flowsidebar/MyFlowSidebar.svelte";
    import LiveRunBottonbar from "$lib/components/LiveRunBottonbar.svelte";
    import { nodeTypeDefs } from "$lib/nodes";

    const id: Writable<string> = writable("");
    const name: Writable<string> = writable("");
    const nodes: Writable<NodeExt[]> = writable([]);
    const edges: Writable<Edge[]> = writable([]);
    const variables: Writable<Variable> = writable({});

    setContext("id", id);
    setContext("name", name);
    setContext("nodes", nodes);
    setContext("edges", edges);
    setContext("variables", variables);

    const { specialNodes, rootNodesList } = nodeTypeDefs;

    const edgeTypes: EdgeTypes = {
        Deletable,
    };

    function onDrop(e: DragEvent) {
        e.preventDefault();
        const target = (e.target as HTMLElement)
            ?.firstElementChild as HTMLElement;
        const rect = target?.getBoundingClientRect() as DOMRect;
        const scale = rect.width / target?.offsetWidth;

        let nType = e.dataTransfer
            ?.getData("type")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

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
                createNode("get_variable");
            });
            contextMenu.appendChild(getOption);

            const setOption = document.createElement("button");
            setOption.textContent = "SET";
            setOption.addEventListener("click", () => {
                createNode("set_variable");
            });
            contextMenu.appendChild(setOption);

            document.body.appendChild(contextMenu);

            window.addEventListener("click", onClickAway);
        } else {
            createNode(nType as string);
        }

        function onClickAway() {
            if (contextMenu) {
                document.body.removeChild(contextMenu);
                contextMenu = null;
                window.removeEventListener("click", onClickAway);
            }
        }

        function createNode(nodeType: string) {
            let data = {} as Omit<PureConfig, "name">;

            if (specialNodes.hasOwnProperty(nodeType as string)) {
                let tmpKwargs: { [key: string]: any } = {
                    variable_name: varName as string,
                };
                if (nodeType == "set_variable") {
                    tmpKwargs["value"] = varValue as string;
                }
                data = {
                    ...specialNodes[nodeType as string],
                    kwargs: tmpKwargs,
                };
            }

            if (rootNodesList.hasOwnProperty(nodeType as string)) {
                data = rootNodesList[nodeType as string];
            }

            const tmpNode = {
                id: Math.trunc(Math.random() * 100000).toString(),
                type: data.type,
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
        {#if $id !== ""}
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
        {:else}
            <div class="no-flow">No Flow Loaded</div>
        {/if}
    </div>
    <StatusBar />
</div>

<style>
    .no-flow {
        height: 100%;
        width: 100%;
        background-color: rgb(107, 107, 107);
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(216, 216, 216);
    }
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
