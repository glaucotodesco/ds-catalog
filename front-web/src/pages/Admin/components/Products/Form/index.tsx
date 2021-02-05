import BaseForm from '../../BaseForm';
import './styles.scss';

const Form = () => {
    return (
        <BaseForm title="Cadastrar Produto">
            <div className="row">
                <div className="col-6">
                    <input className="form-control" />
                </div>
            </div>
        </BaseForm>
    )
}
export default Form;