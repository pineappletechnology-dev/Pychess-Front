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
                <p>Adicione seus dados para cadastro</p>
            </div>

            <div className={styles.loginContainer}>
            <Input inputLabel="Nome de usuário" inputName="username" inputText="Digite seu nome de usuário"></Input>
            <Input inputLabel="Email" inputName="email" inputText="Digite seu email"></Input>
            <PasswordInput inputLabel="Senha" inputName="password" inputText="Digite sua senha"></PasswordInput>
            <PasswordInput inputLabel="Confirmar senha" inputName="" inputText="confirme sua senha"></PasswordInput>
            <GenericButton text='Entrar'></GenericButton>
            <p>Já tem uma conta? <a href="/login">Entre agora</a></p>
            </div>

            <Footer iconName='person.svg' text='Registro'></Footer>
        </div>
    )
}