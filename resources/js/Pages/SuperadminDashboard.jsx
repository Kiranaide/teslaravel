import React from "react";
import mapboxgl from "mapbox-gl";
import './mapbox.css';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import Forecasting from "@/Components/Forecasting";
import BarChart from "@/Components/BarChart";
import Table from "@/Components/Table";

mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyYW5haWRlIiwiYSI6ImNsbXN0cWl3NzBpcjgycm4xbzgwNXZmMG0ifQ.F75wzS8qq21lbvZOGO4rBg';

export default function SuperadminDashboard(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [long,setLong] = useState(100.38931);
    const [lat,setLat] = useState(-0.95275);
    const [marker,setMarker] = useState([
        {long: 100.38931, lat: -0.95275, title: 'Outlet Utama'},
        {long: 100.38951, lat: -0.95305, title: 'Outlet 2', id: '2'},
        {long: 100.38971, lat: -0.95255, title: 'Outlet 3', id: '3'},
    ])
    const [zoom,setZoom] = useState(18);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [long,lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLong(map.current.getCenter().long);
            setLat(map.current.getCenter().lat);
            setZoom(map.current.getZoom());
        });

        const addMarker = () => {
            marker.forEach(marker => {
                const mapMarker = new mapboxgl.Marker()
                .setLngLat([marker.long,marker.lat])
                .addTo(map.current);

                const popup = new mapboxgl.Popup().setHTML(`<a href="/adminDashboard/${marker.id}">${marker.title}</a>`);
                mapMarker.setPopup(popup);
            });
        };

        addMarker();
    }, [marker]);

    return (
        <Authenticated
            auth={props.auth}
            error={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-700">
                    Superadmin Dashboard
                </h2>
            }
        >
        <Head title="Superadmin Dashboard"/>
        <div className="py-12 flex flex-col gap-4">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                    You're logged in as Superadmin!
                    </div>
                </div>
            </div>
        </div>
        <div ref={mapContainer} className="h-[512px] mx-auto max-w-7xl sm-px-6 lg:px-8"/>
        </Authenticated>
    );
};
