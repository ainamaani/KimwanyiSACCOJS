import { Typography,CircularProgress, Grid, Card, CardContent } from "@mui/material";
import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import useAuthContext from "../hooks/UseAuthContext";

interface Statistics{
    numberOfMembers: number,
    numberOfPendingApplications: number,
    numberOfDeclinedApplications: number,
    totalAccountBalance: number,
    numberOfFemaleMembers: number,
    numberOfMaleMembers: number
}

const Dashboard = ():JSX.Element => {
    const {member} = useAuthContext();
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    const femaleMembers = statistics ? statistics.numberOfFemaleMembers : 0;
    const maleMembers = statistics ? statistics.numberOfMaleMembers : 0;

    const pieChartData = [femaleMembers, maleMembers];
    // ref for the chart container
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    // another ref to keep track of the Chart instance
    const chartInstance = useRef<Chart<"pie", number[], string> | null>(null);
    // create the chart

    const chartOptions = {
    aspectRatio: 3
    }
    useEffect(()=>{
        if(chartRef.current){
            if(chartInstance.current){
                // destroy the previous chart instance before creating a new one
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart<"pie", number[], string>(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Female', 'Male'],
                        datasets: [{
                            data: pieChartData,
                            backgroundColor: ['#FF6384', '#36A2EB']
                        }]
                    },
                    options: chartOptions
                });
            }
        }
    },[chartOptions, pieChartData]);

    useEffect(()=>{
        const fetchStatistics = async() =>{
            const statisticsData = await axios.get('http://localhost:4343/api/dashboard/statistics',{
                headers:{
                    'Authorization': `Bearer ${member.token}`
                }
            });
            if(statisticsData.status === 200){
                setStatistics(statisticsData.data);
            }
        }
        if(member){
            fetchStatistics();
        }
    },[statistics, member]);

  

    return ( 
        <div>
            <Typography variant="h4">Dashboard</Typography>
            { statistics ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">SACCO members</Typography>
                                    <Typography variant="h5" style={{
                                        fontSize: "3em",
                                        fontWeight: "bold",
                                        marginLeft: "100px"
                                    }}
                                    
                                    >{statistics.numberOfMembers}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                <Typography variant="h5">Pending Applications</Typography>
                                    <Typography variant="h5" style={{
                                        fontSize: "3em",
                                        fontWeight: "bold",
                                        marginLeft: "100px"
                                    }}
                                    
                                    >{statistics.numberOfPendingApplications}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                <Typography variant="h5">Declined Applications</Typography>
                                    <Typography variant="h5" style={{
                                        fontSize: "3em",
                                        fontWeight: "bold",
                                        marginLeft: "100px"
                                    }}
                                    
                                    >{statistics.numberOfDeclinedApplications}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                <Typography variant="h5">Total money(UGx)</Typography>
                                    <Typography variant="h5" style={{
                                        fontSize: "3em",
                                        fontWeight: "bold",
                                        marginLeft: "40px"
                                    }}
                                    
                                    >{statistics.totalAccountBalance}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Card>
                        <CardContent>
                            <canvas ref={chartRef} width={200} height={200}/>
                        </CardContent>
                    </Card>
                </>
            ):(
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                    <CircularProgress />
                </div>
            )}
        </div>
     );
}
 
export default Dashboard;