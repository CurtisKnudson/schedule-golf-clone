import * as React from 'react';
type NonUndefined<T> = T extends undefined ? never : T;

/*
 * This function is a factory that produces useContext hooks that pass an undefined check.
 * Inspired by the patterns found here: https://kentcdodds.com/blog/how-to-use-react-context-effectively
 *
 * ## Usage Example:
 *
 * ``` // hooks/useSessionContext.ts
 *
 * import { makeContextHook } from '@operator/shared/hooks';
 *
 * export const useSessionContext = makeContextHook(SessionStateContext);
 * ```
 *
 *
 * ``` // MyComponent.tsx
 *
 * const MyComponent = () => {
 *   const session = useSessionContext();
 *   ...
 * }
 * ```
 */
const makeContextHook = <T,>(context: React.Context<T>) => {
  return () => {
    const contextValue = React.useContext(context);
    if (contextValue === undefined) {
      throw new Error('Context must be used within a Context Provider!');
    }
    return contextValue as NonUndefined<T>;
  };
};

export default makeContextHook;
