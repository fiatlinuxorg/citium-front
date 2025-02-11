<script lang="ts">
  import ImpactsIcon from "./ImpactsIcon.svelte";

  export let name: string = "";
  export let description: string = "";
  export let street: string = "";
  export let number: string = "";
  export let start_date: string = "";
  export let end_date: string = "";
  export let impacts_road: boolean = false;
  export let impacts_sidewalk: boolean = false;
  export let impacts_cycling_lane: boolean = false;
  export let impacts_public_transport: boolean = false;
  export let initial_budget: number = 0;
  export let image_path: string = "";
  export let is_subscribed: boolean = false;
  export let _id: string = "";
  export let size: number = 0;
  export let __v: number = 0;

  let image = image_path ? 'http://localhost:8000/uploads/' + image_path : '/images/default.jpg';

</script>

<div class="dpopup w-full h-full bg-dark absolute top-0 left-0 z-50 bg-opacity-50 flex items-center justify-center p-16">
  <div class="w-1/2 bg-light rounded-lg p-8 flex flex-col items-center overflow-scroll border-2 border-gray relative">
    <div class="close">
      <button class="absolute top-2 right-2 w-10 h-10 bg-primary text-light font-bold rounded-full flex items-center justify-center" on:click={e => {
        e.preventDefault();
        document.querySelector(".dpopup").remove();
      }}>
        <img src="/icons/close.svg" alt="Chiudi" />
      </button>
    </div>
    <h1 class="font-display font-bold text-primary text-4xl">Citium</h1>
    <h1 class="text-4xl xl:text-6xl font-bold mb-4 text-center text-dark font-display">Dettagli</h1>
    <div class="flex justify-between w-full gap-4">
      <div class="w-1/2">
        <img src={image} alt={name} class="w-full h-64 object-cover rounded-lg" />
      </div>
      <div class="w-1/2 flex flex-col justify-between">
        <div>
          <h2 class="font-bold text-2xl text-dark mb-2">{name}</h2>
          <h3 class="text-dark text-lg mb-2">{initial_budget}€</h3>
          <p class="text-dark text-sm mb-2">{street + " " + number}</p>
          <p class="text-dark text-sm mb-2">{start_date.split('T')[0].replaceAll('-', '/')} - {end_date.split('T')[0].replaceAll('-', '/')}</p>
          <p class="text-dark text-sm mb-2">{description}</p>
        </div>
        <div class="flex gap-2">
          {#if impacts_road}
            <ImpactsIcon type="road" />
          {/if}
          {#if impacts_sidewalk}
            <ImpactsIcon type="sidewalk" />
          {/if}
          {#if impacts_cycling_lane}
            <ImpactsIcon type="cycling_lane" />
          {/if}
          {#if impacts_public_transport}
            <ImpactsIcon type="public_transport" />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>