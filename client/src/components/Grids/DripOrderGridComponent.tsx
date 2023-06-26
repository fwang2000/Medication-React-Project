import { ColDef, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
   
                    // In the example application, dates are stored as dd/mm/yyyy
                    // We create a Date object for comparison against the filter date
                    const dateParts = (dateAsString).substring(0,11).split('-');
                    const year = Number(dateParts[2]);
                    const month = Number(new Date(Date.parse(dateParts[1] +" 1, 2000")).getMonth()+1) - 1;
                    const day = Number(dateParts[0]);
                    const cellDate = new Date(year, month, day);
                    console.log(year, month, day);
                    console.log(filterLocalDateAtMidnight);
                    console.log(cellDate);
   
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
            }
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
        }
    ]);

    const onGridReady = (event: GridReadyEvent) => {
        fetch("/drip").then(
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