import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from './../../model/slice/loginSlice';
import { loginByUsername } from './../../model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUsername } from './../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from './../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from './../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from './../../model/selectors/getLoginError/getLoginError';
import { DynamicModalLoader, ReducersList } from 'shared/lib/components/DynamicModalLoader/DynamicModalLoader';

export interface LoginFormProps {
    className?: string,
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <DynamicModalLoader reducers={initialReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('auth form')} />
                {error && <Text text={t('auth error')} theme={TextTheme.ERROR} />}
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('enter username')}
                    autoFocus={true}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('enter password')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={cls.loginBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('login')}
                </Button>
            </div>
        </DynamicModalLoader>
    );
});

export default LoginForm;