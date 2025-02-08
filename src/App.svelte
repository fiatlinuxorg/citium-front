<script>
  import { Router, Route } from "svelte-routing";
  import Register from "./routes/Register.svelte";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/register" component={Register} />
  <Route path="/login" component={Login} />
  <Route path="/dashboard" component={Dashboard} />
</Router>
