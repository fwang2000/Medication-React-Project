import { useMemo, useState } from "react";
import MedicationCellRenderer from "../../renderer/medication/MedicationCellRenderer";
import { AgGridReact } from 'ag-grid-react';
import IsPRNCellRenderer from "../../renderer/medication/IsPRNCellRenderer";
import { IMedication } from "../../interfaces/IMedication";
import { ColDef, GridReadyEvent, ICellRendererParams, ValueGetterParams } from "ag-grid-community";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import UpdateButtonCellRenderer from "../../renderer/medication/UpdateButtonCellRenderer";
import DeleteButtonCellRenderer from "../../renderer/medication/DeleteButtonCellRenderer";
import { useNavigate } from "react-router-dom";

const medicationValueGetter = (params: ValueGetterParams) => {
    let medication: IMedication = { 
        name: params.data.name,
        category: params.data.category,
        summaryline: params.data.summaryline
    }

    return medication;
}

const LastADMRenderer = (params: ICellRendererParams) => {

    let admString = params.value;

    if (admString === "Pending") {

        return admString;

    } else {

        return //(new Date(admString)).toDateString();
    }
}

const MedicationGridComponent = () => {

    const navigate = useNavigate();
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
            field: "lastadm",
            cellRenderer: LastADMRenderer
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

    const handleBackClick = () => {
        navigate("/medications");
    }

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
                <h2 id="medication-grid-header">Active Medication</h2>
                <input type="button" value="Back" onClick={handleBackClick}/>
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