import ButtonIcon from 'core/components/Buttonicon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type Inputs = {
    username: string,
    password: string,
};

type LocationState ={
    from: string;
}


const Login = () => {

    const [hasError, setHasError] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const history = useHistory();
    const location = useLocation <LocationState>();
    const { from } = location.state || {from: {pathname: "/admin"}};

    const onSubmit: SubmitHandler<Inputs> = data => {
        makeLogin(data)
            .then(response => {
                saveSessionData(response.data);
                history.replace(from);
                setHasError(false);

            })
            .catch(() =>
                setHasError(true)
            )
    }

    return (
        <AuthCard title="Login">

            {hasError && (
                <div className="alert alert-danger mt-5">
                    Usuário ou senha inválidos!
                </div>
            )}

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="margin-bottom-30">
                    <input
                        type="email"
                        {...register("username", {
                            required: "Campo obrigatório", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                        className={`form-control input-base ${errors.username ? 'is-invalid': ''} `}
                        placeholder="E-mail"
                    />
                    {errors.username && (<div className="invalid-feedback d-block">
                        {errors.username.message}
                    </div>
                    )
                    }
                </div>

                <div>
                    <input
                        type="password"
                        {...register("password", { 
                            required: "Campo Obrigatório" 
                        })}
                        className={`form-control input-base ${errors.password ? 'is-invalid': ''} `}
                        placeholder="Senha"
                    />

                    {errors.password && (<div className="invalid-feedback d-block">
                        {errors.password.message}
                    </div>
                    )
                    }

                </div>
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