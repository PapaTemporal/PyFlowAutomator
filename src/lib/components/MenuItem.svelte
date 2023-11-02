<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    export let label: string;
    export let disabled: boolean = false;
</script>

<li class="menu-item">
    <button {disabled} class="menu-item-btn" on:click>
        {label}
    </button>
</li>

<style>
    .menu-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #333;
        color: white;
        height: 20px;
        padding: 0 5px 5px 5px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        flex: 0 1 auto;
    }
    .menu-item:hover {
        background-color: #444;
    }
    .menu-item-btn {
        flex: 0 1 auto;
        background-color: unset;
        border: unset;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        cursor: pointer;
    }
    .menu-item-btn:disabled {
        color: #999;
        cursor: not-allowed;
    }
</style>
