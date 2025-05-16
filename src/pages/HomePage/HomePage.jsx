import styled from 'styled-components';
import homePageImage from '../../assets/homePageImage.png';
import trustpilot from '../../assets/trustpilot.svg';
import { Button as ButtonComponent } from '../../components/Button/Button.jsx';

const HomePageContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	background-color: #f5fbfc;
`;

const TriangleVertical = styled.div`
	position: absolute;
	top: 7%;
	right: 82%;
	width: 19vw;
	height: 90vh;
	background-color: white;
	clip-path: polygon(100% 100%, 0 0, 0 100%);
	z-index: 0;
`;

const TriangleHorizontal = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 27vh;
	background-color: white;
	clip-path: polygon(0 100%, 0 0, 100% 100%);
	z-index: 0;
`;

const HomePageMainContent = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 1;
`;

const HomePageInfoContainer = styled.div`
	h1 {
		font-size: 400%;
		line-height: 100%;
		padding-bottom: 4%;

		span {
			font-size: 100%;
			color: #35b8be;
		}
	}

	p {
		width: 86%;
		font-size: 120%;
		line-height: 150%;
		color: #546285;
		padding-bottom: 8%;
	}
`;

const StyledButton = styled(ButtonComponent)`
	width: 30%;
	font-style: normal;
	font-size: 110%;
	font-weight: 300;
	height: 52px;
`;

const RatingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 6%;

	p {
		span {
			font-weight: 400;
			color: #35b8be;
		}
	}
`;

export function HomePage() {
	return (
		<HomePageContainer>
			<TriangleVertical />
			<TriangleHorizontal />
			<HomePageMainContent>
				<HomePageInfoContainer>
					<h1>
						Beautiful food & takeaway, <span>delivered</span> to your door.
					</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500.
					</p>
					<StyledButton>Place an Order</StyledButton>
					<RatingContainer>
						<img src={trustpilot} alt="Trustpilot logo" />
						<p>
							<span>4.8 out of 5</span> based on 2000+ reviews
						</p>
					</RatingContainer>
				</HomePageInfoContainer>
				<img src={homePageImage} alt="homePageImage" />
			</HomePageMainContent>
		</HomePageContainer>
	);
}
