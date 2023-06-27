import { ICellRendererParams } from 'ag-grid-community';
import {Component} from 'react';
import { IMedication } from '../../interfaces/IMedication';

export default class MedicationCellRenderer extends Component<{}, { cellValue:IMedication }> {

    constructor(props: ICellRendererParams) {

        super(props);

        this.state = {
            cellValue: props.value
        }
    }

    render() {

        let medicineNameString = this.state.cellValue.name;

        if (this.state.cellValue.category) {

            medicineNameString += ` (${this.state.cellValue.category})`;
        }

        return <div>
            <span><b>{medicineNameString}</b></span>
            <br></br>
            <span>{this.state.cellValue.summaryline}</span>
        </div>;
    }
};