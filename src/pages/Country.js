import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import api from '../api';
import '../App.css';

const Country = () => {
    const [cases, setCases] = useState([]);
    const [countries, setCountries] = useState([]);
    const history = useHistory();
    const param = useParams();

    function onSubmit(e){
        e.preventDefault();
        history.push(`/${param.country}/vaccines`);
    }

    function getBack(){
        history.push('/');
    }

    useEffect(() => {
        setData();
    }, []);

    async function setData () {
        console.log(param.country);
        const response = await api.get('/cases?country=' + param.country);
        const data = response.data;

        var array = [];
        var countriesArray = [];

        Object.keys(response.data).forEach(
            function(item){
                array.push(data[item]);
                console.log(data[item]);
                countriesArray.push(item);
            }
        )
        setCases(array);
        setCountries(countriesArray);
        console.log(cases);
    }

    return (
        <div className="App">
            <div className="header">
                <button className="back" onClick={getBack}><FaArrowCircleLeft/></button> <h1>Covid-19 {param.country}</h1>
            </div>

            <div className="buttons">
                <button className="chosen">Casos</button>
                <button onClick={onSubmit}>Vacinação</button>
            </div>
            <div className="content">
                <ul>
                    {cases.map((item, index) =>{
                        console.log(index);
                        return (
                        <div className="info">
                            <li key={index}>
                                <div className="title">
                                    {countries[index] === 'All' ? <p>{param.country}</p> : <p>{countries[index]}</p> }
                                </div>
                                
                                {countries[index] === 'All' ? 
                                    <p style={{fontSize: 10}}>
                                        População:  {cases[index].population}<br/>
                                        Confirmados:  {cases[index].confirmed}<br/>
                                        Recuperados:  {cases[index].recovered}<br/>
                                        Mortes:  {cases[index].deaths}<br/>
                                        Expectativa de vida:  {cases[index].deaths}<br/>
                                    </p> 
                                    :<p style={{fontSize: 10}}>
                                        Confirmados:  {cases[index].confirmed}<br/>
                                        Recuperados:  {cases[index].recovered}<br/>
                                        Mortes:  {cases[index].deaths}<br/>
                                    </p> }
                            </li>
                        </div>)
                    })}
                </ul>
            </div>
        </div>
    );
    
};

export default Country;