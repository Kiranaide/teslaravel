import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart() {
    const [dataRental,setDataRental] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        fetch('/api/rental-data')
        .then(response => response.json())
        .then(data => { 
            setDataRental(data);
        })
        .catch(error => {
            console.error('Data Error', error);
        })
    }, []);

    useEffect(() => {
        if (dataRental && dataRental.length > 0) {
          const ctx = document.getElementById('dataRentalChart');
    
          // Destroy the previous Chart instance if it exists
          if (chartInstance) {
            chartInstance.destroy();
          }
    
          const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: dataRental.map(row => row.mobil),
              datasets: [{
                label: 'Statistik Mobil Terental Bulan Ini',
                data: dataRental.map(row => row.bulan_ini),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }]
            },
            options: {
              responsive: false,
              scales: {
                y: {
                  type: 'linear',
                  beginAtZero: true
                }
              }
            }
          });
    
          // Move setChartInstance outside the useEffect
          setChartInstance(newChartInstance);
        }
      }, [dataRental]);

    return (
        <div className='flex items-center justify-center'>
            <canvas id="dataRentalChart" width="600" height="600"/>
        </div>
    )
}