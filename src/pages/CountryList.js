import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from '../api';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [selectValue, setSelectValue] = useState("Pais");
    const history = useHistory();
    

    function onSubmit(e){
        e.preventDefault();
        if(selectValue !== "Pais"){
            history.push(`/${selectValue}/cases`);
        }
    }

    async function setList(){
        const response = await api.get(`/cases`);

        var array = [];

        Object.keys(response.data).forEach(
            function(item){
                array.push(item);
            }
        )
        console.log(array);
        setCountries(array);
    }

    useEffect(() => {
        setList();
    }, []);

    return (
        <div className="AppHome">
            <h1>Covid-19</h1>

            <select value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                <option value={selectValue} disabled>{selectValue}</option>
                {countries.map(item => (
                <option value={item}>{item}</option>
                ))}        
            </select>
            <button onClick={onSubmit}>Buscar</button>
        </div>
    );
};

export default CountryList;