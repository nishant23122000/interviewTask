import {useEffect, useState} from 'react';
import './search.css';

const Search=(props)=>{

    const globalData=props?.data;
    const [value,setValue]=useState("");
    const [data,setData]=useState(globalData);
    useEffect(()=>{
        if(value){
            let min=value-2,max=value+2;
            setData(globalData?.filter((data)=>data.value>min && data.value<max));
        }
       

        
    },[value])
    console.log(data);
    return (
        <div class="search_section">
            <input type="number" name="text" value={value} placeholder="Enter BTC value" onInput={(e)=>setValue(e.target.value)} />
            <br/>
            <br/>
            <br/>
            <div class="list">
                <table >
                    <tr>
                        <th>Hash</th>
                        <th>BTC</th>
                        <th>Time</th>
                        
                    </tr>
                    {
                        data?.length ? (
                            data.map((tran)=>{
                                return (
                                    <tr>
                                        <td>{tran?.hash}</td>
                                        <td>{tran?.value}</td>
                                        <td>{tran?.time}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <p>No Data available</p>
                        )
                          
                    }

                </table>
            </div>
        </div>
    )
}

export default Search;