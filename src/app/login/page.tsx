import PasswordInput from '@/components/PasswordInput/PasswordInput';
import '../../styles/globals.css'
import Input from "@/components/Input/Input";
import GenericButton from '@/components/GenericButton/GenericButton';
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';


export default function Login() {
    return (
        <div className={styles.pageContainer}>

            <div className={styles.splashFooterContainer}>
                <Image src="/icons/castle.svg" alt="Profile" width={50} height={50} />
                <p>PyChess</p>
                <p>Entre com sua conta para jogar</p>
            </div>

            <div className={styles.loginContainer}>
                <Input inputLabel="Nome de usuário" inputName="username" inputText="Digite seu nome de usuário"></Input>
                <PasswordInput inputLabel="Senha" inputName="password" inputText="Digite sua senha"></PasswordInput>
                <GenericButton text='Entrar'></GenericButton>
                <div className={styles.rememberContainer}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Lembrar de mim</label>
                </div>
                <a href="#">Esqueceu sua senha?</a>
                <p className={styles.loginOptions}>Não tem uma conta? <a className={styles.linkHighlight} href="/register">Cadastre-se</a></p>
            </div>

            <Footer iconName='person.svg' text='Login'></Footer>
        </div>
    )
}