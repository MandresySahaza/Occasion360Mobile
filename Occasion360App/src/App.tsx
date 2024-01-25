import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Acceuil from './pages/Acceuil';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import Page from './pages/Page';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/page">
          <Page />
        </Route>
        <Route exact path="/acceuil">
          <Acceuil />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/inscription">
          <Inscription />
        </Route>
        <Route exact path="/">
          <Redirect to="/acceuil" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;


 //https://test-springboot-production.up.railway.app/utilisateurs/register
    // {
    //     "code": 0,
    //     "message": "OK",
    //     "result": {
    //         "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcwNjIwNzMzNywiZXhwIjoxNzA2MjkzNzM3fQ.EJCFmh_gkgPa_5yLgEXwRHMeCoP3rNziS7vg-hROdr4",
    //         "utilisateur": {
    //             "id": 1,
    //             "nom": "RAZA",
    //             "prenom": "Mandresy",
    //             "datenaissance": "2000-01-01",
    //             "dateinscription": "2024-01-25",
    //             "mail": "test@gmail.com",
    //             "contact": "0345597126",
    //             "adresse": "Everywhere",
    //             "cin": "101211547963",
    //             "role": "USER",
    //             "enabled": true,
    //             "authorities": [
    //                 {
    //                     "authority": "ROLE_USER"
    //                 }
    //             ],
    //             "username": "test@gmail.com",
    //             "accountNonExpired": true,
    //             "accountNonLocked": true,
    //             "credentialsNonExpired": true
    //         }
    //     },
    //     "time": 1706207337163
    // }

