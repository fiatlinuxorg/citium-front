<script>
  export let type;

  let bgColor = {
    road: 'bg-red-500',
    sidewalk: 'bg-blue-500',
    cycling_lane: 'bg-green-500',
    public_transport: 'bg-yellow-500'
  }

  let selectedBgColor = bgColor[type];

  let tooltips = {
    road: 'Impatta la strada',
    sidewalk: 'Impatta il marciapiede',
    cycling_lane: 'Impatta la pista ciclabile',
    public_transport: 'Impatta i trasporti pubblici'
  }

  let tooltipText = tooltips[type];
</script>

<div class="w-6 h-6 p-1 {selectedBgColor} rounded-lg flex items-center justify-center cursor-pointer" title={tooltipText}>
  {#if type === 'road'}
    <img src="icons/road.svg" alt="R" class="w-full" />
  {/if}
  {#if type === 'sidewalk'}
    <img src="icons/sidewalk.svg" alt="S" class="w-full" />
  {/if}
  {#if type === 'cycling_lane'}
    <img src="icons/cycling_lane.svg" alt="C" class="w-full" />
  {/if}
  {#if type === 'public_transport'}
    <img src="icons/public_transport.svg" alt="P" class="w-full" />
  {/if}
</div>