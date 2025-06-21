import React, { ComponentType, Suspense } from "react";

export interface WithSuspenseProps {
  fallback?: React.ReactNode;
}

interface WithSuspenseOptions {
  fallback?: React.ReactNode;
}

/**
 * HOC (Higher-Order Component) for wrapping a component with Suspense.
 * @param Component - The React component to wrap.
 * @param options - Optional configuration for the HOC.
 * @returns Wrapped component with Suspense.
 */
export const WithSuspense = <P extends object>(
  Component: ComponentType<P>,
  options?: WithSuspenseOptions,
) => {
  const defaultFallback = options?.fallback || <></>;

  const WrappedComponent = (props: P & WithSuspenseProps) => {
    const { fallback = defaultFallback, ...restProps } = props;

    return (
      <Suspense fallback={fallback}>
        <Component {...(restProps as P)} />
      </Suspense>
    );
  };

  WrappedComponent.displayName = `WithSuspense(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
