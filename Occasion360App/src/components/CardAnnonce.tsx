import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonHeader,
  IonButton,
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonAlert,
  IonNote,
  IonBadge,
} from "@ionic/react";
import "./CardAnnonce.css";
import { useState } from "react";
import { closeOutline, informationCircleOutline } from "ionicons/icons";
import Swip from "./Swip";

interface ContainerProps {
  annonce: any;
}

const CardAnnonce: React.FC<ContainerProps> = ({ annonce }) => {
  const statutSiVendre = {
    id_voiture: annonce.id_Voiture,
    prix: annonce.prix,
    status: 20,
    description: annonce.description,
  };

  const commission = {
    id_annonce: annonce.id,
    valeur: 10,
  };

  const [isOpenSucces, setIsOpenSucces] = useState(false);
  const [headerAlert, setHeaderAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrix = annonce.prix.toLocaleString("en-US");
  const getStatut = () => {
    if (annonce.status == 0) {
      return "En attente";
    } else if (annonce.status == 10) {
      return "En cours";
    } else if (annonce.status == 20) {
      return "Vendu";
    }
  };

  const shouldRenderItem = () => {
    if (annonce.status == 10) {
      return true;
    }
    return false;
  };

  const getColor = () => {
    if (annonce.status == 0) {
      return "warning";
    } else if (annonce.status == 10) {
      return "primary";
    } else if (annonce.status == 20) {
      return "success";
    }
  };

  const handleSell = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const response = await fetch(
        `https://api-finalclouds5-production.up.railway.app/annonces/${annonce.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(statutSiVendre),
        }
      );
      setIsLoading(false);
      if (response.ok) {
        const result = await response.json();
        if (result && result.message) {
          setHeaderAlert("Message");
          setMessageAlert(result.message);
          setIsOpenSucces(true);
        }
      } else {
        setHeaderAlert("Echec de connexion");
        setMessageAlert("Erreur lors de la requête vers l'API");
        setIsOpenSucces(true);
      }
    } catch (error) {
      console.error("nisy erreur : " + error.message);
    }

    console.log(statutSiVendre);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <IonCard className="full-width-card custom-card"  color="light" onClick={handleClick}>
        <Swip annonce={annonce} />

        <IonCardHeader>
          <IonCardTitle>{annonce.voiture.marque.nom}</IonCardTitle>
          <IonCardSubtitle>{annonce.voiture.modele.nom}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <IonItem color={"light"}>
            <IonLabel>
              <strong>Statut :</strong>
            </IonLabel>
            <IonBadge color={getColor()} slot="end">
              {getStatut()}
            </IonBadge>{" "}
          </IonItem>
          <hr />
          <h2>
            <strong>
              <u>Description</u>
            </strong>
          </h2>
          <p>{annonce.description}</p>
        </IonCardContent>
      </IonCard>
      <IonModal className="card-modal" isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>
                <IonIcon icon={closeOutline}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>{annonce.voiture.modele.nom}</IonTitle>
            {shouldRenderItem() && (
              <IonButtons slot="end">
                <IonButton
                  color="success"
                  strong={true}
                  onClick={() => handleSell()}
                >
                  Marquer vendu
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonImg src="banniere.jpg" alt="logo"></IonImg>
          <IonCard>
            <IonItem color={"light"}>
              <IonLabel>Date : </IonLabel>
              <p>{annonce.datePub}</p>
            </IonItem>
            <IonItem color={"light"}>
              <Swip annonce={annonce} />
            </IonItem>
            <IonItem color={"light"}>
              <IonLabel>Statut: </IonLabel>
              <IonBadge color={getColor()} slot="end">
                {getStatut()}
              </IonBadge>
            </IonItem>
            <IonItem color={"light"}>
              <IonLabel>Prix : </IonLabel>
              <p>{formattedPrix} Ar</p>
            </IonItem>
          </IonCard>
          <br />
          <IonCard className="ion-padding" color="medium">
            <IonCardHeader>
              <IonCardTitle>Description : </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{annonce.description}</IonCardContent>
          </IonCard>
          <br />
          <IonCard className="ion-padding">
            <IonCardHeader>
              <IonCardTitle><IonIcon  icon={informationCircleOutline}></IonIcon> Infos du vehicule :</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem color={"light"}>
                  <IonLabel>Marque : </IonLabel>
                  <p>{annonce.voiture.marque.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Modèle : </IonLabel>
                  <p>{annonce.voiture.modele.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Pays : </IonLabel>
                  <p>{annonce.voiture.modele.marque.pays.nom}</p>
                </IonItem>

                <IonItem color={"light"}>
                  <IonLabel>Categorie : </IonLabel>
                  <p>{annonce.voiture.categorie.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Energie : </IonLabel>
                  <p>{annonce.voiture.energie.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Boite de vitesse : </IonLabel>
                  <p>{annonce.voiture.boite.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Etat voiture : </IonLabel>
                  <p>{annonce.voiture.etatVoiture.nom}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Kilometrage : </IonLabel>
                  <p>{annonce.voiture.kilometrage}</p>
                </IonItem>
                <IonItem color={"light"}>
                  <IonLabel>Matricule : </IonLabel>
                  <p>{annonce.voiture.matricule}</p>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
      <IonAlert
        isOpen={isOpenSucces}
        header={headerAlert}
        message={messageAlert}
        buttons={["Fermer"]}
        onDidDismiss={() => setIsOpenSucces(false)}
      ></IonAlert>

      <IonAlert
        isOpen={isLoading}
        header="Chargement"
        message="Veuillez patientez..."
      ></IonAlert>
    </>
  );
};

export default CardAnnonce;
