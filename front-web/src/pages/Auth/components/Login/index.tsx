import ButtonIcon from 'core/components/Buttonicon';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type Inputs = {
    username: string,
    password: string,
};

const Login = () => {

    const [hasError, setHasError] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        makeLogin(data)
        .then( response => {
            setHasError(false)
        })
        .catch( () => setHasError(true))
    }

    return (
        <AuthCard title="Login">
           
            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}

            

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    {...register("username", { required: true })}
                    className="form-control input-base margin-bottom-30"
                    placeholder="E-mail"
                />
                <input
                    type="password"
                    {...register("password",{ required: true })}
                    className="form-control input-base"
                    placeholder="Senha"
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="Logar" />
                </div>
                <div className="text-center">
                    <span className="not-registered">Não tem cadastro</span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>

            </form>
        </AuthCard>
    );
}

export default Login;