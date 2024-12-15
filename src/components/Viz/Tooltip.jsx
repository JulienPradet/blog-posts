// @ts-nocheck
import React from 'react';

const MAX_WIDTH = 250;

const Tooltip = (props) => {
	return (
		<div
			onMouseEnter={() =>
				props.onMouseEnter({
					offset: props.offset,
					value: props.value,
					color: props.color
				})
			}
			onMouseLeave={() => props.onMouseLeave()}
			style={{
				position: 'absolute',
				width: MAX_WIDTH,
				top: props.offset.top + 5,
				left: props.offset.left - MAX_WIDTH / 2,
				background: '#fff',
				border: `1px solid ${props.color}`,
				borderRadius: '4px',
				zIndex: 2,
				padding: '1em',
				overflow: 'auto'
			}}
		>
			<pre style={{ margin: 0 }}>
				{typeof props.value === 'string' ? props.value : JSON.stringify(props.value, null, 2)}
			</pre>
		</div>
	);
};

export default Tooltip;
