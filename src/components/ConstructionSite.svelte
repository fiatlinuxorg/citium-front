<script lang="ts">

  import ImpactsIcon from "./ImpactsIcon.svelte";

  export let _id: string;
  export let name: string;
  export let description: string;
  export const country = "";
  export const region = "";
  export const city = ""
  export let street: string;
  export let number: string;
  export let start_date: string
  export let end_date: string;
  export let impacts_road: boolean;
  export let impacts_sidewalk: boolean;
  export let impacts_cycling_lane: boolean;
  export let impacts_public_transport: boolean;
  export let image_path: string;
  export const size = 0;
  export const __v = 0;

  let start_dmy = new Date(start_date).toLocaleDateString();
  let end_dmy = new Date(end_date).toLocaleDateString();
  let shortenName = name.length > 13 ? name.substring(0, 13) + '...' : name;
  let shortenDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;

  let image = image_path ? 'http://localhost:8000/uploads/' + image_path : '/images/default.jpg';

  function save() {
    // Implement save functionality
    console.log('Save clicked');
  }

  function details() {
    // Implement details functionality
    console.log('Details clicked');
  }
</script>

<div
  id={_id}
  class="max-w-xs w-1/4 rounded-lg overflow-hidden border-2 border-gray relative z-10"
>
  <button
    class="bg-light text-dark font-bold p-2 rounded absolute top-2 right-2 w-10 h-10"
    on:click={save}
    ><img src="icons/save.svg" alt="S" class="w-full h-full" /></button
  >
  <img
    class="w-full h-1/2 object-cover"
    src="{image}"
    alt={name}
  />
  <div class="flex flex-col justify-between h-1/2">
    <div class="px-4 py-4">
      <div class="flex justify-between items-baseline">
        <h2 class="font-bold text-dark text-xl">{shortenName}</h2>
        <p class="text-dark text-sm">{start_dmy} - {end_dmy}</p>
      </div>
      <p class="text-dark opacity-50 text-sm mb-2">{street + " " + number}</p>
      <p class="text-dark text-sm mb-2">{shortenDescription}</p>
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
    <div class="px-4 py-4 flex justify-end">
      <button
        class="bg-primary text-white font-bold py-2 px-4 rounded-lg"
        on:click={details}>DETTAGLI</button
      >
    </div>
  </div>
</div>
