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
    IonItem , IonToast} from '@ionic/react';

import './Inscription.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';

import { arrowBackOutline } from 'ionicons/icons';

import { useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom'; 



const Inscription: React.FC = () => {
    
    const [errorToast, setErrorToast] = useState<string | null>(null);

    const history = useHistory();

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        dateNaissance: null,
        mail: "",
        password: "",
        contact: "",
        adresse: "",
        cin:"",
    });

    const handleInputChange = (e: CustomEvent) => {
        const target = e.target as HTMLIonInputElement;
        const { name, value } = target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData.nom);
        console.log(formData.prenom);
        console.log(formData.dateNaissance);
        console.log(formData.mail);
        console.log(formData.password);
        console.log(formData.contact);
        console.log(formData.adresse);
        console.log(formData.cin);
    }, [formData]);
   

    const handleSignUp = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            //const response = await fetch('https://test-springboot-production.up.railway.app/utilisateurs', {
            const response = await fetch('https://api-finalclouds5-production.up.railway.app/utilisateurs', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                
                if (result && result.result && result.result.token) {
                    localStorage.setItem('token', result.result.token);
                    history.push('/profil');
                } else {
                console.error('Échec de la creation  de l\'utilisateur');
                setErrorToast(result.message);
                }
            } else {
                console.log("tsy makato akory");
                console.error('Erreur lors de la requête vers l\'API');
                setErrorToast('Erreur de connexion');
            }
        } catch (error) {
          console.error('Erreur lors de la requête vers l\'API', error);
          setErrorToast('Erreur lors de la requête vers l\'API: ' + error);
        }
    };

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

            <IonToast className='error-Toast'
            isOpen={errorToast !== null}
            onDidDismiss={() => setErrorToast(null)}
            message={errorToast || ''}
            duration={5000}
            />

            <IonContent className='inscription-content'>
                <div className='logo'>
                <h1>OCCASION 360</h1>
                </div>
                
                <form onSubmit={handleSignUp}   >
                    <div className='form'>
                        <IonInput type='text' placeholder="Nom" name="nom" value={formData.nom} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='text' placeholder='Prenom' name='prenom' value={formData.prenom} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='date' placeholder='Date de Naissance' name='dateNaissance' value={formData.dateNaissance} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='password' placeholder='password' name='password' value={formData.password} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='email' placeholder='Email' name='mail' value={formData.mail} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='text' placeholder='Contact' name='contact' value={formData.contact} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='text' placeholder='Adresse' name='adresse' value={formData.adresse} onIonInput={handleInputChange} required></IonInput>
                        <IonInput type='text' placeholder='numero CIN' name='cin' value={formData.cin} onIonInput={handleInputChange} required></IonInput>
                    </div>
                
                    <IonButton className='signin-button' expand="full" type="submit">
                        SIGN IN <IonIcon icon={chevronForwardCircleOutline} />
                    </IonButton>
                </form>


                <div className='inscription-footer'>
                <h3><a href="/login">Have an account ? <span>Sign In</span></a></h3>
                </div>
            </IonContent>  

        </IonPage>
    );
};

export default Inscription;


