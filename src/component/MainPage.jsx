import React, { useState } from 'react'
import { styled } from 'styled-components';
import RenderData from './RenderData';
import Header from './Header';
import ContainerInputs from './ContainerInputs';
import CountrySelector from './CountrySelector';

const datos = {
    calle: "",
    altura: "",
    departamento: "",
    provincia: ""
}

const MainPage = () => {

    const [informacion, setInformacion] = useState(datos);
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [sinDatos, setSinDatos] = useState(null)
    const [msgDistancia, setMsgDistancia] = useState("")

    const onValidation = async (calle, altura, provincia) => {
        let hasError = false;
        if (calle.length === 0) {
            setError("Deben completarse los campos obligatorios")
            hasError = true;
        }
        if (altura.length === 0) {
            setError("Deben completarse los campos obligatorios")
            hasError = true;
        }
        if (provincia.length === 0) {
            setError("Deben completarse los campos obligatorios")
            hasError = true;
        }
        return hasError
    }

    const onHandleSearch = async () => {
        const { calle, altura, departamento, provincia } = informacion

        const hasError = await onValidation(calle, altura, provincia)

        if (hasError) {
            return
        }

        let url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle}${altura}&departamento=${departamento}&provincia=${provincia}`

        if (departamento === "") {
            url = `https://apis.datos.gob.ar/georef/api/direcciones?direccion=${calle}${altura}&provincia=${provincia}`
        }

        const res = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const direcciones = await res.json()

        if (direcciones.cantidad === 0) {
            setSinDatos("no se encontro direcciones")
            setMsgDistancia("")
            setData([])
            return
        }

        setData(direcciones.direcciones)
        setSinDatos("")
        setMsgDistancia("")
    }

    const onHandleChange = (e) => {
        setInformacion({
            ...informacion,
            [e.target.name]: e.target.value,
        })
        setError("")
    }

    const gradosARadianes = (grados) => {
        return grados * Math.PI / 180;
    };

    const onHandleSelectUbication = (lat1, lon1) => {
        //-34.603711092708444, -58.38157839346363 lat y lon del obelisco
        lat1 = gradosARadianes(lat1)
        lon1 = gradosARadianes(lon1)
        let lat2 = gradosARadianes(-34.603711092708444)
        let lon2 = gradosARadianes(-58.38157839346363)
        const RADIO_TIERRA_EN_KILOMETROS = 6371;
        // haciendo calculo
        let diferenciaEntreLongitudes = (lon2 - lon1);
        let diferenciaEntreLatitudes = (lat2 - lat1);
        let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distanciaKM = Math.round(RADIO_TIERRA_EN_KILOMETROS * c)
        console.log(distanciaKM)

        distanciaKM < 5 ?
            setMsgDistancia("Estas a menos de 5 Kilómetros del Obelisco")
            :
            setMsgDistancia("Estas lejos del Obelisco")

    }

    return (
        <Container>
            <Header title={"Normalizador de direcciones"} />
            <ContainerInputs
                htmlFor="calle"
                title="Ingrese una calle:"
                type="text"
                id='calle'
                value={informacion.calle}
                onChange={onHandleChange}
                name='calle'
                campObligatorio={true}
            />
            <ContainerInputs
                htmlFor="altura"
                title="Ingrese una altura:"
                type="number"
                id='altura'
                value={informacion.altura}
                onChange={onHandleChange}
                name='altura'
                campObligatorio={true}
            />
            <ContainerInputs
                htmlFor="departamento"
                title="Ingrese departamento:"
                type="text"
                id='departamento'
                value={informacion.departamento}
                onChange={onHandleChange}
                name='departamento'
                campObligatorio={false}
            />
            <CountrySelector
                onChange={onHandleChange}
                campObligatorio={true}
            />

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <Button onClick={onHandleSearch} >Enviar</Button>

                {data.length !== 0 && 
                    <MsgH3>Seleccione si quiere saber la distancia con respecto al obelisco</MsgH3>
                }

            <ContainerData>
                {data.length !== 0 && data.map((item, index) =>
                    <RenderData item={item} onHandleSelectUbication={onHandleSelectUbication} key={index} />
                )}
                {sinDatos && <MsgH3>{sinDatos}</MsgH3>}
            </ContainerData>
            {msgDistancia && <MsgH3>{msgDistancia}</MsgH3>}
        </Container>
    )
}

const Container = styled.main`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
`;
const ErrorMsg = styled.p`
    color: #ff0000;
    font-size: 12px;
    text-align: center;
`;
const Button = styled.button`
    padding: 0.2rem;
    margin-top: 1rem;   
`;
const MsgH3 = styled.h3`
    margin-top: 1rem;

    @media (max-width: 500px) {
        text-align: center;
        font-size: 16px
    }
`;
const ContainerData = styled.div`
    margin: 1.5rem 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

export default MainPage;