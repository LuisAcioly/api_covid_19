import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import api from '../api';
import '../App.css';

const Vaccines = () => {
    const [vaccines, setVaccines] = useState({});
    const history = useHistory();
    const param = useParams();

    function onSubmit(e){
        e.preventDefault();
        history.push(`/${param.country}/cases`);
    }

    function getBack(){
        history.push('/');
    }

    useEffect(() => {
        setData();
    }, []);

    async function setData () {
        var name;
        if(param.country === 'US'){
            name = "United%20States";
        }
        else{
            name = param.country;
        }
        const response = await api.get('/vaccines?country=' + name);
        const data = response.data;
        console.log(data);
        
        setVaccines(data[Object.keys(data)]);
    }

    return (

        <div className="App">
            <div className="header">
                <button className="back" onClick={getBack}><FaArrowCircleLeft/></button> <h1>Covid-19 {param.country}</h1>
            </div>
            <div className="buttons">
                <button onClick={onSubmit}>Casos</button>
                <button className="chosen">Vacinação</button>
            </div>
            <div className="vaccineContent">
                <ul>
                    <div className="vaccineInfo">
                        <li key={vaccines.country}>
                            <div className="vaccineTitle">
                                {param.country}
                            </div>
                            <p style={{fontSize: 10}}>
                                População:  {vaccines.population}<br/>
                                População Vacinada:  {vaccines.people_vaccinated}<br/>
                                População Parcialmente Vacinada:  {vaccines.people_partially_vaccinated}<br/>
                            </p> 
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
    
};

export default Vaccines;