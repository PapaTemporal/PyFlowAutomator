<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { getContexts } from "./context";
    import Menu from "./Menu.svelte";
    import { getFlowMenuItems, getRunMenuItems, openMenu } from "./menuItems";

    const {
        id,
        name,
        nodes,
        edges,
        variables,
        configOpen,
        myFlowOpen,
        liveRunOpen,
    } = getContexts();

    const dispatch = createEventDispatcher();

    const updatableMenuItems: string[] = [
        "Save Flow",
        "Save Flow As...",
        "Save Flow to Clipboard",
        "Clear Flow",
        "Close Flow",
    ];

    let flowMenuItems = getFlowMenuItems(
        {
            id,
            name,
            nodes,
            edges,
            variables,
        },
        dispatch
    );

    let runMenuItems = getRunMenuItems({
        id,
        name,
        nodes,
        edges,
        variables,
        liveRunOpen,
    });

    function handleMenuClick(menu: string | null) {
        if ($openMenu === menu) {
            openMenu.set(null);
            window.removeEventListener("click", handleClickOutside);
        } else {
            openMenu.set(menu);
            window.addEventListener("click", handleClickOutside);
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            event.target &&
            event.target instanceof Element &&
            event.target.closest(".menu")
        ) {
            return;
        }
        openMenu.set(null);
        window.removeEventListener("click", handleClickOutside);
    }

    function handleButtonClick(panel: string) {
        if (panel === "config") {
            configOpen.set(!$configOpen);
        } else if (panel === "myFlow") {
            myFlowOpen.set(!$myFlowOpen);
        }
        openMenu.set(null);
    }

    function updateFlowMenuItems(flow_id: string) {
        let currentFlowMenuItems = $flowMenuItems;

        for (let item of currentFlowMenuItems) {
            if (updatableMenuItems.includes(item.label)) {
                if (flow_id !== "") {
                    item.disabled = false;
                } else {
                    item.disabled = true;
                }
            }
        }

        flowMenuItems.set(currentFlowMenuItems);
    }

    $: {
        updateFlowMenuItems($id);
    }
</script>

<div class="menu-bar">
    <div class="menus">
        <Menu menuItems={flowMenuItems} {handleMenuClick} menuLabel="File" />
        {#if $id !== ""}
            <Menu menuItems={runMenuItems} {handleMenuClick} menuLabel="Run" />
            <div class="menu">
                <button
                    class="menu-btn"
                    on:click={() => handleButtonClick("myFlow")}
                >
                    Flow
                </button>
            </div>
            <div class="menu">
                <button
                    class="menu-btn"
                    on:click={() => handleButtonClick("config")}
                >
                    Debug
                </button>
            </div>
        {/if}
    </div>
    <span>
        {#if $id !== ""}
            <input class="filename" bind:value={$name} />
        {/if}
    </span>
</div>

<style>
    .filename {
        width: fit-content;
        background-color: unset;
        color: white;
        border: unset;
        text-align: right;
        padding-right: unset;
        margin-right: unset;
    }
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
        height: 100%;
    }
    .menu {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .menu-btn {
        background-color: unset;
        border: unset;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        cursor: pointer;
        padding: 0 10px;
        height: 100%;
    }
    .menu-btn:hover {
        background-color: #555;
    }
</style>
