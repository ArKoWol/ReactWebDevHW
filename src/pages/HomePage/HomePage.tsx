import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homePageImage from '../../assets/homePageImage.png';
import trustpilot from '../../assets/trustpilot.svg';
import { Button } from '../../components/Button/Button';

const HomePageContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	background-color: ${({ theme }) => theme.body};
	
	@media (max-width: 768px) {
		height: auto;
		min-height: 100vh;
		align-items: flex-start;
		padding: 2rem 0;
		flex-direction: column;
	}
`;

const TriangleVertical = styled.div`
	position: absolute;
	top: 7%;
	right: 82%;
	width: 19vw;
	height: 90vh;
	background-color: ${({ theme }) => theme.shape};
	clip-path: polygon(100% 100%, 0 0, 0 100%);
	z-index: 0;
	
	@media (max-width: 768px) {
		display: none;
	}
`;

const TriangleHorizontal = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 27vh;
	background-color: ${({ theme }) => theme.shape};
	clip-path: polygon(0 100%, 0 0, 100% 100%);
	z-index: 0;
	
	@media (max-width: 768px) {
		display: none;
	}
`;

const HomePageMainContent = styled.div`
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	z-index: 1;
	gap: 2rem;
	
	@media (max-width: 768px) {
		width: 95%;
		gap: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-height: auto;
		padding: 0 1rem;
	}
`;

const MainImage = styled.img`
	width: clamp(300px, 40vw, 600px);
	height: clamp(280px, 38vw, 580px);
	object-fit: cover;
	flex-shrink: 0;
	
	@media (max-width: 768px) {
		display: none;
	}
`;

const HomePageInfoContainer = styled.div`
	flex: 1;
	min-width: 0;
	
	h1 {
		font-size: clamp(2rem, 6vw, 4rem);
		line-height: 1.1;
		padding-bottom: 4%;
		color: ${({ theme }) => theme.text};

		span {
			font-size: 100%;
			color: ${({ theme }) => theme.palette.primary.main};
		}
	}

	p {
		width: 86%;
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.5;
		color: ${({ theme }) => theme.text};
		padding-bottom: 8%;
		
		@media (max-width: 768px) {
			width: 100%;
			text-align: center;
		}
	}
	
	@media (max-width: 768px) {
		text-align: center;
		
		h1 {
			text-align: center;
		}
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	
	@media (max-width: 768px) {
		justify-content: center;
		margin: 2rem 0;
	}
`;

const StyledButton = styled(Button)`
	width: clamp(200px, 30%, 300px);
	font-style: normal;
	font-size: clamp(14px, 1.8vw, 18px);
	font-weight: 300;
	height: clamp(40px, 8vw, 52px);
	
	@media (max-width: 600px) {
		width: 100%;
		max-width: 250px;
	}
`;

const RatingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 6%;
	user-select: none;

	p {
		color: ${({ theme }) => theme.text};
		span {
			font-weight: 400;
			color: ${({ theme }) => theme.palette.primary.main};
		}
	}
	
	@media (max-width: 768px) {
		align-items: center;
		text-align: center;
		padding-top: 2rem;
		width: 100%;
	}
`;

export function HomePage(): React.ReactElement {
	const navigate = useNavigate();

	const handlePlaceOrder = () => {
		navigate('/menu');
	};

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
					<ButtonContainer>
						<StyledButton onClick={handlePlaceOrder}>Place an Order</StyledButton>
					</ButtonContainer>
					<RatingContainer>
						<img src={trustpilot} alt="Trustpilot logo" />
						<p>
							<span>4.8 out of 5</span> based on 2000+ reviews
						</p>
					</RatingContainer>
				</HomePageInfoContainer>
				<MainImage src={homePageImage} alt="homePageImage" />
			</HomePageMainContent>
		</HomePageContainer>
	);
}
