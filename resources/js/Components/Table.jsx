import React, { useEffect, useState } from "react";

export default function Table() {
    const [dataTable,setdataTable] = useState([]);
    // const [popupEdit, setpopupEdit] = useState(null);
    // const [popupDelete, setpopupDelete] = useState(null);
    // const [editData, seteditData] = useState([]);
    // const [deleteData, setdeleteData] = useState([]);

    useEffect(() => {
        fetch('/api/totalrental-data')
        .then(response => response.json())
        .then(data => {
            setdataTable(data)
        })
        .catch(error => {
            console.log('Error',error);
        })
    }, []);

    // const openEditModal = (row) => {
    //     seteditData(row);
    //     setpopupEdit(true);
    // }

    // const closeEditModal = (row) => {
    //     seteditData(null);
    //     setpopupEdit(false);
    // }

    // const openDeleteModal = (row) => {
    //     setdeleteData(row);
    //     setpopupDelete(true);
    // }

    // const closeDeleteModal = (row) => {
    //     setdeleteData(null);
    //     setpopupDelete(false);
    // }

    // const handleEdit = async (id, updatedData) => {
    //     try {
    //       // Make an API request to update data on the Laravel backend
    //       const response = await fetch(`/api/edit-rental/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updatedData),
    //       });
    
    //       if (response.ok) {
    //         // Update the local state with the edited data
    //         const updatedDataTable = dataTable.map(row => {
    //           if (row.id === id) {
    //             return {
    //               ...row,
    //               mobil: updatedData.mobil,
    //               harga: updatedData.harga,
    //             };
    //           }
    //           return row;
    //         });
    //         setdataTable(updatedDataTable);
    //         closeEditModal();
    //       } else {
    //         console.error('Edit operation failed');
    //       }
    //     } catch (error) {
    //       console.error('Error Edit Mobil', error);
    //     }
    //   }
    
    // const handleDelete = async (id) => {
    //     try {
    //       // Make an API request to delete data on the Laravel backend
    //       const response = await fetch(`/api/delete-rental/${id}`, {
    //         method: 'DELETE',
    //       });
    
    //       if (response.ok) {
    //         // Remove the deleted data from the local state
    //         const updatedDataTable = dataTable.filter(row => row.id !== id);
    //         setdataTable(updatedDataTable);
    //         closeDeleteModal();
    //       } else {
    //         console.error('Delete operation failed');
    //       }
    //     } catch (error) {
    //       console.error('Error Delete Mobil', error);
    //     }
    //   }
    
    return (
        <div className="m-8 flex items-center justify-center">
            <table className="w-4/5 rounded-lg border-2">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Mobil</th>
                        <th>Harga Rental</th>
                        <th>Total Penjualan</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((row,index) => (
                        <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td>{row.mobil}</td>
                            <td>{row.harga}</td>
                            <td>{row.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}