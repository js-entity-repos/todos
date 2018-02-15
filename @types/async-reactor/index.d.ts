declare module 'async-reactor' {
  import { Component } from "react";
  export const asyncReactor: <P, C>(
    component: (props: P) => Promise<C>,
    loader?: Component,
    error?: Component
  ) => (props: P) => C;
}
