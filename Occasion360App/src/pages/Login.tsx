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
    IonItem , IonToast} from '@ionic/react';

import { useState} from 'react';
import { useHistory } from 'react-router-dom';    


import './Login.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';

import { arrowBackOutline } from 'ionicons/icons';

const Login: React.FC = () => {
  const history = useHistory();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleMailChange = (e: CustomEvent) => {
    setMail(e.detail.value as string);
    //console.log(mail);
  };

  const handlePasswordChange = (ex: CustomEvent) => {
    setPassword(ex.detail.value as string);
    //console.log(password);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://test-springboot-production.up.railway.app/utilisateurs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.result && result.result.token) {
          // La vérification a réussi, stocker le token dans le localStorage
          localStorage.setItem('token', result.result.token);
          history.push('/page');
        } else {
          // La vérification a échoué, afficher un message d'erreur ou prendre d'autres mesures
          console.error('Échec de la vérification de l\'utilisateur');
          //setError('Failed to authenticate user');
          setErrorToast('Échec de la vérification de l\'utilisateur');
        }
      } else {
        // Gérer les erreurs de l'API
        console.error('Erreur lors de la requête vers l\'API');
        //setError('Error in API request');
        setErrorToast('Error in API request');
      }
    } catch (error) {
      console.error('Erreur lors de la requête vers l\'API', error);
      //setError('Error in API request: ' + error);
      setErrorToast('Error in API request: ' + error);
      
    }
  };

  return (
  <IonPage>
    
    <IonHeader className='login-header' translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <a href="/Acceuil" className='retour'><IonIcon icon={arrowBackOutline} /></a>
        </IonButtons>
        <IonTitle>SIGN IN</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className='login-content'>
      <div className='logo'>
        <h1>OCCASION 360</h1>
      </div>
      
      <div className='form'>
        <IonInput type='email' placeholder="Email" value={mail}  onIonInput={handleMailChange}></IonInput>
        <IonInput type='password' placeholder='password' value={password}  onIonInput={handlePasswordChange}></IonInput>
      </div>

      <IonToast className='error-Toast'
        isOpen={errorToast !== null}
        onDidDismiss={() => setErrorToast(null)}
        message={errorToast || ''}
        duration={5000}
      />

      <div className='login-button'  onClick={handleLogin}>
          LOGIN <IonIcon icon={chevronForwardCircleOutline} ></IonIcon>
      </div>
      
      <div className='login-footer'>
        <h3><a href="/inscription">Don't have an account ? <span>Sign Up</span></a></h3>
      </div>
    </IonContent>  

  </IonPage>
  );
};

export default Login;
