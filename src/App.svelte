<script>
  import { Router, Route } from "svelte-routing";
  import Register from "./routes/Register.svelte";
  import Login from "./routes/Login.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/register" component={Register} />
  <Route path="/login" component={Login} />
</Router>
