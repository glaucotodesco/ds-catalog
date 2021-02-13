import { makeRequest } from 'core/utils/request';
import { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';


type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

    const [formData, setFormData] = useState<FormState>({name:'', price:'',category:'', description:''});
    

    const handleOnChange = (event: FormEvent) => {
        const name  = event.target.name;
        const value = event.target.value;
        setFormData( data => ({...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const payLoad = {
            ...formData,
            imgUrl: 'https://static.netshoes.com.br/produtos/console-playstation-5-digital-edition-ps5-sony/14/D32-2448-014/D32-2448-014_zoom1.jpg',
            categories : [{id:formData.category}]
        }
        
        makeRequest( {url: '/products', method: 'POST', data: payLoad})
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="Cadastrar Produto">
                <div className="row">
                    <div className="col-6">
                        <input className="form-control mb-5"
                            value={formData.name}
                            name="name"
                            onChange={handleOnChange}
                            placeholder="Nome do Produto"
                        />
                        <select
                            value={formData.category}
                            className="form-control mb-5"
                            name="category"
                            onChange={handleOnChange}
                        >
                                <option value="1">Livros</option>
                                <option value="3">Computadore</option>
                                <option value="2">Eletrônicos</option>
                        </select>

                        <input className="form-control"
                            value={formData.price}
                            name="price"
                            onChange={handleOnChange}
                            placeholder="Preço do Produto"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            className="form-control"
                            name="description"
                            value={formData.description}
                            cols={30}
                            rows={10}
                            onChange={handleOnChange}
                            />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;