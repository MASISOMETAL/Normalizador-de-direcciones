import React from 'react'
import { styled } from 'styled-components'
import { COLORS } from "../constants/Colors"

const Header = ({ title }) => {
    return (
        <Container >
            <Title>{title}</Title>
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    height: 15vh;
    background-color: ${COLORS.primary};
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    @media (max-width: 500px) {
        height: 11vh;
    }
`;
const Title = styled.h1`
    color: ${COLORS.white};
    font-size: 2rem;
    text-transform: uppercase;

    @media (max-width: 500px) {
        font-size: 0.9rem;
    }
`;

export default Header