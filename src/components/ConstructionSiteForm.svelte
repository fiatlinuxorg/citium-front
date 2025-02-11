<script lang="ts">
  import ImpactsIcon from "./ImpactsIcon.svelte";
  import { postTo, putTo } from "../lib/manageAuthRequest";
  import { showPopup } from "../lib/showPopup";

  export let type: string = "insert";
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
  export let initial_budget: number;
  export let image_path: string = "";
  export let is_subscribed: boolean = false;
  export let _id: string = "";
  export let size: number = 0;
  export let __v: number = 0;

  function isValidDate(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
  }

  function validateForm(): string | null {
    if (!name) return "Il nome è obbligatorio.";
    if (!description) return "La descrizione è obbligatoria.";
    if (!street) return "La via è obbligatoria.";
    if (!number) return "Il numero civico è obbligatorio.";
    if (!start_date || !isValidDate(start_date)) return "La data di inizio non è valida.";
    if (!end_date || !isValidDate(end_date)) return "La data di fine non è valida.";
    if (new Date(start_date) > new Date(end_date)) return "La data di fine deve essere successiva alla data di inizio.";
    if (initial_budget < 0) return "Il budget iniziale non può essere negativo.";
    return null;
  }

  async function save(e: Event) {
    e.preventDefault();

    let errorMessage = validateForm();
    if (errorMessage) {
      showPopup("E", "Errore di validazione", errorMessage);
      return;
    }

    let imageInput = document.querySelector("input[type=file]") as HTMLInputElement;
    let image = imageInput.files ? imageInput.files[0] : null;

    let formData = new FormData();

    let dateStartYmd = new Date(start_date).toISOString().split('T')[0];
    let dateEndYmd = new Date(end_date).toISOString().split('T')[0];

    formData.append("name", name);
    formData.append("description", description);
    formData.append("street", street);
    formData.append("number", number);
    formData.append("start_date", dateStartYmd);
    formData.append("end_date", dateEndYmd);
    formData.append("impacts_road", impacts_road.toString());
    formData.append("impacts_sidewalk", impacts_sidewalk.toString());
    formData.append("impacts_cycling_lane", impacts_cycling_lane.toString());
    formData.append("impacts_public_transport", impacts_public_transport.toString());
    formData.append("initial_budget", initial_budget.toString());
    formData.append("size", "0");

    if (image) {
        formData.append("image", image);
    }

    let response = await postTo("/sites", formData);

    if (response.status == 201) {
        showPopup("S", "Successo", "Cantiere creato con successo");
        document.querySelector(".fpopup").classList.toggle("hidden");
        window.location.reload();
    } else {
        showPopup("E", "Errore", "Si è verificato un errore. Riprova più tardi.");
    }
  }

  async function edit(e: Event) {
    e.preventDefault();

    let errorMessage = validateForm();
    if (errorMessage) {
      showPopup("E", "Errore di validazione", errorMessage);
      return;
    }

    let imageInput = document.querySelector("input[type=file]") as HTMLInputElement;
    let image = imageInput.files ? imageInput.files[0] : null;

    let formData = new FormData();

    let dateStartYmd = new Date(start_date).toISOString().split('T')[0];
    let dateEndYmd = new Date(end_date).toISOString().split('T')[0];

    formData.append("name", name);
    formData.append("description", description);
    formData.append("street", street);
    formData.append("number", number);
    formData.append("start_date", dateStartYmd);
    formData.append("end_date", dateEndYmd);
    formData.append("impacts_road", impacts_road.toString());
    formData.append("impacts_sidewalk", impacts_sidewalk.toString());
    formData.append("impacts_cycling_lane", impacts_cycling_lane.toString());
    formData.append("impacts_public_transport", impacts_public_transport.toString());
    formData.append("initial_budget", initial_budget.toString());
    formData.append("size", "0");

    if (image) {
        formData.append("image", image);
    }

    let response = await putTo("/sites/" + _id, formData);

    if (response.status == 200) {
        showPopup("S", "Successo", "Cantiere modificato con successo");
        document.querySelector(".fpopup").remove();
        window.location.reload();
    } else {
        showPopup("E", "Errore", "Si è verificato un errore. Riprova più tardi.");
    }
  }

</script>

<div class="fpopup w-full h-full bg-dark absolute top-0 left-0 z-50 bg-opacity-50 flex items-center justify-center p-16">
  <form class="w-1/2 h-full bg-light rounded-lg p-8 flex flex-col items-center overflow-scroll border-2 border-gray relative">
    <div class="close">
      <button class="absolute top-2 right-2 w-10 h-10 bg-primary text-light font-bold rounded-full flex items-center justify-center" on:click={e => {
        e.preventDefault();
        document.querySelector(".fpopup").remove();
      }}>
        <img src="/icons/close.svg" alt="Chiudi" />
      </button>
    </div>
    <h1 class="font-display font-bold text-primary text-4xl">Citium</h1>
    <h1 class="text-4xl xl:text-6xl font-bold mb-4 text-center text-dark font-display">{ type == "insert" ? "Crea un nuovo cantiere" : "Modifica cantiere" }</h1>
    <div class="flex gap-4 w-full mb-2">
      <div class="flex flex-col w-full mb-2">
        <label for="name" class="text-dark mb-1 xl:mb-2">Nome</label>
        <input type="text" bind:value={name} placeholder="Cantiere di via Roma" name="name" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
      <div class="flex flex-col w-full mb-2">
        <label for="initial_budget" class="text-dark mb-1 xl:mb-2">Budget</label>
        <input type="text" bind:value={initial_budget} placeholder="50000" name="initial_budget" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
    </div>
    <div class="flex flex-col w-full mb-2">
      <label for="description" class="text-dark mb-1 xl:mb-2">Descrizione</label>
      <textarea name="description" bind:value={description} placeholder="Descrizione del cantiere" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2"></textarea>
    </div>
    <div class="flex gap-4 w-full mb-2">
      <div class="flex flex-col w-full">
        <label for="street" class="text-dark mb-1 xl:mb-2">Via</label>
        <input type="text" bind:value={street} placeholder="Via Roma" name="street" class="w-full input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
      <div class="flex flex-col w-full mb-2">
        <label for="number" class="text-dark mb-1 xl:mb-2">Numero</label>
        <input type="text" bind:value={number} placeholder="12" name="number" class="w-full input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
    </div>
    <div class="flex gap-4 w-full mb-2">
      <div class="flex flex-col w-full">
        <label for="start_date" class="text-dark mb-1 xl:mb-2">Data inizio</label>
        <input type="date" bind:value={start_date} name="start_date" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
      <div class="flex flex-col w-full">
        <label for="end_date" class="text-dark mb-1 xl:mb-2">Data fine</label>
        <input type="date" bind:value={end_date} name="end_date" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
    </div>
    <div class="flex gap-4 w-full mb-2">
      <div class="flex flex-col w-full">
        <label for="image_path" class="text-dark mb-1 xl:mb-2">Impatto sulla viabilità</label>
        <div class="flex gap-2 w-full">
          <div class="flex flex-col gap-2 w-full">
            <div class="flex w-full items-center gap-2">
              <ImpactsIcon type="road" />
              <input type="checkbox" bind:checked={impacts_road} id="impacts_road" name="impacts_road" class="mr-2" />
              <label for="impacts_road" class="text-dark text-sm">Strada</label>
            </div>
            <div class="flex w-full items-center gap-2">
              <ImpactsIcon type="sidewalk" />
              <input type="checkbox" bind:checked={impacts_sidewalk} id="impacts_sidewalk" name="impacts_sidewalk" class="mr-2" />
              <label for="impacts_sidewalk" class="text-dark text-sm">Marciapiede</label>
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full">
            <div class="flex w-full items-center gap-2">
              <ImpactsIcon type="cycling_lane" />
              <input type="checkbox" bind:checked={impacts_cycling_lane} id="impacts_cycling_lane" name="impacts_cycling_lane" class="mr-2" />
              <label for="impacts_cycling_lane" class="text-dark text-sm">Ciclabile</label>
            </div>
            <div class="flex w-full items-center gap-2">
              <ImpactsIcon type="public_transport" />
              <input type="checkbox" bind:checked={impacts_public_transport} id="impacts_public_transport" name="impacts_public_transport" class="mr-2" />
              <label for="impacts_public_transport" class="text-dark text-sm">Trasporti pubblici</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <label for="image_path" class="text-dark mb-1 xl:mb-2">Immagine</label>
        <input type="file" name="image_path" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
      </div>
    </div>
    <div class="flex w-full mb-2">
      <button type="submit" class="bg-primary w-full px-1 py-2 xl:px-3 xl:py-4 rounded-lg font-bold text-light text-lg" on:click={(e) => {
        if (type === "insert") {
          save(e);
        } else {
          edit(e);
        }
      }}>{ type == "insert" ? "CREA" : "MODIFICA" }</button>
  </form>
</div>