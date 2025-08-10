import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useOnAppForeground = (callback: () => void) => {
	const appState = useRef(AppState.currentState);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				callback();
			}
			appState.current = nextAppState;
		};

		const subscription = AppState.addEventListener(
			'change',
			handleAppStateChange,
		);

		return () => subscription.remove();
	}, [callback]);
};
