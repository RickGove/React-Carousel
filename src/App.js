import React, { lazy, Suspense } from 'react';

import { hot } from 'react-hot-loader';

import { Wrap } from './styled-components';

import Loading from './Loading';

const LazyComp = lazy(() => import('./LazyComp'));

export default hot(module)(function App() {
	return (
		<Wrap>
			<h1>App is your mom - EDIT PACKAGE.JSON with name and description!!</h1>
			<div style={{ height: '5rem' }}>
				<Suspense fallback={<Loading />}>
					<LazyComp />
				</Suspense>
			</div>
		</Wrap>
	);
});
