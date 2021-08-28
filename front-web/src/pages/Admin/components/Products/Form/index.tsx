import { Category} from 'core/types/Products';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';


type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {

    const { productId } = useParams<ParamsType>();
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar Produto' : 'Cadastar Produto';

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);


    useEffect(() => {
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories);
                }
                )
        }
    }, [productId, isEditing, setValue]);

    const onSubmit = (formData: FormState) => {

        const data = { ... formData, price : String(formData.price).replace(',','.')}

        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data
        })
            .then(() => {
                toast.info('Produto cadastrado com sucesso!');
                history.push('/admin/products');

            })
            .catch(() => {
                toast.error('Erro ao cadastrar um produto');
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">

                        <div className="margin-bottom-30">
                            <input


                                {...register("name", {
                                    required: "Campo Obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres!' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres!' },
                                })}

                                name="name"
                                className="form-control input-base"
                                type="text"
                                placeholder="Nome do Produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">

                            <Controller
                                name="categories"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        getOptionLabel={(option: Category) => option.name}
                                        getOptionValue={(option: Category) => String(option.id)}
                                        isLoading={isLoadingCategories}
                                        options={categories}
                                        classNamePrefix="categories-select"
                                        placeholder="Categoria"
                                        isMulti

                                    />
                                )}
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Categoria Obrigatória!
                                </div>
                            )}

                        </div>

                        <div className="margin-bottom-30">
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: "Campo obrigatório" }}
                                render={({field}) =>(
                                        <CurrencyInput
                                            placeholder="Preço"
                                            className="form-control input-base"
                                            disableGroupSeparators={true}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            intlConfig={{ locale: 'pt-BR', currency:'BRL'}}
                                            />
                                )
                                }
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price?.message}
                                </div>
                            )}
                        </div>

                       

                        <div className="margin-bottom-30">
                            <input
                                {...register("imgUrl", {
                                    required: "Campo Obrigatório"
                                })}
                                className="form-control input-base"
                                name="imgUrl"
                                placeholder="Imagem do produto"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">

                        <textarea
                            {...register("description", {
                                required: "Campo Obrigatório"
                            })}
                            className="form-control input-base"
                            name="description"
                            cols={30}
                            rows={10}
                            placeholder="Descrição"
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;