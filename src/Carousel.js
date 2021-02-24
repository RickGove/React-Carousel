import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';

export default function Carousel(props) {
	//////////////////////////////
	//			Props
	//
	let {
		arrowColor,
		arrowOffSet,
		children,
		debug,
		dotsOffsetFromBottom,
		flyTo,
		frameHeight,
		frameWidth,
		freeWheel,
		openingSlide,
	} = props;

	////////////////////////////////
	// Default props
	//
	if (!arrowColor) arrowColor = 'black';
	if (!arrowOffSet) arrowOffSet = '2.2rem';
	if (!debug) debug = false;
	if (!dotsOffsetFromBottom) dotsOffsetFromBottom = 5;
	if (!flyTo) flyTo = true;
	if (!frameHeight) frameHeight = 270;
	if (!frameWidth) frameWidth = 350;
	if (!freeWheel) freeWheel = false;
	//
	///////////////////////////

	// state
	const [active, setActive] = useState(0);
	const [determinedFrameSize, setDeterminedFrameSize] = useState(0);
	const [dif, setDif] = useState(0);
	const [isSliding, setIsSliding] = useState(false);
	const [locked, setLocked] = useState(false);
	const [outerBoundary, setOuterBoundary] = useState(0);
	const [right, setRight] = useState(0);
	const [xStart, setXStart] = useState(0);

	// refs
	const borderRef = useRef();
	const galRef = useRef();
	const wrapRef = useRef();

	useEffect(() => {
		// initFrameSizeAndOuterBoundary
		setFrameSizeAndOuterBoundary();
	}, []);

	useEffect(() => {
		// preventOverScroll
		document.body.style.overscrollBehaviorX = 'none';
	});

	useEffect(() => {
		// addResizeEvent
		document.addEventListener('resize', setFrameSizeAndOuterBoundary);
	});

	useEffect(() => {
		// fadeIn
		wrapRef.current.style.opacity = 0;
		window.setTimeout(() => {
			wrapRef.current.style.opacity = 1;
		}, 400);
	}, []);

	useEffect(() => {
		// listenForRightChangeAndUpdateActive
		setActive(Math.round(right / determinedFrameSize));
	}, [right]);

	useEffect(() => {
		// setOpeningActive
		if (!openingSlide) setActive(0);
		else {
			setRight(openingSlide * determinedFrameSize);
		}
	}, []);

	const setFrameSizeAndOuterBoundary = () => {
		setDeterminedFrameSize(borderRef?.current.clientWidth);
		setOuterBoundary((children.length - 1) * borderRef?.current.clientWidth);
	};

	const handleTouchStart = e => {
		console.log('touch start');
		setXStart(e.touches[0].clientX);
	};

	const handleTouchMove = e => {
		const current = e.touches[0].clientX;
		const dif = (xStart - current) / 10;

		setDif(dif);

		if ((dif > 0 && right < outerBoundary) || (dif < 0 && right > 0))
			setRight(right + dif);
	};

	const handleTouchEnd = () => {
		setIsSliding(false);

		const toUpdate = Math.round(right / determinedFrameSize);

		setActive(toUpdate);
		setRight(toUpdate * determinedFrameSize);
		setXStart(dif);
		setDif(0);
	};

	const handleWheel = e => {
		const move = e.deltaX;

		if (freeWheel) {
			const speed = 10;

			if (move > 0 && right < outerBoundary) setRight(right + speed); // right

			if (move < 0 && right > 0) setRight(right - speed); // left
		} // not freewheel
		else if (!locked) {
			if (move > 10 && right < outerBoundary) {
				// right
				setRight(right + determinedFrameSize);
				setLocked(true);
				window.setTimeout(() => {
					setLocked(false);
				}, 1000);
			} else if (move < -10 && right > 0) {
				// left
				setRight(right - determinedFrameSize);
				setLocked(true);
				window.setTimeout(() => {
					setLocked(false);
				}, 1000);
			}
		}
	};

	const prev = () => {
		if (active === 0) return;
		setRight(right - determinedFrameSize);
	};

	const next = () => {
		if (active === children.length - 1) return;
		setRight(right + determinedFrameSize);
	};

	const mapKids = () => {
		return props.children.map((item, i) => {
			return (
				<li style={{ width: determinedFrameSize }} key={i}>
					{item}
				</li>
			);
		});
	};

	const renderDots = () => {
		return children.map((item, i) => {
			return (
				<p
					key={i}
					onClick={
						flyTo
							? () => {
									setRight(i * determinedFrameSize);
							  }
							: null
					}
				>
					{i === active ? '🔘' : '⚪️'}
				</p>
			);
		});
	};

	return (
		<>
			<Wrap width={frameWidth} ref={wrapRef}>
				<Arrow
					offset={arrowOffSet}
					color={arrowColor}
					side="left"
					onClick={active === 0 ? null : prev}
					style={active === 0 ? { opacity: 0 } : null}
				>
					{'˂'}
				</Arrow>
				<Border
					ref={borderRef}
					style={determinedFrameSize === 0 ? { opacity: 0 } : { opacity: 1 }}
				>
					<Sliding
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						onWheel={handleWheel}
						className="touchgallery"
						ref={galRef}
						// right={`${right}`}
						// width={props.children.length * width}
						style={{
							width: props.children.length * determinedFrameSize,
							right,
						}}
					>
						<ul>{mapKids()}</ul>
					</Sliding>
				</Border>
				<Arrow
					offset={arrowOffSet}
					side="right"
					color={arrowColor}
					onClick={active > children.length - 1 ? null : next}
					style={active === children.length - 1 ? { opacity: 0 } : null}
				>
					{'˃'}
				</Arrow>
				<Dots offset={dotsOffsetFromBottom}>{renderDots()}</Dots>
			</Wrap>
			{debug ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						background: 'grey',
						marginTop: '1rem',
					}}
				>
					<h3 style={{ color: 'black' }}>state</h3>
					<p>right:{right}</p>
					<p>xStart: {xStart}</p>
					<p>dif: {dif}</p>
					<p>isSliding: {isSliding.toString()}</p>
					<p>Active: {active}</p>
					<p>determinedFrameSize: {determinedFrameSize}</p>
					<p>outerBoundary: {outerBoundary}</p>
					<p>children.length: {children.length}</p>
					<p>locked? {locked.toString()}</p>
				</div>
			) : null}
		</>
	);
}

const Wrap = styled.div.attrs(props => ({
	width: `${props.width}px`,
}))`
	align-items: center;
	display: flex;
	max-width: 100vw;
	opacity: 0;
	position: relative;
	transition: all 400ms;
	width: ${props => props.width};
	max-width: 80vw;
`;

const Arrow = styled.div.attrs(props => ({
	hide: `${props.hide}` || `unset`,
	side: `${props.side}`,
	offset: `${props.offset}` || '2.2rem',
	color: `${props.color}` || 'black',
}))`
	${props => props.side}: ${props => props.offset};
	align-items: center;
	background: lightgrey;
	color: ${props => props.color};
	cursor: pointer;
	display: ${props => props.hide};
	display: flex;
	font-size: 2rem;
	height: 2rem;
	justify-content: center;
	opacity: 0.6;
	outline: none;
	position: relative;
	transition: all 400ms;
	user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	width: 2.2rem;
	z-index: 1;
`;

const Border = styled.div`
	height: 270px;
	margin: auto;
	overflow: hidden;
	width: 100%;
`;

const Sliding = styled.div.attrs(props => ({
	right: `${props.right}px`,
	width: `${props.width}px`,
	height: `${props.height}`,
}))`
	display: flex;
	height: 270px;
	overflow: hidden;
	position: relative;
	right: ${props => props.right};
	transition: all 400ms;
	width: ${props => props.width};
	will-change: right;

	ul {
		height: 100%;
		left: 0;
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		transition: all 100ms ease-in-out;
		-moz-transition: all 100ms ease-in-out;
		-webkit-transition: all 100ms ease-in-out;
	}

	ul li {
		height: 100%;
		display: block;
		float: left;
		max-width: 100vw;
		text-align: center;
		width: ${props => props.width};
	}

	ul li img {
		height: 350px;
		height: auto;
		max-height: 100%;
	}
`;

const Dots = styled.div.attrs(props => ({
	top: `${props.top}px`,
	width: `${props.width / 2}px`,
	offset: `${props.offset}%`,
}))`
	bottom: ${props => props.offset};
	display: flex;
	left: 50%;
	opacity: 0.6;
	position: absolute;
	transform: translateX(-50%);

	p {
		cursor: pointer;
		font-size: 0.5rem;
		padding-left: 0.3rem;
		&:hover {
			opacity: 0.8;
			transition: all 400ms;
		}
	}
`;
