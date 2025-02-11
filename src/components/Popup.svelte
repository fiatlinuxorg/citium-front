<script>

  import CloseIcon from '/icons/close.svg';

  export let type = "I";
  export let title = "Informazione";
  export let message = "Messaggio di informazione.";

  let colors = {
    S: "bg-green-500",
    I: "bg-blue-500",
    E: "bg-red-500",
    W: "bg-yellow-500",
  };

</script>

<div class="popup fixed inset-0 pointer-events-none bg-opacity-50 z-50 flex justify-end items-end transition-all animate-slide-in-right">
  <div class="{ colors[type] } p-8 rounded-lg pointer-events-auto">
    <div class="flex justify-between items-center">
      <h2 class="font-bold text-2xl text-light">{title}</h2>
      <button class="text-light" on:click={() => {
        document.querySelector('.popup').classList.add('opacity-0');
        setTimeout(() => {
          document.querySelector('.popup').remove();
        }, 1000);
      }}>
        <img src={CloseIcon} alt="Chiudi" class="w-6 h-6" />
      </button>
    </div>
    <p class="text-light text-lg mt-4">{message}</p>
  </div>
</div>