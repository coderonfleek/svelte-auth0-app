<script>
  import { onMount } from "svelte";
  import auth from "./authService";
  import { isAuthenticated, user } from "./store";

  export let name;

  let auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>

  {#if $isAuthenticated}
    <h3>Logged In</h3>
    <p><button on:click={logout}>Logout</button></p>
  {:else}
    <h3>Please sign in</h3>
    <p><button on:click={login}>Login with Auth0</button></p>
  {/if}
</main>
