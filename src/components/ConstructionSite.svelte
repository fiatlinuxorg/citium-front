<script lang="ts">

  import ImpactsIcon from "./ImpactsIcon.svelte";
  import connection from "../lib/connection";
  import ConstructionSiteForm from "./ConstructionSiteForm.svelte";
  import Details from './Details.svelte';
  import { deleteFrom } from "../lib/manageAuthRequest";
  import { showPopup, showConfirmation } from "../lib/showPopup";

  import SaveIcon from "/icons/save.svg";
  import SavedIcon from "/icons/saved.svg";
  import EditIcon from "/icons/edit.svg";
  import DeleteIcon from "/icons/delete.svg";

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
  export let is_subscribed: boolean = false;
  export let initial_budget;
  export let role = "user";
  export const size = 0;
  export const __v = 0;

  let start_dmy = new Date(start_date).toLocaleDateString();
  let end_dmy = new Date(end_date).toLocaleDateString();
  let shortenName = name.length > 13 ? name.substring(0, 13) + '...' : name;
  let shortenDescription = description.length > 45 ? description.substring(0, 45) + '...' : description;

  let image = image_path ? 'http://localhost:8000/uploads/' + image_path : '/images/default.jpg';

  async function save() {
    if(is_subscribed) {
      try {
        let response = await connection.delete('/subscriptions/unsubscribe/' + _id);
        if (response.status === 204) {
          is_subscribed = !is_subscribed;
        } else {
          showPopup('E', 'Errore', 'Devi essere registrato per salvare un cantiere');
        }
      } catch (error) {
        showPopup('E', 'Errore', 'Devi essere registrato per salvare un cantiere');
      }
      return;
    } else {
      try {
        let response = await connection.post('/subscriptions/subscribe', { construction_site_id: _id });
        if (response.status === 201) {
          is_subscribed = !is_subscribed;
        } else {
          showPopup('E', 'Errore', 'Devi essere registrato per salvare un cantiere');
        }
      } catch (error) {
        showPopup('E', 'Errore', 'Devi essere registrato per salvare un cantiere');
      }
    }
  }

  async function deleteConstructionSite(id) {
    try {
      let response = await deleteFrom('/sites/' + id);
      if (response.status === 204) {
        document.getElementById(id).remove();
        showPopup('S', 'Successo', 'Cantiere eliminato con successo');
      } else {
        showPopup('E', 'Errore', 'Si è verificato un errore');
      }
    } catch (error) {
      showPopup('E', 'Errore', 'Si è verificato un errore');
    }
  }

  function showConstructionSiteFormWithParams() {
    let form = new ConstructionSiteForm({
      target: document.body,
      props: {
        type: "update",
        _id,
        name,
        description,
        street,
        number,
        start_date,
        end_date,
        impacts_road,
        impacts_sidewalk,
        impacts_cycling_lane,
        impacts_public_transport,
        initial_budget: initial_budget,
        image_path,
        is_subscribed,
        size,
        __v
      }
    });
  }

  function details() {
    let details = new Details({
      target: document.body,
      props: {
        name,
        description,
        street,
        number,
        start_date,
        end_date,
        impacts_road,
        impacts_sidewalk,
        impacts_cycling_lane,
        impacts_public_transport,
        initial_budget: initial_budget,
        image_path,
        is_subscribed,
        _id,
        size,
        __v
      }
    });
  }
</script>

<div
  id={_id}
  class="construction-site max-w-xs h-full w-1/4 rounded-lg overflow-hidden border-2 border-gray relative z-10"
>
  <button
    class="{!is_subscribed ? 'bg-light' : 'bg-primary'} font-bold p-2 rounded absolute top-2 right-2 w-10 h-10 transition-all"
    on:click={save}
    ><img src={is_subscribed ? SavedIcon : SaveIcon} alt="S" class="w-full h-full hover:animate-shake" style="fill: white !important;" /></button
  >
  <img
    class="w-full h-1/2 max-h-64 object-cover"
    src="{image}"
    alt={name}
  />
  <div class="flex flex-col justify-between h-1/2">
    <div class="px-4 py-4">
      <div class="flex justify-between items-baseline">
        <h2 class="site-name font-bold text-dark text-xl">{shortenName}</h2>
        <p class="text-dark text-xs">{start_dmy} - {end_dmy}</p>
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
    <div class="px-4 py-4 flex justify-between items-center">
      <div class="flex gap-2">
      {#if role === 'admin'}
        <button class="border-2 border-gray font-bold p-2 rounded-lg w-10 h-10 transition-all" title="Elimina" on:click={()=>{
          let thisConstructionSite = document.getElementById(_id);
          let thisConstructionSiteName = thisConstructionSite.querySelector('.site-name').textContent;
          showConfirmation('Elimina "' + thisConstructionSiteName + '"', 'Sei sicuro di voler eliminare questo cantiere?', async () =>{
            await deleteConstructionSite(_id);
          });
        }}>
          <img src={DeleteIcon} alt="S" class="w-full h-full hover:animate-shake" />
        </button>
        <button class="border-2 border-gray font-bold p-2 rounded-lg w-10 h-10 transition-all" title="Modifica" on:click={()=>{
          showConstructionSiteFormWithParams();
        }}>
          <img src={EditIcon} alt="S" class="w-full h-full hover:animate-shake" />
        </button>
      {/if}
      </div>
      <button
        class="bg-primary text-white font-bold py-2 px-4 rounded-lg"
        on:click={details}>DETTAGLI</button
      >
    </div>
  </div>
</div>
