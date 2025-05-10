import { countries } from "../../data/countries";
import Alert from "../../Alert/Alert";
import { useState } from "react";
import type { SearchType } from "../../types";
import styles from './Form.module.css'

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : [e.target.value]
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(search).includes('')) {
            setAlert('todos los campos son obligatorios')
            return
        }

        fetchWeather(search)
    }

    return (
        <>
        <form className={styles.form} onSubmit={handleSubmit}>

            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                    <input type="text" placeholder="Ciudad:"
                            id="city" name="city" value={search.city}
                            onChange={handleChange}
                    />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais: </label>
                    <select value={search.country} id="country" 
                            onChange={handleChange} name="country">
                        <option value="">--Seleccione un País:</option>
                        {countries.map( country => (
                            <option value={country.code} 
                                    key={country.code}>
                                        {country.name}
                            </option>
                        ))}
                    </select>
            </div>
            <input type="submit" placeholder="Consultar clima:"
                    className={styles.submit}/>
        </form>
        </>
    )
}
