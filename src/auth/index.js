/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { writable } from 'svelte/store';

const authStore = writable < {
  isLoggedIn,
  user,
  firebaseControlled,
} > ({
  isLoggedIn: false,
  firebaseControlled: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};
