import axios from "axios";

const REACT_APP_API_URL = 'http://localhost:5000/'
const $host = axios.create({
    baseURL: REACT_APP_API_URL
})

export const createTrain = async (trainInfo) => {
    const {data} = await $host.post('api/train', {
        fromPlace: trainInfo.get("fromPlace"),
        toPlace: trainInfo.get("toPlace"),
        departureTime: trainInfo.get("departureTime"),
        availablePlaces: trainInfo.get("availablePlaces"),
    })
    return data
}

export const fetchTrains= async (fromPlace, toPlace) => {
    const {data} = await $host.get('api/train', {params: {
            fromPlace, toPlace
        }})
    return data
}