import React from 'react';

import Carousel from './Carousel';

import { hot } from 'react-hot-loader';

export default hot(module)(function App() {
	return (
		<Carousel>
			<h1>1</h1>
			<h1>2</h1>
			<h1>3</h1>
			<h1>4</h1>
			<img src="https://i.pinimg.com/originals/70/49/c4/7049c4667032d2d79a67d9cb4e128884.jpg" />
			<img src="https://i.pinimg.com/originals/94/da/82/94da82a8a85a3c15506f3bf4d95298ea.jpg" />
			<img src="https://i.pinimg.com/originals/97/b8/dd/97b8dd6020ff7cba2949d03c36844f66.png" />
			<img src="https://s3951.pcdn.co/wp-content/uploads/2010/08/Davidson3-300x300.jpg" />
		</Carousel>
	);
});
