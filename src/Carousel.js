import React, { useRef, useState, useEffect } from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CarouselDiv = styled.div`
	-ms-overflow-style: none;
	-webkit-overflow-scrolling: touch;
	cursor: grab;
	display: grid;
	grid-template-columns: repeat(50, 20rem);
	height: 20rem;
	overflow-y: scroll;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
	scrollbar-width: none;

	.grabbing {
		cursor: grabbing;
	}

	&::-webkit-scrollbar {
		display: none;
	}
`;

const Slide = styled.div`
	align-items: center;
	display: flex;
	height: 20rem;
	justify-content: center;
	scroll-snap-align: start;
	width: 20rem;
`;

const Border = styled.div`
	height: 20rem;
	overflow: hidden;
	position: absolute;
	width: 20rem;

	.arrows {
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		display: flex;
		justify-content: space-between;
		position: relative;
		top: -13rem;
		user-select: none;
	}

	.arrow {
		align-items: center;
		background: grey;
		cursor: pointer;
		display: flex;
		justify-content: center;
		opacity: 0.7;
		padding: 0.5rem;
		position: relative;
		transition: all 400ms;

		&:hover {
			opacity: 1;
			transition: all 400ms;
		}
	}

	.prev {
		left: -9rem;
		top: -14rem;
	}
`;

const Dots = styled.div`
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	align-items: center;
	bottom: 2rem;
	cursor: pointer;
	display: flex;
	font-size: 0.8rem;
	justify-content: center;
	opacity: 0.4;
	outline: none;
	position: relative;
	transition: all 400ms;
	user-select: none;
	width: 100%;
	z-index: 100;

	&:hover {
		opacity: 1;
		transition: all 400ms;
	}
`;

const Carousel = props => {
	// Props
	const kids = props.children;

	// Refs
	const carouselRef = useRef(null);
	const slideRef = useRef(null);

	// State
	const [active, setActive] = useState(0);
	const [determinedFrameSize, setDeterminedFrameSize] = useState(null);
	const [initClick, setInitClick] = useState(null);
	const [isDown, setIsDown] = useState(false);

	// Determine Slide Size
	useEffect(() => {
		if (!slideRef) return;
		setDeterminedFrameSize(slideRef.current.clientWidth);
	}, [determinedFrameSize]);

	// setActiveBasedOnScroll
	const determineActive = () => {
		if (!carouselRef) return;

		setActive(Math.floor(carouselRef.current.scrollLeft / determinedFrameSize));
	};

	//////////////////////////////////
	// set body style
	//
	const style = document.createElement('style');
	style.innerHTML = `body::-webkit-scrollbar {display: none;}`;
	document.head.appendChild(style);

	document.body.style.overscrollBehaviorX = 'none';

	//
	//
	// End body style
	//////////////////////////////////////

	///////////////////////////////
	// Click and Drag:
	//
	const handleMouseDown = e => {
		e.preventDefault();

		carouselRef.current.style.cursor = 'grabbing';

		setIsDown(true);
		setInitClick(e.clientX - determinedFrameSize + 14);
	};

	document.onmouseup = e => {
		if (!isDown) return;

		carouselRef.current.style.cursor = 'grab';

		determineActive();
		setIsDown(false);
	};

	const handleMouseMove = e => {
		if (!isDown) return;

		const drag = initClick - (e.clientX - determinedFrameSize + 14);

		carouselRef.current.scrollBy({
			left: drag,
			behavior: 'smooth',
		});
	};

	document.onmousemove = e => handleMouseMove(e);
	//
	// End Click and Drag
	///////////////////////////

	const renderDots = () => {
		return kids.map((item, i) => {
			return (
				<span
					key={i}
					role="img"
					aria-label="dot"
					onClick={() => {
						carouselRef.current.scrollTo({
							left: i * determinedFrameSize,
							behavior: 'smooth',
						});
					}}
				>
					{active === i ? '🔘' : '⚪️'}
				</span>
			);
		});
	};

	const prev = () => {
		if (active === 0) return;

		carouselRef.current.scrollBy({
			left: -determinedFrameSize,
			behavior: 'smooth',
		});
	};

	const next = () => {
		if (active === kids.length - 1) return;

		carouselRef.current.scrollBy({
			left: determinedFrameSize,
			behavior: 'smooth',
		});
	};

	const renderKids = () => {
		return kids.map((item, i) => {
			return (
				<Slide ref={slideRef} id={`Slide-${i}`} key={i}>
					{item}
				</Slide>
			);
		});
	};

	return (
		<Wrap>
			<Border id="Border">
				<CarouselDiv
					onMouseDown={handleMouseDown}
					onScroll={determineActive}
					ref={carouselRef}
					id="CarouselDiv"
				>
					{renderKids()}
				</CarouselDiv>
				<Dots>{renderDots()}</Dots>
				<div className="arrows">
					{active === 0 ? (
						<span></span>
					) : (
						<div onClick={prev} className="arrow">
							{'<'}
						</div>
					)}
					{active === kids.length - 1 ? (
						<span></span>
					) : (
						<div onClick={next} className="arrow">
							{'>'}
						</div>
					)}
				</div>
			</Border>
		</Wrap>
	);
};

export default Carousel;
