import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BarChart from "@/Components/BarChart";
import Forecasting from "@/Components/Forecasting";
import Table from "@/Components/Table";

export default function AdminDashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            error={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-700">
                    Admin Dashboard
                </h2>
            }
        >
        <Head title="Admin Dashboard"/>
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <h1 className="font-bold text-3xl font-sans flex items-center justify-center m-8">Statistik Data</h1>
                    <div className="p-6 bg-white border-b border-gray-200 flex flex-row gap-8">
                        <BarChart/>
                        <Forecasting/>
                    </div>
                    <div className="p-6 bg-white border-b border-gray-200 flex flex-col">
                        <h1 className="font-bold text-3xl font-sans flex items-center justify-center">Data Mobil</h1>
                        <Table/>
                    </div>
                </div>
            </div>
        </div>
        </Authenticated>
    );
}
