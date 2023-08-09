import React, { useState, useEffect } from 'react'
import "./search.css"
import Select from 'react-select';

function Search() {
    const [tipologia, setTipologia] = useState("case");
    const [ubicazione, setUbicazione] = useState("Salento");
    const [fascia, setFascia] = useState("Salento");
    let prezzMin = 0;
    let prezzMax = 0;
    const prezzo = [0, 10000, 20000, 30000, 40000, 50000, 100000, 200000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1500000]
    const prezzostring = ['0', '10.000', '20.000', '30.000', '40.000', '50.000', '100.000', '200.000', '400.000', '500.000', '600.000', '700.000', '800.000', '900.000', '1Mln', '1.1Mln', '1.5Mln']
    const superficie = [0, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900]
    const superficieString = ['0', '40 m²', '60 m²', '80 m²', '100 m²', '120 m²', '140 m²', '160 m²', '180 m²', '200 m²', '250 m²', '300 m²', '350 m²', '400 m²', '500 m²', '600 m²', '700 m²', '800 m²', '900 m²']
    const bagni = [1, 2, 3, 4]
    const locali = [1, 2, 3, 4, 5, 6]


    const data_tipologia = [
        {
            value: "Case",
            label: "Case"
        },
        {
            value: "Appartamento",
            label: "Appartamenti"
        },
        {
            value: "Monolocali",
            label: "Monolocali"
        },
        {
            value: "Bilocali",
            label: "Bilocali"
        },
    ];

    const data_ubicazione = [
        {
            value: "Puglia",
            label: "Puglia"
        },
        {
            value: "Lecce",
            label: "Lecce"
        },
        {
            value: "Salento",
            label: "Salento"
        },
        {
            value: "Bari",
            label: "Bari"
        },
        {
            value: "Brindisi",
            label: "Brindisi"
        },
        {
            value: "Adriatica Ionica",
            label: "Adriatica Ionica"
        },
        {
            value: "Punta di Leuca",
            label: "Punta di Leuca"
        },
        {
            value: "Valle Idria",
            label: "Valle Idria"
        }
    ];

    const data_fascia = [
        {
            value: "Adriatica",
            label: "Adriatica"
        },
        {
            value: "Ionica",
            label: "Ionica"
        },
        {
            value: "Salento",
            label: "Salento"
        },
        {
            value: "Lecce",
            label: "Lecce"
        },
        {
            value: "Valle di Idria",
            label: "Valle di Idria"
        },
    ];

    return (
        <div className='search'>
            <Select
                className='input_label'
                defaultValue={tipologia[0]}
                options={data_tipologia} // set list of the data
                onChange={(e) => setTipologia(e.value)} // assign onChange function
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '3px',
                    colors: {
                        ...theme.colors,
                        primary25: 'rgb(255 85 85)',
                        primary: 'red',
                    },
                })}
            />
            <Select
                className='input_label'
                defaultValue={ubicazione[0]}
                options={data_ubicazione} // set list of the data
                onChange={(e) => setUbicazione(e.value)} // assign onChange function
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '3px',
                    colors: {
                        ...theme.colors,
                        primary25: 'rgb(255 85 85)',
                        primary: 'red',
                    },
                })}
            />
            <Select
                className='input_label'
                defaultValue={fascia[0]}
                options={data_fascia} // set list of the data
                onChange={(e) => setFascia(e.value)} // assign onChange function
                theme={(theme) => ({
                    ...theme,
                    borderRadius: '3px',
                    colors: {
                        ...theme.colors,
                        primary25: 'rgb(255 85 85)',
                        primary: 'red',
                    },
                })}
            />


        </div>
    )
}

export default Search