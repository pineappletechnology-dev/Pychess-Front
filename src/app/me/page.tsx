import InfoButton from '@/components/InfoButton/InfoButton';
import '../../styles/globals.css'
import styles from './styles.module.css'
import Image from "next/image";
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default function Me() {
    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
                <div className={styles.dataInputContainer}>
                    <div className={styles.userContent}>
                        <p>Foto do usuário</p>
                        <Image src={`/icons/edit.svg`} alt="Profile" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="text" name="username" id="" placeholder="Nome de usuário" />
                        <Image src={`/icons/edit.svg`} alt="Profile" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="text" name="email" id="" placeholder="E-mail" />
                        <Image src={`/icons/edit.svg`} alt="Profile" width={25} height={25} />
                    </div>

                    <div className={styles.userContent}>
                        <input className={styles.userInput} type="text" name="password" id="" placeholder="Senha" />
                        <Image src={`/icons/edit.svg`} alt="Profile" width={25} height={25} />
                    </div>
                </div>

                <div className={styles.infoButtonContainer}>
                <InfoButton iconName="history.svg" title="Histórico" text="seus jogos anteriores"></InfoButton>
                <InfoButton iconName="crown.svg" title="Ranking" text="confira o seu ranking"></InfoButton>
                </div>

                <button className={styles.deleteAccountButton}>
                    <Image src={'/icons/delete.svg'} alt="trash can" width={50} height={50} />
                    <p>APAGAR CONTA</p>
                </button>
            </div>

            <Footer iconName='person.svg' text='Meu perfil'></Footer>
        </div>
    )
}