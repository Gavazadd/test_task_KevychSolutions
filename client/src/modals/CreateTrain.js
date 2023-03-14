import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, Row, Col} from "react-bootstrap";
import {createTrain} from "../http/trainApi";

const CreateTrain = ({show, onHide}) => {
    const [fromPlace, setFromPlace] = useState('')
    const [toPlace, setToPlace] = useState('')
    const [departureDay, setDepartureDay] = useState('')
    const [departureMonth, setDepartureMonth] = useState('')
    const [departureYear, setDepartureYear] = useState('')
    const [availablePlaces, setAvailablePlaces] = useState('')

    const finalDate = departureYear +  departureMonth +  departureDay

    const addTrain = () => {
        const formData = new FormData()
        formData.append('fromPlace', fromPlace)
        formData.append('toPlace', toPlace)
        formData.append('departureTime', finalDate)
        formData.append('availablePlaces', availablePlaces)
        createTrain(formData).then(data => onHide())
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити рейс (Дату вказувати у форматі 01 01 2023)
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={fromPlace}
                        onChange={e => setFromPlace(e.target.value)}
                        placeholder={"Звідки прямує потяг"}
                    />
                </Form>
            </Modal.Body>
            <Form>
                <Form.Control
                    value={toPlace}
                    onChange={e => setToPlace(e.target.value)}
                    placeholder={"Куди прямує потяг"}
                />
            </Form>
            <Row>
                <Form>
                    <Form.Control
                        value={departureDay}
                        onChange={e => setDepartureDay(e.target.value)}
                        placeholder={"День відправлення"}
                    />
                </Form>
                <Form>
                    <Form.Control
                        value={departureMonth}
                        onChange={e => setDepartureMonth(e.target.value)}
                        placeholder={"Місяць відправлення"}
                    />
                </Form>
                <Form>
                    <Form.Control
                        value={departureYear}
                        onChange={e => setDepartureYear(e.target.value)}
                        placeholder={"Рік відправлення"}
                    />
                </Form>
            </Row>

            <Form>
                <Form.Control
                    value={availablePlaces}
                    onChange={e => setAvailablePlaces(e.target.value)}
                    placeholder={"Кількість вільних місць"}
                />
            </Form>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addTrain} >Добавити</Button>
                <Button variant="outline-danger" onClick={onHide} >Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTrain;