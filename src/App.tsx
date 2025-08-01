import HistoricalDates from './components/HistoricalDates/HistoricalDates';
import classes from './App.module.scss';
import { historicalDates } from './data';

function App() {
    return (
        <div className={classes.App}>
            <HistoricalDates historicalDates={historicalDates} />
        </div>
    );
}

export default App;
