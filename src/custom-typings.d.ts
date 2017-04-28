﻿/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types

npm install @types/node
npm install @types/lodash

 * If you can't find the type definition in the registry we can make an ambient/global definition in
 * this file for now. For example

declare module 'my-module' {
 export function doesSomething(value: string): string;
}

 * If you are using a CommonJS module that is using module.exports then you will have to write your
 * types using export = yourObjectOrFunction with a namespace above it
 * notice how we have to create a namespace that is equal to the function we're
 * assigning the export to

declare module 'jwt-decode' {
  function jwtDecode(token: string): any;
  namespace jwtDecode {}
  export = jwtDecode;
}

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

declare var assert: any;
declare var _: any;
declare var $: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 * in the files such as main.browser.ts or any file within app/
 *

import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the @types
 *
 */

// support NodeJS modules without type definitions
declare module '*';

/*
// for legacy tslint etc to understand rename 'modern-lru' with your package
// then comment out `declare module '*';`. For each new module copy/paste
// this method of creating an `any` module type definition
declare module 'modern-lru' {
  let x: any;
  export = x;
}
*/

// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var HMR: boolean;
declare var System: SystemJS;

interface SystemJS {
  import: (path?: string) => Promise<any>;
}

interface GlobalEnvironment {
  ENV: string;
  HMR: boolean;
  SystemJS: SystemJS;
  System: SystemJS;
}

interface Es6PromiseLoader {
  (id: string): (exportName?: string) => Promise<any>;
}

type FactoryEs6PromiseLoader = () => Es6PromiseLoader;
type FactoryPromise = () => Promise<any>;

type AsyncRoutes = {
  [component: string]: Es6PromiseLoader |
                               Function |
                FactoryEs6PromiseLoader |
                         FactoryPromise
};

type IdleCallbacks = Es6PromiseLoader |
                             Function |
              FactoryEs6PromiseLoader |
                       FactoryPromise ;

interface WebpackModule {
  hot: {
    data?: any,
    idle: any,
    accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
    decline(deps?: any | string | string[]): void;
    dispose(callback?: (data?: any) => void): void;
    addDisposeHandler(callback?: (data?: any) => void): void;
    removeDisposeHandler(callback?: (data?: any) => void): void;
    check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
    status(callback?: (status?: string) => void): void | string;
    removeStatusHandler(callback?: (status?: string) => void): void;
  };
}

interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
    context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeRequireFunction extends Es6PromiseLoader  {}
interface NodeModule extends WebpackModule {}
interface Global extends GlobalEnvironment  {}

// Echoes typings
interface GoogleApiOAuth2TokenObject {
    /**
     * The OAuth 2.0 token. Only present in successful responses
     */
    access_token: string;
    /**
     * Details about the error. Only present in error responses
     */
    error: string;
    /**
     * The duration, in seconds, the token is valid for. Only present in successful responses
     */
    expires_in: string;
    /**
     * The Google API scopes related to this token
     */
    state: string;
}

interface GoogleApiAuthBasic {
    get(): any;
}
interface GoogleAuthCurrentUSerBasicProfile {
    getId(): string;
    getName(): string;
    getGivenName(): string;
    getFamilyName(): string;
    getImageUrl(): string;
    getEmail(): string;
}
interface GoogleAuthResponse {
    access_token: string;
    id_token: string;
    login_hint: string;
    scope: string;
    expires_in: string;
    first_issued_at: string;
    expires_at: string;
}
interface GoogleAuthCurrentUser extends GoogleApiAuthBasic {
    listen(listener: (GoogleUser: any) => any);
    getId(): string;
    isSignedIn(): boolean;
    getBasicProfile(): GoogleAuthCurrentUSerBasicProfile;
    getAuthResponse(): GoogleAuthResponse;
    reloadAuthResponse(): Promise<GoogleAuthResponse>;
}
interface GoogleAuthSignInOptions {
    app_package_name?: string;
    fetch_basic_profile?: boolean;
    prompt?: string;
    scope?: string;
}
interface GoogleAuthResponse extends GoogleApiOAuth2TokenObject {
    isSignedIn: GoogleApiAuthBasic;
    currentUser: GoogleAuthCurrentUser;
    signIn(options?: GoogleAuthSignInOptions): Promise<any>;
    signOut(): Promise<any>;
    disconnect(): void;
}