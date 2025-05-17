/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare namespace React {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type Key = string | number;

  interface RefObject<T> {
    readonly current: T | null;
  }

  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  type RefCallback<T> = (instance: T | null) => void;

  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

  interface ComponentClass<P = {}, S = {}> extends StaticLifecycle<P, S> {
    new(props: P, context?: any): Component<P, S>;
    propTypes?: WeakValidationMap<P> | undefined;
    contextType?: Context<any> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    childContextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }

  interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
    defaultProps?: Partial<P> | undefined;
  }

  interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
    displayName?: string | undefined;
  }

  interface ExoticComponent<P = {}> {
    (props: P): ReactElement | null;
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    [key: string]: any;
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: 'submit' | 'reset' | 'button';
    value?: string | ReadonlyArray<string> | number;
  }

  interface DOMAttributes<T> {
    children?: ReactNode | undefined;
    dangerouslySetInnerHTML?: { __html: string } | undefined;
    [key: string]: any;
  }

  interface AriaAttributes {
    [key: string]: any;
  }

  interface RefAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined;
  }

  interface Attributes {
    key?: Key | null | undefined;
  }

  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);

  class Component<P = {}, S = {}, SS = any> {
    constructor(props: P, context?: any);
    render(): ReactNode;
    readonly props: Readonly<P>;
    state: Readonly<S>;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
  }

  type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
  type ReactFragment = Iterable<ReactNode>;

  interface WeakValidationMap<T> {
    [key: string]: any;
  }

  interface ValidationMap<T> {
    [key: string]: any;
  }

  interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string | undefined;
  }

  interface Provider<T> {
    new(props: ProviderProps<T>): Component<ProviderProps<T>>;
  }

  interface Consumer<T> {
    new(props: ConsumerProps<T>): Component<ConsumerProps<T>>;
  }

  interface ProviderProps<T> {
    value: T;
    children?: ReactNode | undefined;
  }

  interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
  }

  interface StaticLifecycle<P, S> {
    getDerivedStateFromProps?: (props: Readonly<P>, state: Readonly<S>) => Partial<S> | null;
    getDerivedStateFromError?: (error: any) => Partial<S> | null;
  }

  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ForwardRefExoticComponent<P & React.RefAttributes<T>>;
}

declare module '@radix-ui/react-slot' {
  import * as React from 'react';
  
  export interface SlotProps {
    children?: React.ReactNode;
    className?: string;
    [key: string]: any;
  }
  
  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
}

declare module 'class-variance-authority' {
  export type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];
  
  export function cva(
    base: string,
    config: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
      compoundVariants?: Array<Record<string, any> & { class: string }>;
    }
  ): (props?: Record<string, any>) => string;
}
