/*
Author: Chris Humboldt
*/

/*
Author: Chris Humboldt
*/

declare module MRocket {
   // Arrays
   interface _Array {
      clean(array: any[]): any[];
      make(values: any, unique?: boolean): any[];
      unque(array: any[]): any[];
   }

   // Basic Checks
   interface _Has {
      class(elm: any, className: string);
      extension(file: string, types?: string[]): boolean;
      spaces(check: any): boolean;
   }

   interface _Is {
      array(check: any): boolean;
      boolean(check: any): boolean;
      browser(): boolean;
      colour(check: string): boolean;
      date(check: any, regExp?: any): boolean;
      element(check: any): boolean;
      email(check: string, regExp?: any): boolean;
      function(check: string): boolean;
      image(check: string, types?: string[]): boolean;
      integer(check: any): boolean;
      json(check: any): boolean;
      number(check: any): boolean;
      object(check: any): boolean;
      password(check: string, regExp?: any): boolean;
      string(check: any): boolean;
      time(check: string, regExp?: any): boolean;
      touch(): boolean;
      url(check: string, regExp?: any): boolean;
   }

   // Classes
   interface _Classes {
      add(elms: any, classNames: any);
      clear(elm: any);
      add(elms: any, classNames: any);
      replace(elm: any, remove: any, add: any);
      toggle(elms: any, classNames: any);
   }

   // Date
   interface _Date {
      basic(date: any, time?: boolean);
      day(date: any, type?: string);
      safe(date: any, time?: boolean);
      month(date: any, type?: string);
      toISO(date: any, fullDate?: any);
      transform(date: any);
      year(date: any, type?: string);
   }

   // Dimensions
   interface _Dimensions {
      height(elm: any): any;
      width(elm: any): any;
   }

   // DOM
   interface _Dom {
      body: any;
      header: any;
      html: any;
      ratio(sel: string, multiplier: number);
      remove(elms: any);
      select(sel: string);
      title: any;
      wallpaper(sel: string);
   }

   // Events
   interface _Events {
      add(elm: any, event: string, func: any);
      remove(elm: any, event: string, func: any);
   }

   // Gets
   interface _Get {
      extension(item: string): string;
      index(elm: any): number;
   }

   // Helpers
   interface _HelperParse {
      json(json: any);
   }
   interface _Helper {
      parse: _HelperParse;
      setDefault(val: any, def: any);
   }

   // ID's
   interface _Id {
      add(elm: any, id: string);
      remove(elm: any, id: string);
   }

   // Inputs
   interface _Input {
      disable(sel: any);
      enable(sel: any);
   }

   // Milliseconds
   interface _Milliseconds {
      hours(int: number): number;
      minutes(int: number): number;
      seconds(int: number): number;
   }

   // Overlay
   interface _Overlay {
      add();
      show();
      hide();
   }

   // Random
   interface _Random {
      integer(max?: number, min?: number): number;
      string(length?: number, text?: boolean): string;
   }

   // Main interface
   export interface Main {
      defaults: any;
      array: _Array;
      exists(check: any): boolean;
      has: _Has;
      is: _Is;
      classes: _Classes;
      clone(item: any);
      date: _Date;
      log(text: any);
      error(text: any);
      dimensions: _Dimensions;
      dom: _Dom;
      events: _Events;
      get: _Get
      helper: _Helper;
      id: _Id;
      input: _Input;
      milliseconds: _Milliseconds;
      overlay: _Overlay;
      random: _Random;
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
