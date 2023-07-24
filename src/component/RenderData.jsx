import React from 'react'
import { styled } from 'styled-components'
import { COLORS } from '../constants/Colors'

const RenderData = ({ item, onHandleSelectUbication }) => {
    const { calle, altura, departamento, provincia, ubicacion } = item
    return (
        <Container>
            <Button onClick={() => onHandleSelectUbication(ubicacion.lat, ubicacion.lon)}>
                <Box>
                    <Label>Calle: </Label>
                    <TextCalle>{calle.nombre} {altura.valor}</TextCalle>
                </Box>
                <Box>
                    <Label>Departamento: </Label>
                    <TextDepartameto>{departamento.nombre}</TextDepartameto>
                </Box>
                <Box>
                    <Label>Provincia: </Label>
                    <TextProvincia>{provincia.nombre}</TextProvincia>
                </Box>
            </Button>
        </Container>
    )
}

const Container = styled.section`
  border: 0.2rem solid ${COLORS.primary};
  border-radius: 0.1rem;
  //padding: 0.8rem;
  flex: 0 1 auto;
`;
const Button = styled.button`
  padding: 0.8rem;
`;
const Box = styled.div`
    display: flex;

    @media (max-width: 500px) {
        flex-direction: column;
    }
`;
const Label = styled.label`
    font-weight: bold;
    text-transform: uppercase;

    @media (max-width: 500px) {
        margin: 0.3rem 0;
        font-size: 16px;
    }
`;
const TextCalle = styled.p`
    margin-left: 0.7rem;

    @media (max-width: 500px) {
        margin: 0.3rem 0;
    }
`;
const TextDepartameto = styled.p`
    margin-left: 0.7rem;

    @media (max-width: 500px) {
        margin: 0.3rem 0;
    }
`;
const TextProvincia = styled.p`
    margin-left: 0.7rem;

    @media (max-width: 500px) {
        margin: 0.3rem 0;
    }
`;

export default RenderData