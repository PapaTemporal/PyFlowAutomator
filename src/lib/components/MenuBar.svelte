<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import { createEventDispatcher, getContext } from "svelte";
    import type {
        MenuItem as MenuItemType,
        NodeExt,
        Variable,
    } from "$lib/types";
    import FileMenu from "./FileMenu.svelte";
    import type { Edge } from "@xyflow/svelte";
    import {
        sample_nodes,
        sample_edges,
        sample_variables,
    } from "$lib/sample/logic_flow";
    import { nodesList } from "$lib/constants";

    const id: Writable<string> = getContext("id");
    const name: Writable<string> = getContext("name");
    const nodes: Writable<NodeExt[]> = getContext("nodes");
    const edges: Writable<Edge[]> = getContext("edges");
    const variables: Writable<Variable> = getContext("variables");
    const configOpen: Writable<boolean> = getContext("configOpen");
    const myFlowOpen: Writable<boolean> = getContext("myFlowOpen");
    const liveRunOpen: Writable<boolean> = getContext("liveRunOpen");

    const dispatch = createEventDispatcher();

    let flowMenuItems: Writable<MenuItemType[]> = writable([
        {
            id: 1,
            label: "New Flow",
            action: (e: MouseEvent) => {
                const randomId = Math.floor(Math.random() * 1000000).toString(); // generates a random number between 0 and 999999
                const randomName = `Flow${randomId}`; // appends the random number to 'Flow' to create a random name

                id.set(randomId);
                name.set(randomName);
                nodes.set([
                    {
                        id: "1",
                        type: "START",
                        data: { function: "__ignore__" },
                        position: { x: 0, y: 0 },
                    },
                ]);
                edges.set([]);
                variables.set({});
            },
        },
        {
            id: 2,
            label: "New Flow from Clipboard",
            action: (e: MouseEvent) => {
                navigator.clipboard.readText().then(
                    (text) => {
                        try {
                            const randomId = Math.floor(
                                Math.random() * 1000000
                            ).toString(); // generates a random number between 0 and 999999
                            const randomName = `Flow${randomId}`; // appends the random number to 'Flow' to create a random name

                            const flow = JSON.parse(text);
                            id.set(flow.id || randomId);
                            name.set(flow.name || randomName);
                            nodes.set(flow.nodes);
                            edges.set(flow.edges);
                            variables.set(flow.variables);
                        } catch (e) {
                            console.log(e);
                        }
                    },
                    (e) => console.log(e)
                );
            },
        },
        {
            id: 3,
            label: "Open Flow from File",
            action: (e: MouseEvent) => {
                const input = document.createElement("input");
                input.type = "file";
                input.onchange = () => {
                    const file = input.files && input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (event) {
                            if (event.target) {
                                try {
                                    const flow = JSON.parse(
                                        event.target.result as string
                                    );
                                    id.set(flow.id);
                                    name.set(flow.name);
                                    nodes.set(flow.nodes);
                                    edges.set(flow.edges);
                                    variables.set(flow.variables);
                                } catch (e) {
                                    console.log(e);
                                } finally {
                                    input.remove();
                                }
                            }
                        };
                        reader.readAsText(file);
                    }
                };
                input.click();
            },
        },
        {
            id: 4,
            label: "Open Flow from URL",
            action: async (e: MouseEvent) => {
                const url = "https://example.com/api/flow"; // replace with your API URL
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    const flow = await response.json();
                    id.set(flow.id);
                    name.set(flow.name);
                    nodes.set(flow.nodes);
                    edges.set(flow.edges);
                    variables.set(flow.variables);
                } catch (e) {
                    console.log(e);
                }
            },
        },
        {
            id: 5,
            label: "Load Sample Flow",
            action: (e: MouseEvent) => {
                id.set("12345678901");
                name.set("Flow12345678901");
                nodes.set(sample_nodes);
                edges.set(sample_edges);
                variables.set(sample_variables);
            },
        },
        {
            id: 6,
            label: "Load All Nodes",
            action: (e: MouseEvent) => {
                const nodesPerRow = 5;
                const nodeHeight = 70;
                const nodeWidth = 200;
                let x = 0;
                let y = 0;
                let newNodes = [];
                for (let i = 0; i < nodesList.length; i++) {
                    newNodes.push({
                        id: Math.trunc(Math.random() * 100000).toString(),
                        type: nodesList[i],
                        data: {},
                        position: { x: x * nodeWidth, y: y * nodeHeight },
                    });
                    x++;
                    if (x >= nodesPerRow) {
                        x = 0;
                        y++;
                    }
                }
                id.set("12345678901");
                name.set("Flow12345678901");
                nodes.set(newNodes);
                edges.set([]);
                variables.set({});
            },
        },
        {
            id: 7,
            label: "Save Flow",
            action: (e: MouseEvent) => console.log("Save Flow"),
            disabled: true,
        },
        {
            id: 8,
            label: "Save Flow As...",
            action: (e: MouseEvent) => console.log("Save Flow"),
            disabled: true,
        },
        {
            id: 9,
            label: "Save Flow to Clipboard",
            action: (e: MouseEvent) => {
                const text = JSON.stringify(
                    {
                        id: $id,
                        name: $name,
                        nodes: $nodes,
                        edges: $edges,
                        variables: $variables,
                    },
                    null,
                    4
                );
                navigator.clipboard.writeText(text).then(
                    () => dispatch("copy", text),
                    (e) => dispatch("fail", e)
                );
            },
        },
        {
            id: 10,
            label: "Clear Flow",
            action: (e: MouseEvent) => {
                nodes.set([]);
                edges.set([]);
                variables.set({});
            },
        },
        {
            id: 11,
            label: "Close Flow",
            action: (e: MouseEvent) => {
                id.set("1234567890");
                name.set("Flow1234567890");
                nodes.set([]);
                edges.set([]);
                variables.set({});
            },
        },
    ]);

    let runMenuItems: Writable<MenuItemType[]> = writable([
        {
            id: 1,
            label: "Run Flow",
            action: async (e: MouseEvent) => {
                if ($nodes.length === 0) {
                    alert("Flow is empty");
                    return;
                }
                if (
                    $nodes.filter((node) => node.type === "START").length === 0
                ) {
                    alert("Flow does not have a START node");
                    return;
                }
                await fetch("http://localhost:8000/api/run", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify({
                        id: $id,
                        name: $name,
                        nodes: $nodes,
                        edges: $edges,
                        variables: $variables,
                    }),
                })
                    .then((response) => response.json())
                    .catch((e) => console.log(e));
            },
        },
        {
            id: 2,
            label: "Open Live",
            action: (e: MouseEvent) => liveRunOpen.set(!$liveRunOpen),
        },
    ]);

    let isFlowMenuOpen: Writable<boolean> = writable(false);
    let isRunMenuOpen: Writable<boolean> = writable(false);

    function handleCloseOthers(ignore: string) {
        if (ignore === "File") {
            isRunMenuOpen.set(false);
        } else if (ignore === "Run") {
            isFlowMenuOpen.set(false);
        } else {
            isFlowMenuOpen.set(false);
            isRunMenuOpen.set(false);
        }
    }
</script>

<div class="menu-bar">
    <div class="menus">
        <FileMenu
            bind:menuItems={flowMenuItems}
            bind:isOpen={isFlowMenuOpen}
            closeOthers={handleCloseOthers}
            label="File"
        />
        <FileMenu
            bind:menuItems={runMenuItems}
            bind:isOpen={isRunMenuOpen}
            closeOthers={handleCloseOthers}
            label="Run"
        />
        <FileMenu
            closeOthers={handleCloseOthers}
            onClick={() => myFlowOpen.set(!$myFlowOpen)}
            label="Flow"
        />
        <FileMenu
            closeOthers={handleCloseOthers}
            onClick={() => configOpen.set(!$configOpen)}
            label="Debug"
        />
    </div>
    <span>{$name}</span>
    <div style="flex: 0 1 auto; min-width: 100px;" />
</div>

<style>
    .menu-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        color: white;
        height: 30px;
        padding: 0 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
    }
    .menus {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 10px;
    }
</style>
