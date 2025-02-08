<script lang="ts">
  import connection from "../lib/connection";
  import { navigate } from "svelte-routing";

  let errorMessage = "";
  let formErrors = {
    email: "",
    password: ""
  };

  const validateForm = (data) => {
    let isValid = true;
    formErrors = {
      email: "",
      password: ""
    };

    const email = data.get("email") as string;
    if (!email) {
      formErrors.email = "L'email è obbligatoria.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "L'email non è valida.";
      isValid = false;
    }

    if (!data.get("password")) {
      formErrors.password = "La password è obbligatoria.";
      isValid = false;
    }

    return isValid;
  };

  const login = async (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    const data = new FormData(form);

    if (!validateForm(data)) {
      return; // Non inviare la richiesta se ci sono errori di validazione
    }

    try {
      const response = await connection.post("/login", data);

      switch (response.status) {
        case 200:
          console.log(response.data);
          navigate("/dashboard");
          break;
        case 400:
          errorMessage = "Credenziali non valide.";
          break;
        default:
          errorMessage = "Si è verificato un errore. Riprova più tardi.";
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          errorMessage = "Credenziali non valide.";
          break;
        default:
          errorMessage = "Si è verificato un errore di rete. Riprova più tardi.";
          break;
      }
    }
  };
</script>

<div class="flex w-full h-screen">
  <div class="decoration w-1/2 h-full bg-primary rounded-r-lg hidden xl:block">
    <div class="masked-image w-full h-full" style="background-image: url('/images/dots_vertical.png');"></div>
  </div>
  <div class="w-full xl:w-1/2 h-full flex flex-col items-center justify-evenly">
    <h1 class="font-display font-bold text-primary text-4xl">Citium</h1>
    <div class="w-full xl:w-2/3 p-4 xl:p-0">
      <h1 class="text-4xl xl:text-6xl font-bold mb-4 text-center text-dark font-display">Ciao!<br>Bentornato su Citium</h1>
      <form class="flex flex-col" on:submit={login}>
        <div class="flex mb-4">
          <div class="flex flex-col w-full">
            <label for="email" class="text-dark mb-1 xl:mb-2">Email</label>
            <input type="email" placeholder="mariorossi@mail.com" name="email" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
            {#if formErrors.email}
              <p class="text-red-500">{formErrors.email}</p>
            {/if}
          </div>
        </div>
        <div class="flex mb-4">
          <div class="flex flex-col w-full">
            <label for="password" class="text-dark mb-1 xl:mb-2">Password</label>
            <input type="password" placeholder="************" name="password" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
            {#if formErrors.password}
              <p class="text-red-500">{formErrors.password}</p>
            {/if}
          </div>
        </div>
        <div class="flex mb-4">
          <button type="submit" class="bg-primary w-full px-1 py-2 xl:px-3 xl:py-4 rounded-lg font-bold text-light text-lg">ACCEDI</button>
        </div>
        {#if errorMessage}
          <div class="flex justify-center mb-4">
            <p class="text-red-500 text-center">{errorMessage}</p>
          </div>
        {/if}
        <div class="flex justify-center mb-4">
          <p class="text-dark text-center">Non hai un account? <a href="/register" class="font-bold underline">Registrati</a></p>
        </div>
      </form>
    </div>
    <div></div>
  </div>
</div>

<style>
  .masked-image {
    -webkit-mask-image: radial-gradient(circle, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    mask-image: radial-gradient(circle, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%);
    -webkit-mask-size: cover;
    mask-size: cover;
  }
</style>

