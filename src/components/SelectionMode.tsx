import classes from './SelectionMode.module.css';
import { MdCancel } from "react-icons/md";
import { IoIosCloudDone } from "react-icons/io";
import { useContext } from 'react';
import { DrawingContext } from '../context_providers/drawingContext';


function SelectionControl() {
    const isDrawEnabled = useContext(DrawingContext);

    if (!isDrawEnabled?.isDrawModeActive) {
        return <div></div>;
    }


    return <div className={classes.selectionModeContainer}>
        <div className={classes.selectionActions}>Drawing</div>
        <div className={classes.selectionActions} onClick={() => {
            if (isDrawEnabled) {
                isDrawEnabled.fetchVegetationData()
            }
        }}><IoIosCloudDone /></div>
        <div className={classes.selectionActions}><MdCancel /></div>
    </div>;
}

export default SelectionControl;