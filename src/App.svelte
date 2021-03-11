<script>
    import { onMount } from "svelte";

    import { writable } from "svelte/store";
    import { movement, rotate } from "./utils";
    import SvgUtil from "./SvgUtil.svelte";

    const position = writable([
        {
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            degre: 0,
            id: "asdas",
            name: "valve",
        },
        {
            x: 200,
            y: 200,
            width: 150,
            height: 150,
            degre: 0,
            id: "asdas",
            name: "gauge",
        },
    ]);
    let container;

    function movementStart(event, index) {
        $position[index].x = $position[index].x;
        $position[index].y = $position[index].y;
    }
    function movementEnd(event, index) {
        $position[index].x = $position[index].x;
        $position[index].y = $position[index].y;
    }
    function move(event, index) {
        let x, y, dx, dy;
        dx = event.detail.dx;
        dy = event.detail.dy;
        x = $position[index].x;
        y = $position[index].y;

        $position[index].x = x + dx;
        $position[index].y = y + dy;
    }
    function rotationStart(event, index) {
        $position[index].degre = $position[index].degre;
    }

    function handleRotation(event, index) {
        $position[index].degre = event.detail.angle.toFixed(0);
    }
    onMount(() => {
        container = document.getElementById("container");
    });
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
    />
</svelte:head>
<button
    on:click={() => {
        console.log($position);
    }}>showValues</button
>

<div class="moving-container" id="container">
    {#each $position as posis, i}
        <div
            class="item"
            use:movement
            on:movementstart={(event) => {
                movementStart(event, i);
            }}
            on:movement={(event) => {
                move(event, i);
            }}
            on:movementend={(event) => {
                movementEnd(event, i);
            }}
            style="transform:translate({posis.x}px,{posis.y}px) rotate({posis.degre}deg); --width:{posis.width}; --height:{posis.height}; "
        >
            <div class="resize">
                <div class="top-left" />
                <div class="top-right" />
                <div class="bottom-right" />
                <div class="bottom-left" />
                <div />
                <div />
            </div>
            <div class="debug">
                x: {posis.x}px, y: {posis.y}px,degre: {posis.degre}deg, height: {posis.height},
                width: {posis.width}
            </div>
            <div class="rotate">
                <i
                    class="fas fa-redo-alt"
                    use:rotate={posis}
                    on:rotatesstart={rotationStart}
                    on:rotating={(event) => {
                        handleRotation(event, i);
                    }}
                />
            </div>
            <div class="point" />
            <SvgUtil
                height={posis.height}
                width={posis.width}
                name={posis.name}
            />
        </div>
    {/each}
</div>

<style>
    .resize > .top-left {
        position: absolute;
        top: 0;
        left: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }
    .resize > .top-right {
        position: absolute;
        top: 0;
        right: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }
    .resize > .bottom-left {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }
    .resize > .bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }

    .resize > .middle-left {
        top: 0;
        left: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }
    .resize > .middle-right {
        top: 0;
        left: 0;
        background-color: blue;
        width: 5px;
        height: 5px;
    }
    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .moving-container {
        height: 99.6vh;
        width: 99.6vw;
        border: 1px dashed black;
        overflow: hidden !important;
    }
    .rotate {
        position: absolute;
        top: -50px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .rotate i {
        cursor: grab;
    }
    .debug {
        position: absolute;
        bottom: -60px;
    }
    .moving-container > .item {
        position: absolute;
        width: var(--width);
        height: var(--height);
        left: calc(50% - var(--width) / 2);
        top: calc(50% - var(--height) / 2);
        border-radius: 4px;

        cursor: move;
        z-index: 1;
    }

    .point {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        margin: auto;

        background-color: red;
    }
    :global(body) {
        padding: 0 !important;
    }
</style>
