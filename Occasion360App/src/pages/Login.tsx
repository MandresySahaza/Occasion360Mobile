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

import './Login.css';
import { chevronForwardCircleOutline } from 'ionicons/icons';

import { arrowBackOutline } from 'ionicons/icons';

const Login: React.FC = () => {
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
      <IonInput type='email' placeholder="Email" value={'exemple@gmail.com'}></IonInput>
      <IonInput type='password' placeholder='password' value={'exemple'}></IonInput>
    </div>
    <div className='login-button'>
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
