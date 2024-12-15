// @ts-nocheck
import { useCallback, useContext, useEffect } from 'react';
import { SpyContext } from './SpyProvider';

function SpyTarget({ name, nodeTransformer, children }) {
	const { targets, registerTarget } = useContext(SpyContext);

	const updateTarget = useCallback((target) => {
		const transformer = nodeTransformer || ((x) => x);
		registerTarget(name, transformer(target));
	}, []);

	useEffect(() => {
		updateTarget();
		window.addEventListener('resize', updateTarget);
		return () => window.removeEventListener('resize', updateTarget);
	}, []);

	return children({ setSpyTarget: updateTarget });
}

export default SpyTarget;
