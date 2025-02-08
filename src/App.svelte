<script>
  import { Router, Route } from "svelte-routing";
  import Register from "./routes/Register.svelte";
  
  export let url = "";
</script>

<Router {url}>
  <Route path="/register" component={Register} />
  
</Router>
