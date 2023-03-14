import React, {useState, useEffect} from 'react';
import {Button, Container, Form, Row} from "react-bootstrap";
import {fetchTrains} from "../http/trainApi";
import CreateTrainModal from "../modals/CreateTrain";
import {observer} from "mobx-react-lite";



const ShopPage = observer(() => {
     const [createTrainVisible, setCreateTrainVisible] = useState(false)
     const [selectedTrains, setSelectedTrains] = useState([])
     const [fromPlace, setFromPlace] = useState([])
     const [toPlace, setToPlace] = useState([])

    const findTrain = async () => {
        await fetchTrains(fromPlace, toPlace).then(data => setSelectedTrains(data))
    }

    const normalDate = (oldDate)=>{
         const newDate = oldDate.slice(6,8) + '.' + oldDate.slice(4,6) + '.' + oldDate.slice(0,4)
        return newDate
    }

    return (
        <Container>
                <Button
                    variant={"outline-dark"}
                    className="md-4 p-2"
                    onClick={()=> setCreateTrainVisible(true)}
                >
                    Створити рейс
                </Button>
                <Form className="d-flex flex-column">
                    <Row>
                        <Form.Control
                            className="mt-3"
                            placeholder="Звідки"
                            value={fromPlace}
                            onChange={e => setFromPlace(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Куди"
                            value={toPlace}
                            onChange={e => setToPlace(e.target.value)}
                        />
                        <Button
                            variant={"outline-dark"}
                            className="md-4 p-2"
                            onClick={()=> findTrain()}
                        >
                            Пошук потрібного рейсу
                        </Button>
                    </Row>
                </Form>
                <CreateTrainModal show={createTrainVisible} onHide={()=> setCreateTrainVisible(false)}/>
                <div>
                    <h3>
                        Список потрібних вам потягів
                    </h3>
                    {selectedTrains.map(train =>
                        <p>
                            <div key={train.fromPlace}>{`${train.fromPlace} - ${train.toPlace}`}</div>
                            <div key={train.fromPlace}>{`Дата відправлення: ${normalDate(train.departureTime)}`}</div>
                            <div key={train.fromPlace}>{`Вільних місць: ${train.availablePlaces}`}</div>

                        </p>
                    )}
                </div>
        </Container>

    );
})

export default ShopPage;