import { useContext } from 'react';
import classes from './Appbar.module.css';
import { DrawingContext } from '../context_providers/drawingContext';

function AppBar() {
    const isDrawModeActive = useContext(DrawingContext);
    return <div className={classes.appbar}>
        <div className={classes.logoholder}>
            <h1>Bloom Sight</h1>
        </div>
        <div className={classes.searchbarholder}>
            <input type="text" placeholder="Search.." className={classes.searchbar}/>
        </div>
        <div className={classes.optionholder}>
                <div onClick={() => {
                    if (isDrawModeActive) {
                        isDrawModeActive.setDrawMode(!isDrawModeActive.isDrawModeActive)
                    }
                }}>      
                    Draw
                </div>
                <div>Home</div>
                <div>Explorer</div>
                <div>Insights</div>
        </div>
    </div>;
}

export default AppBar;