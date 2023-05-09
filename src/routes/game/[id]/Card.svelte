<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let id: number;
    export let show: boolean = false;
    export let locked: boolean = false;
    const dispatch = createEventDispatcher();

    function clicked() {
      if (locked || show) return;
      show = true;
      dispatch("cardClicked", id); 
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flip-card w-20 h-20" on:click={clicked}>   
    <div class="flip-card-inner" class:flip={show}>
        <div class="flip-card-front">
        </div>
        <div class="flip-card-back flex items-center justify-center">
            <h1>{id}</h1>
        </div>
    </div>
</div>



<style>
.flip-card {
  background-color: transparent;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: red;
}

.flip-card-back {
  background-color: red;
  color: white;
  transform: rotateY(180deg);
}
</style>