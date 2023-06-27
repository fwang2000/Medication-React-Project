import { ColDef, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDOButtonCellRenderer from "./renderers/DeleteDOButtonCellRenderer";
import UpdateDOButtonCellRenderer from "./renderers/UpdateDOButtonCellRenderer";

const dateCellRenderer = (params: ICellRendererParams) => {

    return (new Date(params.value)).toDateString();
}

function DripOrderGridComponent() {
    
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([{}]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '95%' }), []);
    const gridStyle = useMemo(() => ({ height: '95%', width: '100%' }), []);
    const defaultColDefs = useMemo<ColDef>(() => {
        return {
            suppressMenu: true,
            suppressMovable: true,
            floatingFilter: true,
            pinned: true,
            wrapText: true,
            autoHeight: true
        };
    }, []);

    const [columnDefs] = useState([
        {
            headerName: "Last Recorded Time",
            field: "intakedt",
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
                    const dateAsString = cellValue;
   
                    if (dateAsString == null) {
                        return 0;
                    }
                    
                    const cellDate = new Date(dateAsString);
   
                    // Now that both parameters are Date objects, we can compare
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    }
                    return 0;
                },
                inRangeInclusive: true,
                inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
                filterOptions: ['inRange']
            },
            cellRenderer: dateCellRenderer
        },
        {
            headerName: "Infusion",
            field: "dripname"
        },
        {
            headerName: "Value",
            field: "dripvalue"
        },
        {
            headerName: "UOM",
            field: "dripuom"
        },
        {
            cellRenderer: UpdateDOButtonCellRenderer
        },
        {
            cellRenderer: DeleteDOButtonCellRenderer
        }
    ]);

    const onGridReady = (event: GridReadyEvent) => {
        fetch("/drip-orders").then(
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

    const handleBackClick = () => {
        navigate("/drip-orders");
    }

    return(
        <div className="container" style={containerStyle}>
            <div className="header">
                <h2 id="drip-grid-header">Drips</h2>
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
    )
}

export default DripOrderGridComponent;