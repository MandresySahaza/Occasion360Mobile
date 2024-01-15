import { useState } from 'react';

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
    IonLabel,
    IonItem} from '@ionic/react';

import './Inscription.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';

import { arrowBackOutline } from 'ionicons/icons';


const Inscription: React.FC = () => {
    
    return (
        <IonPage>
        
        <IonHeader className='inscription-header' translucent>
            <IonToolbar>
            <IonButtons slot="start">
                <a href="/Acceuil" className='retour'><IonIcon icon={arrowBackOutline} /></a>
            </IonButtons>
            <IonTitle>SIGN UP</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent className='inscription-content'>
            <div className='logo'>
            <h1>OCCASION 360</h1>
            </div>
            
            <div className='form'>
                <IonInput type='text' placeholder="Nom" ></IonInput>
                <IonInput type='text' placeholder='Prenom'></IonInput>
                <IonInput type='date' placeholder='Date de Naissance'></IonInput>
                <IonInput type='password' placeholder='password'></IonInput>
                <IonInput type='email' placeholder='Email' ></IonInput>
                <IonInput type='text' placeholder='Contact' ></IonInput>
                <IonInput type='text' placeholder='Adresse' ></IonInput>
            </div>

            <div className='inscription-button'>
                SIGN UP <IonIcon icon={chevronForwardCircleOutline} ></IonIcon>
            </div>
            <div className='inscription-footer'>
            <h3><a href="/login">Have an account ? <span>Sign In</span></a></h3>
            </div>
        </IonContent>  

        </IonPage>
    );
};

export default Inscription;
