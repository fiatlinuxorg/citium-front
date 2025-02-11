<script>

  import RoadIcon from '/icons/road.svg';
  import SidewalkIcon from '/icons/sidewalk.svg';
  import CyclingLaneIcon from '/icons/cycling_lane.svg';
  import PublicTransportIcon from '/icons/public_transport.svg';

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

<div class="impacts-{type} w-6 h-6 p-1 {selectedBgColor} rounded-lg flex items-center justify-center cursor-pointer" title={tooltipText}>
  {#if type === 'road'}
    <img src={RoadIcon} alt="R" class="w-full" />
  {/if}
  {#if type === 'sidewalk'}
    <img src={SidewalkIcon} alt="S" class="w-full" />
  {/if}
  {#if type === 'cycling_lane'}
    <img src={CyclingLaneIcon} alt="C" class="w-full" />
  {/if}
  {#if type === 'public_transport'}
    <img src={PublicTransportIcon} alt="P" class="w-full" />
  {/if}
</div>