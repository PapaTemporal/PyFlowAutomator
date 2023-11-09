<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { getContext, onMount, onDestroy } from "svelte";
    import type { Writable } from "svelte/store";
    import type { NodeExt, Variable } from "$lib/types";
    import type { Edge } from "@xyflow/svelte";
    import Bars from "$lib/icons/Bars.svelte";
    import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

    const id: Writable<string> = getContext("id");
    const name: Writable<string> = getContext("name");
    const nodes: Writable<NodeExt[]> = getContext("nodes");
    const edges: Writable<Edge[]> = getContext("edges");
    const variables: Writable<Variable> = getContext("variables");
    const configOpen: Writable<boolean> = getContext("configOpen");

    $: open = $configOpen;

    let monaco: typeof import("monaco-editor");
    let editor: import("monaco-editor").editor.IStandaloneCodeEditor;
    let model: import("monaco-editor").editor.ITextModel;
    let editorElement: HTMLDivElement;
    let resizeObserver: ResizeObserver;

    onMount(() => {
        resizeObserver = new ResizeObserver(() => {
            if (editor) {
                editor.layout();
            }
        });
        if (editorElement) {
            resizeObserver.observe(editorElement);
        }
    });

    onDestroy(() => {
        if (editorElement && resizeObserver) {
            resizeObserver.unobserve(editorElement);
            resizeObserver.disconnect();
        }
    });

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
            JSON.stringify(
                {
                    id: $id,
                    name: $name,
                    nodes: $nodes,
                    edges: $edges,
                    variables: $variables,
                },
                null,
                4
            ),
            "json"
        );
        editor.setModel(model);
    };

    $: {
        model?.setValue(
            JSON.stringify(
                {
                    id: $id,
                    name: $name,
                    nodes: $nodes,
                    edges: $edges,
                    variables: $variables,
                },
                null,
                4
            )
        );
    }
</script>

<aside class="panel" class:open>
    {#if open}
        <div class="header">
            <Bars
                color="white"
                style="cursor: pointer; border: unset; background-color: unset;"
                onClick={() => configOpen.set(false)}
            />Debug - JSON
        </div>
        <div id="monaco-editor-wrapper" bind:this={editorElement} />
        {#await loadEditor()}
            <div>Loading...</div>
        {/await}
    {/if}
</aside>

<style>
    #monaco-editor-wrapper {
        width: 100%;
        height: calc(100% - 35px);
        overflow: hidden;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        border-radius: 5px 5px 0 0;
        color: white;
    }
    .panel {
        width: 0px;
        flex-direction: column;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3;
        transition: width 0.2 ease;
        overflow: auto;
    }

    .panel.open {
        width: 700px;
    }
</style>
