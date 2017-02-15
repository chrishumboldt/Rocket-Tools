/*
Author: Chris Humboldt
*/

/*
Author: Chris Humboldt
*/

declare module MRocket {
   // Basic Checks
   interface Has {
      class(element: any, className: string): any;
      extension(file: string, types?: string[]): boolean;
      spaces(check: any): boolean;
   }

   interface Is {
      array(check: any): boolean;
      boolean(check: any): boolean;
      browser(): boolean;
      colour(check: string): boolean;
   }

   // Main interface
   export interface Main {
      defaults: any;

      // Basic checks
      exists(check: any): any;
      has: Has;
      is: Is;

      // Development
      log(text: any): any;
   }
}

// Declare the module
declare var Rocket: MRocket.Main;


/*
declare module Rocket {
   let defaults: any;

   // Basic checks
   function exists(check: any): any;

   interface has {
      class(element: any, className: any): any;
   }
   let has: has;

   interface is {
      element(check: any): boolean;
      email(check: any): boolean;
      function(check: any): boolean;
      number(check: any): boolean;
      object(check: any): boolean;
      password(check: any): boolean;
      string(check: any): boolean;
      touch(): boolean;
    }
   let is: is;

   // Button
   interface buttonLoaderOptions {
      element?: any;
      parseEvent?: any;
      reveal?: string;
      selector?: string;
      timeout?: number;
   }
   interface button {
      loader(options: buttonLoaderOptions): any;
   }
   let button: button;

   // Classes
   interface classes {
      add(elements: any, classes: any): any;
      remove(elements: any, classes: any): any;
   }
   let classes: classes;

   // Development
   function log(text: any): any;

   // DOM
   interface dom {
      body: any;
      html: any;
      select(target: string): any;
   }
   let dom: dom;

   // Events
   interface event {
      add(element: any, type: string, eventHandle: any): any;
      remove(element: any, type: string, eventHandle: any): any;
   }
   let event: event;

   // Gets
   interface get {
      extension(ext: string): string;
      index(elm: any): number;
   }
   let get: get

   // Helpers
   interface helper {
      setDefault(set: any, defauit: any): any;
   }
   let helper: helper;

   // Request
   interface requestOptions {
      url: string;
      asynch?: boolean;
      data?: any;
      dataForce?: string;
      dataType?: string;
      headers?: string;
      onComplete?: any;
      onError?: any;
      onLoading?: any;
      onStart?: any;
      onSuccess?: any;
      timeout?: number;
      type?: string;
      withCredentials?: boolean;
   }
   interface request {
      delete(options: requestOptions): any;
      get(options: requestOptions): any;
      post(options: requestOptions): any;
      put(options: requestOptions): any;
      run(options: requestOptions): any;
   }
   let request: request;

   // Storage
   interface storage {
      add(key: string, value: any): any;
      clear(): any;
      get(key: string): string;
      remove(key: string): any;
   }
   let storage: storage;

   // Modules
   let flicker: any;
   let form: any;
   let message: any;
}
*/
