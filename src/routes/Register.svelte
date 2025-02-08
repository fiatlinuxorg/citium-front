<script lang="ts">
  import connection from "../lib/connection";
  let errorMessage = "";
  let formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const validateForm = (data: FormData) => {
    let isValid = true;
    formErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    if (!data.get("firstName")) {
      formErrors.firstName = "Il nome è obbligatorio";
      isValid = false;
    } else {
      const name = data.get("firstName") as string;
      if (name.length < 2) {
        formErrors.firstName = "Il nome deve contenere almeno 2 caratteri";
        isValid = false;
      }
    }
    if (!data.get("lastName")) {
      formErrors.lastName = "Il cognome è obbligatorio.";
      isValid = false;
    } else {
      const surname = data.get("lastName") as string;
      if (surname.length < 2) {
        formErrors.lastName = "Il cognome deve contenere almeno 2 caratteri";
        isValid = false;
      }
    }
    const email = data.get("email") as string;
    if (!email) {
      formErrors.email = "L'email è obbligatoria";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "L'email non è valida";
      isValid = false;
    }
    if (!data.get("password")) {
      formErrors.password = "La password è obbligatoria";
      isValid = false;
    } else {
      const password = data.get("password") as string;
      // 8 caratteri, almeno una lettera maiuscola, almeno un numero
      if (!/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(password)) {
        formErrors.password = "La password deve contenere almeno 8 caratteri, una lettera maiuscola e un numero";
        isValid = false;
      }
    }

    return isValid;
  };

  const register = async (event: Event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    const data = new FormData(form);

    if (!validateForm(data)) {
      return; // Non inviare la richiesta se ci sono errori di validazione
    }

    try {
      const response = await connection.post("/register", data);
      switch (response.status) {
        case 201:
          window.location.href = "/login";
          break;
        default:
          errorMessage = response.data.message || "Si è verificato un errore durante la registrazione.";
          break;
      }
    } catch (error) {
      errorMessage = "Si è verificato un errore di rete. Riprova più tardi.";
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
      <h1 class="text-4xl xl:text-6xl font-bold mb-4 text-center text-dark font-display">Ciao!<br>Benvenuto su Citium</h1>
      <form class="flex flex-col">
        <div class="flex flex-col xl:flex-row gap-4 mb-4">
          <div class="flex flex-col w-full">
            <label for="firstName" class="text-dark mb-1 xl:mb-2">Nome</label>
            <input type="text" placeholder="Mario" name="firstName" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
            {#if formErrors.firstName}
              <p class="text-red-500">{formErrors.firstName}</p>
            {/if}
          </div>
          <div class="flex flex-col w-full">
            <label for="lastName" class="text-dark mb-1 xl:mb-2">Cognome</label>
            <input type="text" placeholder="Rossi" name="lastName" class="input mb-1 xl:mb-2 px-1 py-2 xl:px-3 xl:py-4 rounded-lg bg-light border-gray border-2" />
            {#if formErrors.lastName}
              <p class="text-red-500">{formErrors.lastName}</p>
            {/if}
          </div>
        </div>
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
          <button type="submit" class="bg-primary w-full px-1 py-2 xl:px-3 xl:py-4 rounded-lg font-bold text-light text-lg" on:click={register}>Registrati</button>
        </div>
        {#if errorMessage}
          <div class="flex justify-center mb-4">
            <p class="text-red-500 text-center">{errorMessage}</p>
          </div>
        {/if}
        <div class="flex justify-center mb-4">
          <p class="text-dark text-center">Hai già un account? <a href="/login" class="font-bold underline">Accedi</a></p>
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
