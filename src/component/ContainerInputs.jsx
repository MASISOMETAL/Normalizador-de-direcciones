import React from 'react'
import { styled } from 'styled-components'

const ContainerInputs = ({ htmlFor, title, type, id, value, onChange, name, campObligatorio }) => {
    return (
        <Container>
            <Labels htmlFor={htmlFor}>{title}{campObligatorio &&<Span>*</Span>}</Labels>
            <Inputs
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                name={name}
            />
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
const Inputs = styled.input`

`;
const Span = styled.span`
    color: red;
`;

export default ContainerInputs