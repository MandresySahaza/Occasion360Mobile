import { IonContent,
    IonHeader,
    IonPage, 
    IonTitle,
    IonButton,
    IonButtons,
    IonBackButton,
    IonImg,
    IonCard,
    IonToolbar, 
    IonCardContent,
    IonIcon,
    IonInput,
    IonItem} from '@ionic/react';

import './Acceuil.css';


import { mail } from 'ionicons/icons';
import { lockClosed } from 'ionicons/icons';
import { logoFacebook } from 'ionicons/icons';
import { logoTwitter } from 'ionicons/icons';
import { logoGoogle } from 'ionicons/icons';
import { callOutline } from 'ionicons/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { jwtDecode } from 'jwt-decode';


const Acceuil: React.FC = () => {
    const history = useHistory();
    useEffect(() => {
        const checkTocken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                
                try {
                    const decodedtoken = jwtDecode(token);
                    const now = Date.now() / 1000;
                    history.push('/profil');
                } catch (error) {
                    localStorage.removeItem('token');
                    history.replace('/inscription');
                }
            }
        }
        checkTocken();
    }, []);
    return (
        <IonContent fullscreen className='acceuil-content'>
            <div id='header'>
                <div id='app-bar'>
                </div>
                <div id='logo'>
                    <IonImg src="Occasion360_logo.png" alt="logo"></IonImg>
                </div>

                <h2>BIENVENUE</h2>
            </div>

            <IonCard>
                <IonCardContent>
                    <h1>Occasion 360</h1>
                    <p>Vente et achat de voiture d'occasion</p>

                    <IonButton expand='block' fill="outline" routerLink='/login'>SIGN IN</IonButton>
                    <IonButton expand='block' routerLink='/inscription' className='signup-btn'>SIGN UP</IonButton>

                    <div className='line-text'>
                        <span className='lines'></span>
                        <span className='text'>or connect using</span>
                    </div>

                    <div className='socials'>
                        <IonButton className='btn-fb'><IonIcon icon={logoFacebook}></IonIcon></IonButton>
                        <IonButton className='btn-twitter'><IonIcon icon={logoTwitter}></IonIcon></IonButton>
                        <IonButton className='btn-google'><IonIcon icon={logoGoogle}></IonIcon></IonButton>
                        <IonButton className='btn-cl'><IonIcon icon={callOutline}></IonIcon></IonButton>
                    </div>

                </IonCardContent>
            </IonCard>
        </IonContent>
    );
};

export default Acceuil;
