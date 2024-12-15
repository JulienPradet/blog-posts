import React, { createContext, useCallback, useMemo, useState } from 'react';

export const SpyContext = createContext({
	targets: {},
	/**
	 * @param {string} _key
	 * @param {unknown} _value
	 */
	registerTarget: (_key, _value) => {}
});

/**
 * @param {Object} param0
 * @param {import('react').ReactNode} param0.children
 */
function SpyProvider({ children }) {
	const [targets, setTargets] = useState({});
	const registerTarget = useCallback(
		/**
		 *
		 * @param {string} key
		 * @param {unknown} target
		 */
		(key, target) => {
			setTargets((oldTargets) => ({
				...oldTargets,
				[key]: target
			}));
		},
		[]
	);

	const contextValue = useMemo(() => {
		return {
			registerTarget,
			targets
		};
	}, []);

	return <SpyContext.Provider value={contextValue}>{children}</SpyContext.Provider>;
}

export default SpyProvider;
