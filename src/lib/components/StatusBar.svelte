<!-- This file is licensed under the CC BY-NC-SA 4.0 license.
See https://creativecommons.org/licenses/by-nc-sa/4.0/ for details. -->

<script lang="ts">
    export let status: string = "Ready";
</script>

<div class="status-bar">
    <span style="font-size: x-small;">
        PyFlowAutomatorCore © 2023 by Abinadi Cordova is licensed under CC
        BY-NC-SA 4.0. To view a copy of this license, visit
        http://creativecommons.org/licenses/by-nc-sa/4.0/
    </span>
    <div>
        <span>Status:</span>
        <span>{status}</span>
        <span>Version: 0.0.1</span>
    </div>
</div>

<style>
    .status-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333;
        color: white;
        height: 25px;
        padding: 0 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
    }
</style>
