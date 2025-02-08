<script>
  import DashboardLayout from "../layouts/DashboardLayout.svelte";
  import ConstructionSite from "../components/ConstructionSite.svelte";

  import { onMount } from "svelte";
  import { getFrom } from "../lib/manageAuthRequest";
  import connection from "../lib/connection";

  let data = [];

  onMount(async () => {
    if(location.pathname === "/dashboard") {
      const response = await connection.get("/sites");
      data = response.data;
      console.log(data);
    }
  });
</script>

<DashboardLayout>
  <div class="flex h-screen">
    <div
      class="sidebar flex flex-col justify-start h-full w-1/6 border-gray border-r-2 p-8"
    >
      <div class="h-16"></div>
      <h2 class="font-bold text-2xl text-dark mb-2">Filtri</h2>
      <nav class="filters flex flex-col items-start justify-evenly">
        <div class="flex w-full p-4 border-b-2 border-t-2 border-gray">
          <input type="checkbox" id="all" name="all" value="all" class="mr-2" />
          <label for="all" class="text-dark text-sm">Tutti</label>
        </div>
        <div class="flex w-full p-4 border-b-2 border-gray">
          <input
            type="checkbox"
            id="impacts_road"
            name="impacts_road"
            value="impacts_road"
            class="mr-2"
          />
          <label for="impacts_road" class="text-dark text-sm"
            >Impatta strada</label
          >
        </div>
        <div class="flex w-full p-4 border-b-2 border-gray">
          <input
            type="checkbox"
            id="impacts_sidewalk"
            name="impacts_sidewalk"
            value="impacts_sidewalk"
            class="mr-2"
          />
          <label for="impacts_sidewalk" class="text-dark text-sm"
            >Impatta marciapiede</label
          >
        </div>
        <div class="flex w-full p-4 border-b-2 border-gray">
          <input
            type="checkbox"
            id="impacts_cycling_lane"
            name="impacts_cycling_lane"
            value="impacts_cycling_lane"
            class="mr-2"
          />
          <label for="impacts_cycling_lane" class="text-dark text-sm"
            >Impatta ciclabile</label
          >
        </div>
        <div class="flex w-full p-4 border-b-2 border-gray">
          <input
            type="checkbox"
            id="impacts_public_transport"
            name="impacts_public_transport"
            value="impacts_public_transport"
            class="mr-2"
          />
          <label for="impacts_public_transport" class="text-dark text-sm"
            >Impatta trasporti pubblici</label
          >
        </div>
      </nav>
    </div>
    <div class="content w-5/6 overflow-scroll z-10">
      <div class="h-16"></div>
      <div class="search flex border-b-2 border-gray h-16">
        <button class="h-full bg-white flex items-center px-4">
          <img src="icons/search.svg" alt="🔍" class="w-full" />
        </button>
        <input
          type="text"
          placeholder="Cerca cantiere o via"
          class="input w-full py-4 focus:outline-none text-dark"
        />
      </div>
      <div class="p-8">
        <h2 class="font-bold text-2xl text-dark mb-4">Cantieri in corso</h2>
        <div class="flex gap-4 flex-wrap justify-start">
          {#each data as site}
            <ConstructionSite image="images/test.jpg" {...site} />
          {/each}
        </div>
        <hr class="my-8 border-gray" />
        <h2 class="font-bold text-2xl text-dark mb-4">Cantieri terminati</h2>
        <div class="flex gap-4 flex-wrap justify-start">
          {#each data as site}
            <!--<ConstructionSite image="images/test.jpg" {...site} />-->
          {/each}
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>
