import { auth as authHelper } from './src/utils/authHelper';

declare global {
    var auth: typeof authHelper;
}

export {};
