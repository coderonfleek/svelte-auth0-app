
import createAuth0Client from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from "./store";
import config from "../auth_config"; 
/** Define a default action to perform after authentication */


async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
      });

      return auth0Client
}


async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
      await client.loginWithPopup(options);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    } finally {
        popupOpen.set(false);
    }
    user.set(await client.getUser());
    isAuthenticated.set(true);
  }

  function logout(client) {
    return client.logout();
  }

const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth;