<script>
  export let title = "Conferma";
  export let message = "Sei sicuro di voler eliminare questo cantiere?";
  export let onConfirm;
</script>

<div class="confirm fixed inset-0 bg-dark bg-opacity-50 flex justify-center items-center z-50">
  <div class="bg-light p-8 rounded-lg w-1/3">
    <h2 class="text-2xl font-bold text-dark mb-4">{ title }</h2>
    <p class="text-dark text-lg mb-4">{ message }</p>
    <div class="flex justify-end gap-4">
      <button class="border-gray border-2 text-dark px-4 py-2 rounded-lg" on:click={() => {
        document.querySelector('.confirm').remove();
      }}>Annulla</button>
      <button class="bg-primary text-light px-4 py-2 rounded-lg" on:click={async () => {
        await onConfirm();
        document.querySelector('.confirm').remove();
      }}>Conferma</button>
    </div>
  </div>
</div>  