import React from 'react'
import { styled } from 'styled-components'

const CountrySelector = ({ onChange, campObligatorio }) => {
    return (
        <Container>
            <Labels htmlFor="provincia"><b>Elija provincia:</b>{campObligatorio && <Span>*</Span>}</Labels>
            <Select
                name="provincia"
                id="provincia"
                onChange={onChange}
            >
                <Option value="null">-------------------------------</Option>
                <Option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Bs As</Option>
                <Option value="Buenos Aires">Buenos Aires</Option>
                <Option value="Córdoba">Córdoba</Option>
                <Option value="Entre Ríos">Entre Ríos</Option>
                <Option value="Misiones">Misiones</Option>
                <Option value="San Luis">San Luis</Option>
                <Option value="San Juan">San Juan</Option>
                <Option value="Santa Cruz">Santa Cruz</Option>
                <Option value="Río Negro">Río Negro</Option>
                <Option value="Chubut">Chubut</Option>
                <Option value="Mendoza">Mendoza</Option>
                <Option value="La Rioja">La Rioja</Option>
                <Option value="Catamarca">Catamarca</Option>
                <Option value="La Pampa">La Pampa</Option>
                <Option value="Santiago del Estero">Santiago del Estero</Option>
                <Option value="Corrientes">Corrientes</Option>
                <Option value="Santa Fe">Santa Fe</Option>
                <Option value="Tucumán">Tucumán</Option>
                <Option value="Neuquén">Neuquén</Option>
                <Option value="Salta">Salta</Option>
                <Option value="Chaco">Chaco</Option>
                <Option value="Formosa">Formosa</Option>
                <Option value="Jujuy">Jujuy</Option>
                <Option value="Tierra del Fuego">Tierra del Fuego</Option>
            </Select>
        </Container>
    )
}

const Container = styled.div`
    margin: 10px;
    
    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const Labels = styled.label`
    margin: 0 10px;
    font-weight: bold;

    @media (max-width: 500px) {
        margin: 0.4rem 0;
    }
`;
const Select = styled.select`

`;
const Option = styled.option`
    text-align: center;
`;
const Span = styled.span`
    color: red;
`;

export default CountrySelector