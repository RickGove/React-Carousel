import React from 'react';

import Carousel from './Carousel';

import { hot } from 'react-hot-loader';

export default hot(module)(function App() {
	return (
		<Carousel>
			<img
				alt="pic1"
				src="https://pbs.twimg.com/profile_images/1098225250469326848/2KN00JjZ_400x400.png"
			/>
			<img
				alt="pic1"
				src="https://images.all-free-download.com/images/graphicthumb/hd_picture_of_the_beautiful_natural_scenery_03_166249.jpg"
			/>
			<img
				alt="pic1"
				src="http://www.lovethispic.com/uploaded_images/153035-Beautiful-Winter-Night.jpg"
			/>
			<div
				style={{
					background: '#44475a',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<h1>Thanks</h1>
			</div>
			<div
				style={{
					background: '#6272a4',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<h1>For</h1>
			</div>
			<div
				style={{
					background: '#44475a',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<h1>Looking</h1>
			</div>
			<div
				style={{
					background: '#6272a4',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<h1>!!!!</h1>
			</div>
		</Carousel>
	);
});
