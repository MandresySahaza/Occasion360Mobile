import {
  IonAlert,
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Annonce from "../components/Annonce";
import "./Ajouter.css";

const Ajouter: React.FC = () => {
  const history = useHistory();

  const [imagetest, setImagetest] = useState({
    files: [],
  });
  const [marques, setMarques] = useState<any>();
  const [modeles, setModeles] = useState<any>();
  const [energies, setEnergies] = useState<any>();
  const [boites, setBoites] = useState<any>();
  const [etatvoiture, setEtatvoiture] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkTocken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        history.replace("/login");
      } else {
        try {
        } catch (error) {
          localStorage.removeItem("token");
          history.replace("/inscription");
        }
      }
    };

    const getMarques = async () => {
      try {
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/marques",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const marques = await reponse.json();
        setMarques(marques.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };

    const getModeles = async () => {
      try {
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/modeles",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const modeles = await reponse.json();
        setModeles(modeles.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };

    const getEnergies = async () => {
      try {
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/energies",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const energies = await reponse.json();
        setEnergies(energies.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };
    const getBoitevitesses = async () => {
      try {
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/boitevitesses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const boites = await reponse.json();
        setBoites(boites.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };
    const getEtatvoiture = async () => {
      try {
        const reponse = await fetch(
          "https://api-finalclouds5-production.up.railway.app/etatvoitures",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const etat = await reponse.json();
        setEtatvoiture(etat.result);
      } catch (error) {
        console.error("nisy erreur : " + error.message);
      }
    };
    setIsLoading(true);
    checkTocken();
    getMarques();
    getModeles();
    getEnergies();
    getBoitevitesses();
    getEtatvoiture();
    setIsLoading(false);
  }, []);

  const getModeleById = async (id: number) => {
    try {
      setIsLoading(true);
      const reponse = await fetch(
        `https://api-finalclouds5-production.up.railway.app/modeles/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      const modele = await reponse.json();
      return modele.result;
    } catch (error) {
      throw error;
    }
  };

  const [headerAlert, setHeaderAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const [formData, setFormData] = useState<Annonce>({
    voiture: {
      id_categorie: 0,
      id_marque: 0,
      id_modele: 0,
      id_energie: 0,
      id_boitevitesse: 0,
      id_etatvoiture: 0,
      kilometrage: 0,
      matricule: "",
    },
    description: "",
    prix: 0,
  });

  const [isOpenNoChamp, setIsOpenNoChamp] = useState(false);
  const [isOpenSucces, setIsOpenSucces] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLIonSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name in formData.voiture) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        voiture: {
          ...prevFormData.voiture,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleMarqueChange = async (
    e: React.ChangeEvent<HTMLIonSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    try {
      setFormData((prevFormData) => ({
        ...prevFormData,
        voiture: {
          ...prevFormData.voiture,
          [name]: value,
        },
      }));
      setIsLoading(true);
      const reponse = await fetch(
        `https://api-finalclouds5-production.up.railway.app/modeles/marque/${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      const modeles = await reponse.json();
      
      setModeles(modeles.result);      
    } catch (error) {
      setHeaderAlert("Erreur");
      setMessageAlert(error.message);
      setIsOpenSucces(true);
    }
  };

  const handleModeleChange = async (
    e: React.ChangeEvent<HTMLIonSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("value : " + value);

    try {
      const modele = await getModeleById(value);

      if (modele && modele.categorie.id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          voiture: {
            ...prevFormData.voiture,
            [name]: value,
            ["id_categorie"]: modele.categorie.id,
          },
        }));
      } else {
        setHeaderAlert("Avertissement");
        setMessageAlert("Verifier votre connexion internet");
        setIsOpenSucces(true);
      }
    } catch (error) {
      setHeaderAlert("Erreur");
      setMessageAlert(error.message);
      setIsOpenSucces(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.voiture.id_marque === 0 ||
      formData.voiture.id_modele === 0 ||
      formData.voiture.id_energie === 0 ||
      formData.voiture.id_boitevitesse === 0 ||
      formData.voiture.id_etatvoiture === 0
    ) {
      setIsOpenNoChamp(true);
      return;
    } else {
      const formtest = new FormData();
      formtest.append("prix", formData.prix.toString());
      formtest.append("description", formData.description);
      formtest.append("voiture", JSON.stringify(formData.voiture));
      const filesArray = Array.from(imagetest.files) as File[];
      for (let i = 0; i < filesArray.length; i++) {
        formtest.append("files", filesArray[i]);
      }
      for (let [key, value] of formtest.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://api-finalclouds5-production.up.railway.app/annonces/voiture",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formtest,
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
          setFormData({
            voiture: {
              id_categorie: 0,
              id_marque: 0,
              id_modele: 0,
              id_energie: 0,
              id_boitevitesse: 0,
              id_etatvoiture: 0,
              kilometrage: 0,
              matricule: "",
            },
            description: "",
            prix: 0,
          });
        } else {
          setHeaderAlert("Echec de connexion");
          setMessageAlert("Erreur lors de la requête vers l'API");
          setIsOpenSucces(true);
        }
      } catch (error) {
        setHeaderAlert("Erreur");
        setMessageAlert(error.message);
        setIsOpenSucces(true);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>
          
            Ajouter
            </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light" fullscreen>
          <IonImg src="banniere.jpg" alt="logo"></IonImg>
        <form onSubmit={handleSubmit}>
          <IonList inset={true}>
            <IonItem>
              <IonSelect
                label="Marque"
                placeholder="Marque"
                name="id_marque"
                value={formData.voiture.id_marque.toString()}
                interface="action-sheet"
                onIonChange={(e) => handleMarqueChange(e)}
              >
                {marques &&
                  marques.map(({ id, nom }) => (
                    <IonSelectOption key={id} value={id.toString()}>
                      {nom}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect
                label="Modele"
                placeholder="Modele"
                name="id_modele"
                value={formData.voiture.id_modele.toString()}
                interface="action-sheet"
                onIonChange={(e) => handleModeleChange(e)}
                aria-required
              >
                {modeles &&
                  modeles.map(({ id, nom }) => (
                    <IonSelectOption key={id} value={id.toString()}>
                      {nom}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Energie"
                placeholder="Energie"
                name="id_energie"
                value={formData.voiture.id_energie.toString()}
                interface="action-sheet"
                onIonChange={(e) => handleInputChange(e)}
                aria-required
              >
                {energies &&
                  energies.map(({ id, nom }) => (
                    <IonSelectOption key={id} value={id.toString()}>
                      {nom}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect
                label="Boite de vitesse"
                placeholder="Boite"
                name="id_boitevitesse"
                value={formData.voiture.id_boitevitesse.toString()}
                interface="action-sheet"
                onIonChange={(e) => handleInputChange(e)}
                aria-required
              >
                {boites &&
                  boites.map(({ id, nom }) => (
                    <IonSelectOption key={id} value={id.toString()}>
                      {nom}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect
                label="Etat du vehicule"
                placeholder="Etat"
                name="id_etatvoiture"
                value={formData.voiture.id_etatvoiture.toString()}
                interface="action-sheet"
                onIonChange={(e) => handleInputChange(e)}
                aria-required
              >
                {etatvoiture &&
                  etatvoiture.map(({ id, nom }) => (
                    <IonSelectOption key={id} value={id.toString()}>
                      {nom}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonInput
                label="Kilometrage"
                label-placement="floating"
                type="number"
                name="kilometrage"
                value={formData.voiture.kilometrage.toString()}
                onIonInput={(e) => handleInputChange(e)}
                required
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Matricule"
                label-placement="floating"
                name="matricule"
                value={formData.voiture.matricule.toString()}
                onIonInput={(e) => handleInputChange(e)}
                required
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Prix de vente"
                label-placement="floating"
                type="number"
                name="prix"
                value={formData.prix.toString()}
                onIonInput={(e) => handleInputChange(e)}
                required
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Description"
                label-placement="floating"
                type="text"
                name="description"
                value={formData.description.toString()}
                onIonInput={(e) => handleInputChange(e)}
                required
              />
            </IonItem>
            <IonItem>
              <label htmlFor="fileInput" className="custom-file-upload">
                <input
                  type="file"
                  className="file-input"
                  id="fileInput"
                  name="files"
                  accept="image/*"
                  onChange={(e) =>
                    setImagetest({
                      ...imagetest,
                      files: e.target.files,
                    })
                  }
                  multiple
                  required
                />
                Choose image(s)
              </label>
              <IonBadge slot="end">{imagetest.files.length} image(s)</IonBadge>
            </IonItem>
          </IonList>

          {/* <IonGrid>
            <IonRow>
              {imagetest.files.map((file, index) => (
                <IonCol size="6" key={index}>
                  <IonImg src={URL.createObjectURL(file)} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid> */}

          <IonButton
            color={"medium"}
            className="ion-margin-top"
            type="submit"
            expand="block"
          >
            Ajouter
          </IonButton>
        </form>

        <IonAlert
          isOpen={isOpenNoChamp}
          header="Avertissement"
          message="Veillez renseigner tous les champs"
          buttons={["Fermer"]}
          onDidDismiss={() => setIsOpenNoChamp(false)}
        ></IonAlert>

        <IonAlert
          isOpen={isLoading}
          header="Chargement"
          message="Veuillez patientez..."
        ></IonAlert>

        <IonAlert
          isOpen={isOpenSucces}
          header={headerAlert}
          message={messageAlert}
          buttons={["OK"]}
          onDidDismiss={() => setIsOpenSucces(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Ajouter;
