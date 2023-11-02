import { Typography,CircularProgress } from "@mui/material";
import React,{useState, useEffect} from 'react';
import axios from 'axios';

interface Statistics{
    numberOfMmembers: number,
    numberOfPendingApplications: number,
    numberOfDeclinedApplications: number,
    totalAccountBalance: number
}

const Dashboard = ():JSX.Element => {
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    useEffect(()=>{
        const fetchStatistics = async() =>{
            const statisticsData = await axios.get('http://localhost:4343/api/dashboard/statistics')
            if(statisticsData.status === 200){
                setStatistics(statisticsData.data);
            }
        }
        fetchStatistics();
    });
    return ( 
        <div>
            <Typography variant="h4">Dashboard</Typography>
            { statistics ? (
                <Typography variant="h5">Number of members:{statistics.numberOfMmembers}</Typography>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}
        </div>
     );
}
 
export default Dashboard;