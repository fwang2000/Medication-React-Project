import { Column, ICellRendererParams, IRowNode } from 'ag-grid-community';
import React, {Component} from 'react';

interface StateProps {
    cellValue: boolean,
    column: Column | undefined,
    rowNode: IRowNode
}

export default class IsPRNCellRenderer extends Component<{}, StateProps> {

    constructor(props: ICellRendererParams) {

        super(props);

        this.state = {
            cellValue: props.value,
            column: props.column,
            rowNode: props.node
        }
        
        this.checkedHandler = this.checkedHandler.bind(this);
    }

    checkedHandler() {

        this.setState(prevState => ({
            cellValue: !prevState.cellValue
        }), () => {

            if (typeof this.state.column !== "undefined") {
    
                let colIndex = this.state.column?.getColId();
                this.state.rowNode.setDataValue(colIndex, this.state.cellValue);
    
            } else {
    
                throw new Error("column is undefined");
            }
        });
    }

    render() {

        return <input 
                    type="checkbox" 
                    onClick={this.checkedHandler}
                    defaultChecked={this.state.cellValue}>
                </input>;
    }
};