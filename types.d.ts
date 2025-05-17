// Type declarations for modules without type definitions

declare module 'react' {
  export interface ButtonHTMLAttributes<T> {
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
    [key: string]: any;
  }
  
  export interface RefAttributes<T> {
    ref?: React.Ref<T>;
  }
  
  export type Ref<T> = ((instance: T | null) => void) | React.RefObject<T> | null;
  export type RefObject<T> = { current: T | null };
  export type ReactNode = React.ReactElement | string | number | boolean | null | undefined;
  
  export interface ForwardRefExoticComponent<P> {
    (props: P): React.ReactElement | null;
    displayName?: string;
  }
  
  export function forwardRef<T, P>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null): 
    ForwardRefExoticComponent<P & RefAttributes<T>>;
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
