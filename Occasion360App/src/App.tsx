import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Acceuil from "./pages/Acceuil";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Page from "./pages/Page";
import Profil from "./pages/Profil";
import { addOutline, carOutline, personOutline } from "ionicons/icons";
import Ajouter from "./pages/Ajouter";
import Annonces from "./pages/Annonces";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/profil">
          <Profil />
        </Route>
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
        <Route exact path="/ajouter">
            <Ajouter />
          </Route>
          <Route exact path="/annonces">
            <Annonces />
          </Route>
        <Route exact path="/">
          <Redirect to="/acceuil" />
        </Route>

      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="ajouter" href="/ajouter">
          <IonIcon aria-hidden="true" icon={addOutline} />
          <IonLabel>Ajouter</IonLabel>
        </IonTabButton>
        <IonTabButton tab="annonces" href="/annonces">
          <IonIcon aria-hidden="true" icon={carOutline} />
          <IonLabel>Mes annonces</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profil" href="/profil">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
