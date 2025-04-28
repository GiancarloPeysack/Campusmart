/**
 * Used for navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import * as React from 'react';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

// Define the type for the navigation reference
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * Navigate to a specific screen with optional parameters.
 * @param name - Name of the screen.
 * @param params - Optional parameters for the screen.
 */
export function navigate(name: string, params?: Record<string, any>): void {
  navigationRef.current?.navigate(name, params);
}

/**
 * Navigate and reset the navigation state to a new route stack.
 * @param routes - Array of route objects.
 * @param index - The index of the active route.
 */
export function navigateAndReset(
  routes: Array<{ name: string; params?: Record<string, any> }> = [],
  index: number = 0
): void {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  );
}

/**
 * Navigate and reset the navigation state to a single screen.
 * @param name - Name of the screen.
 * @param index - The index of the active route.
 */
export function navigateAndSimpleReset(name: string, index: number = 0): void {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name }],
    })
  );
}

/**
 * Go back to the previous screen.
 */
export function goBack(): void {
  navigationRef.current?.goBack();
}
