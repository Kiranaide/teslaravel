import arima from "arima";
import React, { useEffect, useState } from "react";

export default function Forecasting() {
    const [dataHasilRental, setDataHasilRental] = useState([]);
    const [selectedCars, setSelectedCars] = useState(null);
    const [pred, setPred] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch('/api/hasilrental-data')
        .then(response => response.json())
        .then(data => { 
            setDataHasilRental(data);
        })
        .catch(error => {
            console.error('Data Error', error);
        })
    }, []);

    const handleSelectedCars = (event) => {
        const selectedID = event.target.value;
        setSelectedCars(selectedID);
    }

    useEffect(() => {
        console.log("Selected Car ID:", selectedCars); // Check selected car ID
        console.log("Data Hasil Rental:", dataHasilRental); // Check data
        if (dataHasilRental && dataHasilRental.length > 0 && selectedCars != null) {
            try {
                const selectedData = dataHasilRental.find((row) => row.id == selectedCars);
                console.log("Selected Car Data:", selectedData);

                if (selectedData) {
                    const hasildata = [
                        selectedData.JAN, selectedData.FEB, selectedData.MAR,
                        selectedData.APR, selectedData.MAY, selectedData.JUN,
                        selectedData.JUL, selectedData.AUG, selectedData.SEP,
                        selectedData.OCT, selectedData.NOV, selectedData.DEC
                    ];
                    console.log("Hasil Data", hasildata);
                    const Arima = new arima({ auto: true }).train(hasildata);
                    const [newPred, newErrors] = Arima.predict(3);
                    setPred(newPred);
                    setErrors(newErrors);
                }
                // const hasildata = dataHasilRental.map((row) => ({
                //     mobil: row.mobil,
                //     value: [row.jan, row.feb, row.mar, row.apr, row.may, row.jun, row.jul, row.aug, row.sep, row.oct, row.nov, row.dec],
                // }));
                // const testdata = [0,0,0,4,6,2,43,62,43];
                // const Arima = new arima({ auto: true }).train(hasildata);
                // const [newPred, newErrors] = Arima.predict(3);
                // setPred(newPred);
                // setErrors(newErrors);
            } catch (error) {
                console.error("ARIMA Error:", error);
            }
        }
    }, [dataHasilRental, selectedCars]);    

    return (
        <div>
            <select onChange={handleSelectedCars}>
                <option value={null}>Select Mobil</option>
                    {dataHasilRental.map((row) => (
                        <option key={row.id} value={row.id}>{row.mobil}</option>
                    ))}
            </select>
            {selectedCars != null && (
                <div>
                    <h2>Forecast 3 bulan kedepan untuk mobil {dataHasilRental.find((row) => row.id == selectedCars)?.mobil}</h2>
                    <p>Prediction : {pred.join(", ")}</p>
                    <p>Error : {errors.join(", ")}</p>
                </div>
            )}
        </div>
    )
}