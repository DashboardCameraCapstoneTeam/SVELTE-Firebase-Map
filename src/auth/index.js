/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import { auth } from 'config/firebase';
import { authState } from 'rxfire/auth';
import { filter } from 'rxjs/operators';

const loggedIn$ = authState(auth).pipe(filter((user) => !!user)); // Observable only return when user is logged in.
export { loggedIn$ };
export default loggedIn$;
