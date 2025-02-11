<script lang="ts">
  import DashboardLayout from "../layouts/DashboardLayout.svelte";
  import ConstructionSite from "../components/ConstructionSite.svelte";
  import ConstructionSiteForm from "../components/ConstructionSiteForm.svelte";

  import SearchIcon from "/icons/search.svg";

  import { onMount } from "svelte";
  import connection from "../lib/connection";

  let ongoingSites = [];
  let finishedSites = [];
  let user;
  let query = "";

  onMount(async () => {
    if(location.pathname.includes("/dashboard")) {
      const response = await connection.get("/sites");
      let data = response.data.constructionSites;
      ongoingSites = data.filter(site => site.end_date > new Date().toISOString());
      finishedSites = data.filter(site => site.end_date < new Date().toISOString());
      user = response.data.user;
      // if location has also a query, search for it (/dashboard/:query)
      
      if(location.pathname.split("/").length > 2) {
        search(location.pathname.split("/")[2]);
      }
    }

    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
      checkbox.addEventListener("change", filterByImpacts);
    });
  });

  async function search(query) {
    const response = await connection.get(`/sites/${query}`);
    let data = response.data.constructionSites;
    ongoingSites = data.filter(site => site.end_date > new Date().toISOString());
    finishedSites = data.filter(site => site.end_date < new Date().toISOString());
  }

  function filterByImpacts() {
    // filter just by frontend, hide elements that don't match the filter
    console.log("filtering");
    
    let impacts = [];
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
      if((checkbox as HTMLInputElement).checked) {
        impacts.push(checkbox.id);
      }
    });
    let sites = document.querySelectorAll(".construction-site");
    sites.forEach(site => {
      
      let siteImpactsRoad = site.querySelector(".impacts-road");
      let siteImpactsSidewalk = site.querySelector(".impacts-sidewalk");
      let siteImpactsCyclingLane = site.querySelector(".impacts-cycling_lane");
      let siteImpactsPublicTransport = site.querySelector(".impacts-public_transport");
      
      if(impacts.includes("impacts_road") && !siteImpactsRoad) {
        site.classList.add("hidden");
      } else if(impacts.includes("impacts_sidewalk") && !siteImpactsSidewalk) {
        site.classList.add("hidden");
      } else if(impacts.includes("impacts_cycling_lane") && !siteImpactsCyclingLane) {
        site.classList.add("hidden");
      } else if(impacts.includes("impacts_public_transport") && !siteImpactsPublicTransport) {
        site.classList.add("hidden");
      } else {
        site.classList.remove("hidden");
      }
    });
  }

  function resetFilters() {
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });
    document.querySelectorAll(".construction-site").forEach(site => {
      site.classList.remove("hidden");
    });
  }
</script>

<DashboardLayout>
  <div class="flex h-screen">
    <div
      class="sidebar flex flex-col justify-start h-full w-1/6 border-gray border-r-2 p-8"
    >
      <div class="h-16"></div>
      <h2 class="font-bold text-2xl text-dark mb-2">Filtri</h2>
      <nav class="filters flex flex-col items-start justify-evenly">
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
      {#if user && user.role === "admin"}
        <hr class="my-8 border-gray" />
        <h2 class="font-bold text-2xl text-dark mb-2">Admin</h2>
        <div class="flex flex-col items-start justify-evenly gap-4">
          <button class="bg-primary text-light font-bold py-2 px-4 rounded-lg" on:click={() => {
            document.querySelectorAll('.fpopup').forEach(popup => popup.remove());
            let form = new ConstructionSiteForm({
              target: document.body,
              props: {
                type: "insert",
              },
            });
          }}>
            Aggiungi cantiere
          </button>
        </div>
      {/if}
    </div>
    <div class="content w-5/6 overflow-scroll z-10">
      <div class="h-16"></div>
      <form class="search flex border-b-2 border-gray h-16" action="/dashboard/{query}">
        <button type="submit" class="h-full bg-white flex items-center px-4">
          <img src={SearchIcon} alt="🔍" class="w-full" />
        </button>
        <input
          type="text"
          placeholder="Cerca cantiere o via"
          class="input w-full py-4 focus:outline-none text-dark"
          bind:value={query}
        />
      </form>
      <div class="p-8">
        <h2 class="font-bold text-2xl text-dark mb-4">Cantieri in corso</h2>
        <div class="flex gap-4 flex-wrap justify-start">
          {#each ongoingSites as site}
            <ConstructionSite image="images/test.jpg" {...site} role={user?.role} />
          {/each}
        </div>
        <hr class="my-8 border-gray" />
        <h2 class="font-bold text-2xl text-dark mb-4">Cantieri terminati</h2>
        <div class="flex gap-4 flex-wrap justify-start">
          {#each finishedSites as site}
            <ConstructionSite image="images/test.jpg" {...site} role={user?.role} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>
