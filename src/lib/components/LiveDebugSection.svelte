<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import type { Node, Edge } from "@xyflow/svelte";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

    import DebugOpen from "$lib/icons/DebugOpen.svelte";
    import DebugClose from "$lib/icons/DebugClose.svelte";

    import type { Variable } from "$lib/types";

    let monaco: typeof import("monaco-editor");
    let editor: import("monaco-editor").editor.IStandaloneCodeEditor;
    let model: import("monaco-editor").editor.ITextModel;
    let editorElement: HTMLDivElement;

    export let nodes: Writable<Node[]> = writable([]);
    export let edges: Writable<Edge[]> = writable([]);
    export let variables: Writable<Variable> = writable({});

    $: currentFlow = {
        start_id: $edges.find((edge) => edge.source == "start")?.target,
        nodes: $nodes,
        edges: $edges,
        variables: $variables,
    };

    const loadEditor = async () => {
        self.MonacoEnvironment = {
            getWorker: function (_moduleId, label) {
                if (label === "json") {
                    return new jsonWorker();
                }
                return new editorWorker();
            },
        };

        monaco = await import("monaco-editor");

        editor = monaco.editor.create(editorElement, {
            value: "/* Flow JSON */",
            language: "json",
            readOnly: true,
            theme: "vs-dark",
            minimap: {
                enabled: false,
            },
            contextmenu: false,
            lineNumbers: "off",
        });

        model = monaco.editor.createModel(
            JSON.stringify(currentFlow, null, 4),
            "json"
        );
        editor.setModel(model);
    };

    $: {
        model?.setValue(JSON.stringify(currentFlow, null, 4));
    }

    let debugOpen = false;
</script>

{#if debugOpen}
    <DebugClose
        color="white"
        style="position:absolute; right: 10px; top: 8px; cursor: pointer; border: unset; background-color: unset; display: flex; justify-content: center; align-items: center;"
        onClick={() => (debugOpen = false)}
    />
    <div class="header">Debug - JSON</div>
    <div id="monaco-editor-wrapper" bind:this={editorElement} />
    {#await loadEditor()}
        <div>Loading...</div>
    {/await}
{:else}
    <DebugOpen
        color="black"
        style="position:absolute; right: 10px; top: 8px; cursor: pointer; border: unset; background-color: unset; display: flex; justify-content: center; align-items: center;"
        onClick={() => (debugOpen = true)}
    />
{/if}

<style>
    #monaco-editor-wrapper {
        width: 500px;
        height: 500px;
        overflow: hidden;
        border-radius: 0 0 5px 5px;
    }
    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        border-radius: 5px 5px 0 0;
        color: white;
    }
</style>
