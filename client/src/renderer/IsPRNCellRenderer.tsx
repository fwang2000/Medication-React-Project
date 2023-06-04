import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';
import React, {Component} from 'react';

export default class IsPRNCellRenderer extends Component<{}, { cellValue:boolean }> {

    constructor(props: ICellRendererParams) {

        super(props);

        this.state = {
            cellValue: props.value
        }
    }

    render() {

        return <input type="checkbox" checked={this.state.cellValue}></input>;
    }
};