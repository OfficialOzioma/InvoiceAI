import { AsyncLocalStorage } from 'async_hooks';

const authStorage = new AsyncLocalStorage<any>();

export class Auth {
    /**
     * Set the current authenticated user in the current execution context.
     */
    static setContext(user: any) {
        return authStorage.enterWith(user);
    }

    /**
     * Get the authenticated user.
     */
    static user() {
        return authStorage.getStore();
    }

    /**
     * Get the ID of the authenticated user.
     */
    static id() {
        return this.user()?.id || null;
    }

    /**
     * Check if the user is authenticated.
     */
    static check() {
        return !!this.user();
    }

    /**
     * Determine if the current user is a guest.
     */
    static guest() {
        return !this.check();
    }
}

/**
 * Global helper function similar to Laravel's auth()
 */
export const auth = () => Auth;
