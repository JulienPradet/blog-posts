// @ts-nocheck
import { useContext } from 'react';
import { SpyContext } from './SpyProvider';

const SpySubscriber = ({ children }) => {
	const { targets } = useContext(SpyContext);

	return children(targets);
};

export default SpySubscriber;
