import React from 'react';
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
    IonItem , IonToast , IonCardHeader , IonCardTitle ,
    IonCardSubtitle ,IonList ,IonThumbnail,IonLabel
    } from '@ionic/react';
import { person, mail, logOut } from 'ionicons/icons';

import './Profil.css';

import { useState , useEffect} from 'react';

import { logoFacebook } from 'ionicons/icons';
import { logoTwitter } from 'ionicons/icons';
import { logoGoogle } from 'ionicons/icons';
import { callOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';    
import { jwtDecode } from 'jwt-decode';

const Profil: React.FC = () => {
    const history = useHistory();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const checkTocken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                history.replace('/login');
            }
            else{
                try {
                    const decodedtoken = jwtDecode(token);
                    const now = Date.now() / 1000;

                } catch (error) {
                    localStorage.removeItem('token');
                    history.replace('/inscription');
                }
            }
        }
        checkTocken();
    }, []);



    useEffect(() => {
        // Fonction pour récupérer les détails de l'utilisateur
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                const response = await fetch('https://test-springboot-production.up.railway.app/utilisateurs/details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result && result.result) {
                        setUserData(result.result);
                    } else {
                        console.error('Échec de la récupération des détails de l\'utilisateur');
                    }
                } else {
                    console.error('Erreur lors de la requête vers l\'API');
                }
            } catch (error) {
                console.error('Erreur lors de la requête vers l\'API', error);
            }
        };
        fetchUserData();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        history.replace('/login');
    };

    return (
        <IonPage>
            <IonContent className='profil-content'>
            <div className='Titre'>
                <h1>OCCASION 360</h1>
            </div>
            
            
            <div className='profile-info'>
                <div className='profile-icon'>
                    <IonIcon icon={person} />
                </div>
                <div className='user-details'>
                    <IonItem>
                        <IonLabel>
                        <p><b>NOM : </b> {userData && userData.nom} </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                        <p><b>PRENOM : </b> {userData && userData.prenom} </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                        <p><b>Date De Naissance : </b> {userData && userData.datenaissance} </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                        <p><b>EMAIL : </b> {userData && userData.mail} </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                        <p><b>CIN : </b> {userData && userData.cin} </p>
                        </IonLabel>
                    </IonItem>
                </div>
            </div>

            <IonButton expand="block" fill="outline" className="logout-btn" onClick={handleLogout}>
                <IonIcon icon={logOut}></IonIcon> Logout
            </IonButton>

            <div className='socials'>
                <IonButton className='btn-fb'><IonIcon icon={logoFacebook}></IonIcon></IonButton>
                <IonButton className='btn-twitter'><IonIcon icon={logoTwitter}></IonIcon></IonButton>
                <IonButton className='btn-google'><IonIcon icon={logoGoogle}></IonIcon></IonButton>
                <IonButton className='btn-cl'><IonIcon icon={callOutline}></IonIcon></IonButton>
            </div>

            <br></br>
            </IonContent>  
        </IonPage>
    );
};

export default Profil;
