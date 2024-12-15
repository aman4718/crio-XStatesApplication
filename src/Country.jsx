import { useEffect, useState } from "react";


const API_URL = 'https://crio-location-selector.onrender.com/countries';
const CountryData = () => {
    const [county,setCountry] = useState([]);
    const [disableStateOptions,setDisableStateOptions] = useState(true);
    const [selectedCountry,setSelectedCountry] = useState('');
    const [state,setState] = useState([]);
    const [selectedState,setSelectedState] = useState('');
    const[city,setCity] = useState([]);
    const [selectedCity,setSelectedCity] = useState('');
    const [isCityDisable,setIsCityDisable] = useState(true);
    const [showLabel,setShowLabel] = useState(false);
    useEffect(() => {
        setShowLabel(false);
        fetch(API_URL)
        .then((res) => res.json())
        .then((res) => setCountry(res))
        .catch((error) => console.error(error))
    },[])
    const handleOnCountryChange = async (event) => {
        let SelectedContry = event.target.value;
        setSelectedCountry(SelectedContry)
        setShowLabel(false)
        setSelectedCity([])
        setSelectedState([])
        if(SelectedContry){
            try {
               const response = await fetch(`https://crio-location-selector.onrender.com/country=${SelectedContry}/states`);
               const data = await response.json();
               console.log(data)
               setState(data)
               setDisableStateOptions(false)
            } catch (error) {
                setState([])
                setDisableStateOptions(true)
            }
        }
        
    }
    const handleOnStateChange = async (event) => {
        let stateSelected = event.target.value;
        setSelectedState(stateSelected);
        setSelectedCity([]);
        try {
            const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateSelected}/cities`);
            const data = await res.json();
            setCity(data);
            setIsCityDisable(false)
        } catch (error) {
            setCity([])
            setIsCityDisable(true)
        }
    }
    const handleOnCityChange = async (event) => {
        setShowLabel(true);
        setSelectedCity(event.target.value);
    }
    return(
            <div>
                <h1>Select Location</h1>
                <select style={{ fontWeight: "bold", marginRight: "10px" }} onChange={handleOnCountryChange} value={selectedCountry}>
                    <option key={''} value="">Select Country</option>
                    {
                    county.map((values,index)=>(
                        <option key={index} value={values}>{values}</option>
                    ))
                    }
                </select>
                <select style={{ fontWeight: "bold", marginRight: "10px" }} disabled={disableStateOptions} onChange={handleOnStateChange} value={selectedState}>
                    <option key={''} value={''}>Select State</option>
                    {
                        state.map((values)=>(
                            <option key={values} value={values}>{values}</option>
                        ))
                    }
                </select>
                <select style={{fontWeight: "bold", marginRight: "10px" }} disabled={isCityDisable} value={selectedCity} onChange={handleOnCityChange}>
                    <option key={''} value={''}>Select City</option>
                    {
                        city.map((value)=>(
                            <option key={value} value={value}>{value}</option>
                        ))
                    }
                </select>
                {showLabel ? <div style={{marginTop:'20px' , fontWeight:'bold', fontSize:'20px'}}>You Selected {selectedCity}, {selectedState}, {selectedCountry}</div>: ''}
            </div>
    )
}
export default CountryData;