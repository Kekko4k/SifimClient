import './filter.css';
import Checkbox from './checkbox/checkbox';

let FilterHouse = (props) => {
    const queryParameters = new URLSearchParams(window.location.search)

    let tipolog="";
    if (queryParameters.get("tipologia")) {
        tipolog = (queryParameters.get("tipologia"));
    }
    const tipologia = ['case','Appartamento','monolocali','bilocali'];

    let prezzMin = 0;
    if (queryParameters.get("prezzoMin")) {
        prezzMin = parseInt(queryParameters.get("prezzoMin"));
    }

    let prezzMax = 0;
    if (queryParameters.get("prezzoMax")) {
        prezzMax = parseInt(queryParameters.get("prezzoMax"));
    }
    const prezzo = [0, 10000, 20000, 30000, 40000, 50000, 100000, 200000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1500000]
    const prezzostring = ['0', '10.000', '20.000', '30.000', '40.000', '50.000', '100.000', '200.000', '400.000', '500.000', '600.000', '700.000', '800.000', '900.000', '1Mln', '1.1Mln', '1.5Mln']


    let superfMin = 0;
    if (queryParameters.get("superficieMin")) {
        superfMin = parseInt(queryParameters.get("superficieMin"));
    }

    let superfMax = 0;
    if (queryParameters.get("superficieMax")) {
        superfMax = parseInt(queryParameters.get("superficieMax"));
    }
    const superficie = [0, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900]
    const superficieString = ['0', '40 m²', '60 m²', '80 m²', '100 m²', '120 m²', '140 m²', '160 m²', '180 m²', '200 m²', '250 m²', '300 m²', '350 m²', '400 m²', '500 m²', '600 m²', '700 m²', '800 m²', '900 m²']




    let bagn = [];
    if (queryParameters.get("bagni")) {
        bagn = queryParameters.get("bagni");
    }
    const bagni = [1, 2, 3, 4]

    let local = []
    if (queryParameters.get("locali")) {
        local = queryParameters.get("locali");
    }
    const locali = [1, 2, 3, 4, 5, 6]

    const onChangeTipologia = (e) => {
        props.tipologia(e.target.value)
    }

    const onChangePrezzoMin = (e) => {
        props.prezzoMin(e.target.value)
    }

    const onChangePrezzoMax = (e) => {
        props.prezzoMax(e.target.value)
    }

    const onChangeSuperficieMin = (e) => {
        props.superficieMin(e.target.value)
    }

    const onChangeSuperficieMax = (e) => {
        props.superficieMax(e.target.value)
    }

    const onChangeLocali = (id) => {
        props.locali(id)
    }

    const onChangeBagni = (id) => {
        props.bagni(id)
    }

    function option(actualData, prezzostring, i, select) {
        if (actualData === select) {
            return <option  value={actualData} selected> {prezzostring[i]} </option>
        }
        else {
            return <option value={actualData}  > {prezzostring[i]} </option>
        }
    }

    return (
        <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <div className="filtro">
        <b>Tipologia</b>
        <div>
            <div>
                <select name="tipologia" className='tipologia' onChange={onChangeTipologia}>
                    {tipologia.map((actualData, index) => (
                        option(actualData, tipologia, index, tipolog)
                    ))}
                </select>
            </div>
        </div>
        <b>Prezzo</b>
        <div class="prezzo">
            <div>
                <a >Min</a>
                <select name="prezzo" onChange={onChangePrezzoMin}>
                    {prezzo.map((actualData, index) => (
                        option(actualData, prezzostring, index, prezzMin)
                    ))}
                </select>
            </div>
            <div>
                <a>Max</a>
                <select name="prezzo" onChange={onChangePrezzoMax}>
                    {prezzo.map((actualData, index) => (
                        option(actualData, prezzostring, index, prezzMax)
                    ))}
                </select>
            </div>
        </div>
        <b>Superficie</b>
        <div class="prezzo">
            <div>
                <a>Min</a>
                <select name="prezzo" onChange={onChangeSuperficieMin}>
                    {superficie.map((actualData, index) => (
                        option(actualData, superficieString, index, superfMin)
                    ))}
                </select>
            </div>
            <div>
                <a>Max</a>
                <select name="prezzo" onChange={onChangeSuperficieMax}>
                    {superficie.map((actualData, index) => (
                        option(actualData, superficieString, index, superfMax)
                    ))}
                </select>
            </div>
        </div>
        <details>
            <summary>Locali</summary>
            <div className='single_filter_column'>
                {locali.map((actualData, index) => (
                    <div className="item">
                        <Checkbox actualData={actualData} check={local.indexOf(actualData)} string={"più locali"} max={6} id={onChangeLocali} />
                    </div>
                ))}
            </div>
        </details>
        <details>
            <summary>Bagni</summary>
            <div className='single_filter_column'>
                {bagni.map((actualData) => (
                    <div className="item">
                        <Checkbox actualData={actualData} check={bagn.indexOf(actualData)} string={"più bagni"} max={4} id={onChangeBagni} />
                    </div>
                ))}
            </div>
        </details>
    </div>
    </div>);
}

export default FilterHouse;