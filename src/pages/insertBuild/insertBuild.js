import { useState } from "react";
import axios from "axios";
import "./insertBuild.css"
import Select from 'react-select';

function Inserimento() {
    const date = new Date();
    const [altro, setAltro] = useState("");
    const [anno_costruzione, setAnno_costruzione] = useState(null);
    const [dataInserimento, setDataInserimento] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    const [piano, setPiano] = useState(null);
    const [spese_Condominio, setSpese_Condominio] = useState(null);

    const [tipologia, setTipologia] = useState("case");
    const [indirizzo, setIndirizzo] = useState(null);
    const [comune, setComune] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [stanze, setStanze] = useState(null);
    const [posti_Auto, setPosti_Auto] = useState(null);
    const [superficie, setSuperficie] = useState(null);
    const [stato, setStato] = useState(null);
    const [certificazione, setCertificazione] = useState("");
    const [climatizzatore, setClimatizzatore] = useState("");
    const [riscaldamento, setRiscaldamento] = useState("");
    const [titolo, setTitolo] = useState("")
    const [prezzo, setPrezzo] = useState(null);
    const [prezzoStamp, setprezzoStamp] = useState(null)
    const [descrizione, setDescrizione] = useState(null);

    const [totali_piano_edificio, setTotali_piano_edificio] = useState(null);
    const [files, setFile] = useState();

    const [message, setMessage] = useState("");
    const [previews, setPreviews] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const data = [
        {
            value: "Casa indipendente",
            label: "Casa indipendente"
        },
        {
            value: "Appartamento",
            label: "Appartamento"
        },
        {
            value: "Villa",
            label: "Villa"
        },
        {
            value: "Villetta a schiera",
            label: "Villetta a schiera"
        },
        {
            value: "Masseria",
            label: "Masseria"
        },
        {
            value: "Ufficio",
            label: "Ufficio"
        },
        {
            value: "Locale",
            label: "Locale"
        },
        {
            value: "Garage",
            label: "Garage"
        },
        {
            value: "Terreno",
            label: "Terreno"
        },
        {
            value: "Cantina",
            label: "Cantina"
        },
        {
            value: "Edificio",
            label: "Edificio"
        }
    ];


    function ResetAll(){
                    // Reimposta tutte le variabili dello stato a null o ai loro valori iniziali
                    setAltro("");
                    setAnno_costruzione("");
                    setDataInserimento(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
                    setPiano(null);
                    setSpese_Condominio(null);
                    setTipologia("case");
                    setIndirizzo("");
                    setComune("");
                    setProvincia("");
                    setStanze("");
                    setPosti_Auto("");
                    setSuperficie("");
                    setStato("");
                    setCertificazione("");
                    setClimatizzatore("");
                    setRiscaldamento("");
                    setTitolo("");
                    setPrezzo("");
                    setprezzoStamp("");
                    setDescrizione("");
                    setTotali_piano_edificio("");
                    setFile("");
                    setMessage("");
                    setPreviews([]);
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiUrl+"/inserBuild/add", {
                anno_costruzione: anno_costruzione,
                certificazione: certificazione,
                climatizzatore: climatizzatore,
                dataInserimento: dataInserimento,
                piano: piano,
                posti_Auto: posti_Auto,
                prezzo: prezzo,
                riscaldamento: riscaldamento,
                spese_Condominio: spese_Condominio,
                stanze: stanze,
                stato: stato,
                superficie: superficie,
                tipologia: tipologia,
                totali_piano_edificio: totali_piano_edificio,
                descrizione: descrizione,
                indirizzo: indirizzo,
                comune: comune,
                provincia: provincia,
                titolo: titolo,
                altro: altro
            }).then((response) => {
                if (files && files.length > 0) {
                    //prendo l'id della casa aggiunta e aggiungo sia l'id che le immagini nella variabile di tipo FormData 
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formData.append('files', files[i]);
                        formData.append("Id_app", response.data.insertedId);
                    }
                    try {
                        const fetchResponse = fetch(apiUrl+'/inserBuild/files', {
                            method: 'POST',
                            body: formData,
                        }).then((response) => {
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
                ResetAll()
            });
        } catch (err) {
            console.log(err);
        }





    };
    const handleChangeFiles = (e) => {
        const files = e.target.files;
        setFile(files);

        const previewsArray = [];
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewsArray.push(event.target.result);
                setPreviews([...previewsArray]);
            };
            reader.readAsDataURL(file);
        }
    };



    const handlePrezzoChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Rimuovi tutti i caratteri non numerici
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Aggiungi spazio ogni 3 cifre
        setprezzoStamp(formattedValue)
        setPrezzo(value.replace(/\s/g, ""));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="Form_inserimento">
                    <div className="input_layout">
                        <h1>Inserisci Casa</h1>
                        <div className="input_grid">
                            <Select

                                defaultValue={data[0]}
                                options={data} // set list of the data
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
                        </div>
                        <div className="input_grid">
                            <input value={indirizzo} onChange={(e) => setIndirizzo(e.target.value)} placeholder="via" style={{ gridColumn: "1/span 2" }} />
                            <input value={comune} onChange={(e) => setComune(e.target.value)} placeholder="comune" style={{ gridColumn: "3" }} />
                            <input value={provincia} onChange={(e) => setProvincia(e.target.value)} placeholder="provincia" style={{ gridColumn: "4" }} />
                        </div>
                        <div className="input_grid">
                            <input type="number" class="number-input" value={stanze} onChange={(e) => setStanze(e.target.value)} placeholder="Stanze" style={{ gridColumn: "1" }} />
                            <input type="number" class="number-input" value={posti_Auto} onChange={(e) => setPosti_Auto(e.target.value)} placeholder="Posti Auto" style={{ gridColumn: "2" }} />
                            <input type="number" class="number-input" value={superficie} onChange={(e) => setSuperficie(e.target.value)} placeholder="Superficie" style={{ gridColumn: "3" }} />
                            <input type="date" class="number-input" value={anno_costruzione} onChange={(e) => setAnno_costruzione(e.target.value)} placeholder="Anno Costruzione" style={{ gridColumn: "4" }} />
                        </div>
                        <div className="input_grid">
                            <input value={stato} placeholder="Stato" onChange={(e) => setStato(e.target.value)} style={{ gridColumn: "1" }} />
                            <input value={certificazione} onChange={(e) => setCertificazione(e.target.value)} placeholder="Certificazione" style={{ gridColumn: "2" }} />
                            <input value={climatizzatore} onChange={(e) => setClimatizzatore(e.target.value)} placeholder="Climatizzzione" style={{ gridColumn: "3" }} />
                            <input value={riscaldamento} onChange={(e) => setRiscaldamento(e.target.value)} placeholder="Riscaldamento" style={{ gridColumn: "4" }} />
                        </div>
                        {
                            tipologia === ("Appartamento") &&
                            <div className="input_grid">
                                <input type="number" class="number-input" value={piano} placeholder="Piano" onChange={(e) => setPiano(e.target.value)} style={{ gridColumn: "1" }} />
                                <input type="number" class="number-input" value={totali_piano_edificio} onChange={(e) => setTotali_piano_edificio(e.target.value)} placeholder="Totale piano edificio" style={{ gridColumn: "2" }} />
                                <input type="number" class="number-input" value={spese_Condominio} onChange={(e) => setSpese_Condominio(e.target.value)} placeholder="Spese Condominio" style={{ gridColumn: "3" }} />
                            </div>
                        }
                        <div className="input_grid">
                            <input value={titolo} onChange={(e) => setTitolo(e.target.value)} placeholder="Titolo" style={{ gridColumn: "1/span 3" }} />
                            <input value={prezzoStamp} onChange={handlePrezzoChange} placeholder="Prezzo" style={{ gridColumn: "4" }} ></input>
                        </div>
                        <div className="input_grid">
                            <textarea value={descrizione} onChange={(e) => setDescrizione(e.target.value)} placeholder="Descrizione" style={{ gridColumn: "1/span 4" }} />
                        </div>
                        <input type="file" multiple onChange={handleChangeFiles} />

                        <div className="prev_img">
                            {previews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`} />
                            ))}
                        </div>
                        <button type="submit" id="create_build" >Invia</button>

                        <div className="message">{message ? <p>{message}</p> : null}</div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default Inserimento;


