import React, { useMemo, useState } from "react";
import MedicationCellRenderer from "../../renderer/MedicationCellRenderer";
import { AgGridReact } from 'ag-grid-react';
import IsPRNCellRenderer from "../../renderer/IsPRNCellRenderer";
import { IMedication } from "../../interfaces/IMedication";
import { ColDef, GridReadyEvent, ValueGetterParams } from "ag-grid-community";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import UpdateButtonCellRenderer from "../../renderer/UpdateButtonCellRenderer";
import DeleteButtonCellRenderer from "../../renderer/DeleteButtonCellRenderer";

const medicationValueGetter = (params: ValueGetterParams) => {
    let medication: IMedication = { 
        name: params.data.name,
        category: params.data.category,
        summaryline: params.data.summaryline
    }

    return medication;
}

const MedicationGridComponent = () => {

    const [rowData, setRowData] = useState([{}]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '95%', width: '100%' }), []);
    const defaultColDefs = useMemo<ColDef>(() => {
        return {
            suppressMenu: true,
            suppressMovable: true,
            filter: false,
            pinned: true,
            wrapText: true,
            autoHeight: true
        };
    }, []);
    const [columnDefs] = useState([
        {
            headername: "Index",
            field: "index",
            hide: true
        },
        {
            headerName: "Is PRN",
            field: "isprn",
            cellRenderer: IsPRNCellRenderer
        },
        {
            headerName: "Medication",
            valueGetter: medicationValueGetter,
            cellRenderer: MedicationCellRenderer
        },
        {
            headerName: "Last Administered",
            field: "lastadm"
        },
        {
            headerName: "Last Dose",
            field: "lastdose"
        },
        {
            cellRenderer: UpdateButtonCellRenderer
        },
        {
            cellRenderer: DeleteButtonCellRenderer
        }
    ]);

    const onGridReady = (event: GridReadyEvent) => {
        fetch("/medications").then(
            async response => response.json()
        ).then(
            data => {
                setRowData(data);
            }
        ).catch((error) => {
            console.log(error.message);
        });

        event.api.sizeColumnsToFit();
    }
      
    return (
        <div className="container" style={containerStyle}>
            <div className="header">
                <h2 id="grid-header">Active Medication</h2>
            </div>
            <div className="ag-theme-alpine" style={gridStyle}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDefs}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default MedicationGridComponent;