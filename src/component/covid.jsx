import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'

function Covid() {

    const [covidData, setCovidData] = useState([]);



    useEffect(() => {
        axios.get('https://api.covid19api.com/summary')
            .then(res => setCovidData(res.data.Countries))
            .catch(err => console.log(err))

            $(document).ready(()=>{
                $('#covidTable').DataTable()
            })

    }, [covidData])



    return (
        <div>
            <h1 style={{backgroundColor:'black',color:'white',margin:'50px'}}>Covid Status</h1>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <table id='covidTable' className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Confirmed</th>
                                <th>Active</th>
                                <th>Recovered</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>  
                          {covidData.map(obj =>(
                              <tr>
                              <td>{obj.Country}</td>
                              <td>{obj.TotalConfirmed}</td>
                              <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
                              <td>{obj.TotalRecovered}</td>
                              <td>{obj.TotalDeaths}</td>
                              </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Covid;


