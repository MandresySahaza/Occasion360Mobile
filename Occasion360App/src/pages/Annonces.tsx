import {
  IonAlert,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import "./Annonces.css";
import { useEffect, useState } from "react";
import Annonce from "../components/Annonce";
import CardAnnonce from "../components/CardAnnonce";
import { useHistory } from "react-router";
import { jwtDecode } from "jwt-decode";

const Annonces: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const checkTocken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        history.replace("/login");
      } else {
        try {
          const decodedtoken = jwtDecode(token);
          const now = Date.now() / 1000;
        } catch (error) {
          localStorage.removeItem("token");
          history.replace("/inscription");
        }
      }
    };

    const getAnnonces = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/annonces/myannonces",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const annonces = await reponse.json();
        setAnnonces(annonces.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };
    checkTocken();
    getAnnonces();
    setIsLoading(false);
  }, []);

  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      window.location.reload();
      event.detail.complete();
    }, 1000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mes annonces</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {annonces.map((annonce, index) => (
            <IonItem key={index}>
              <CardAnnonce annonce={annonce} />
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={isLoading}
          header="Chargement"
          message="Veuillez patientez..."
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Annonces;
