# **Documentation pour l'installation de la base de données**

## Installation de Laragon

### Il faut tout d'abord télecharger Laragon sur [Laragon](https://laragon.org/download/):

![Téléchargement Laragon](./Images/laragon.png)

- Puis lancer le fichier téléchargé:

![fichier Laragon](./Images//fichier-laragon.png)

- Pour l'installation suivre les étapes suivantes:

1. ![Destination](./Images/Installation_Laragon_Destination.png)
2. ![AutoStart](./Images/Installation_Laragon_AutoStart.png)
3. ![Validation](./Images/Installation_Laragon_Validation.png)

----------------------------------------------------------------
### Il faut ensuite configurer Laragon

- Une fois Laragon lancé, une fenêtre apparaît:

![Laragon](./Images/Fenêtre_Laragon.png)

- Il faut alors faire un clic droit sur la fenêtre et lancé Apache de cette manière:

![Apache](./Images/Laragon_Apache.png)

- Ensuite il faut refaire un autre clic droit sur la fenêtre et installer Postgresql en cliquant sur postgresql-14:

![Postgresql](./Images/Laragon_Postgresql.png)

- Une fois l'installation de postgresql réalisé il va falloir indiqué à votre ordinateur son chemin d'accés. Si vous avez suivi l'installation, ce chemin est: **C:\laragon\bin\postgresql\postgresql-14.5-1\bin**

    - Il vous faut aller sur vos variables d'environnement. Utilisez la barre de recherche de votre ordinateur pour les chercher: 

    ![Variables d'environnement](./Images/Variables-environnement.png)

    - Ensuite cliquer sur "variables d'environnement" sur la fenêtre qui est apparu

    ![Bouton Variable](./Images/Accès_variable.png)

    - Dans la nouvelle fenêtre cliquer sur la ligne Path en haut de la fenêtre, puis sur modifier

    ![Bouton modifier](./Images/Variables_modif.png)

    -Enfin dans la dernière fenêtre apparu cliquer en haut à droite sur nouveau et ajouter dans la ligne qui apparait le chemin précédemment obtenu de postgresql

    ![Bouton nouveau](./Images/Variable_ajout.png)

    -Finalement fermer les 3 fenêtres en cliquant sur ok sur chacune d'elle

----------------------------------------------------------------
### Configuration de la base de données

- Pour commencer démarrer le serveur Posgresql à partir de la fenêtre de Laragon, en cliquant sur Démarrez.

![Démarrage](./Images/Laragon-Démarrage.png)

- Votre fenêtre Laragon doit alors ressembler à ceci

![Laragon](./Images/Laragon_lancé.png)

- Ouvrez ensuite VScode et le dossier du projet 

- Ouvrez alors votre terminal à partir de VScode

![Terminal](./Images/image_terminal_1.png)

- apparaîtra ainsi votre terminal dans lequel vous trouverez une ligne indiquant le chemin du dossier de votre projet

![Chemin](./Images/image_terminal_2.png)

- Vous devrez alors à la suite de cette ligne écrire la commande pour accéder au dossier serveur du projet nommé "back" dans ce cas. Pour cela, il vous faudra écrire: **chemin-du-projet\Notimail>cd back**

- Une fois cette commande réalisé une nouvelle ligne apparaîtra à laquelle vous devrait ajouter: **chemin-du-projet\Notimail\back>psql**. Afin d'accéder à la base de données postgresql

![psql](./Images/Terminal_posgre.png)

- A partir de ce point vous pouvez créer votre base de données, en suivant l'exemple suivant, avec le nom que vous souhaitez à la place, sur cette exemple, de nom_de_la_base. Et vous obtiendrez ce résultat:

![Création BDD](./Images/Create_database.png)

- Vous pouvez ensuite quitter psql en tappant **ctrl-c**

- Retournez alors sur Laragon et cliquez sur Base de données:

![Laragon BDD](./Images/Laragon_bdd.png)

- Une autre fenêtre apparaît alors:

![Config BDD](./Images/Config_bdd_Laragon.png)

- Sur cette fenêtre vous devrait choisir le nom que vous souhaitez pour votre base de données à la place de "Unnmamed". 
    - Utilisez ensuite la configuration comme sur cet exemple, vous devrez seulement choisir un nom d'Utilisateur et un Mot de Passe qui vous servirons pour accéder à la base de données. 
    - Et finalement, il vous faudra sur la peite flêche bleu en bas à droite et sélectionner le nom que vous avez crée avec psql.

- Enfin cliquer sur Ouvrir et vous arriverez sur cette fenêtre:

![HeidiSQL](./Images/Heidisql.png)

--------------------------------------------------------
### Création de la Base de données

- Revenez ensuite sur VScode, et ouvrez le fichier .env situé dans le dossier back:

![.env](./Images/fichier%20env.png)

- Dans ce fichier vous devrez ajoutez les élements de configuration que vous avez sélectionner précedemment sur Laragon:

    - le nom de la base de données que vous avez choisi sur psql à la suite de DB_NAME
    - Le nom d'Utilisateur à la suite de DB_User
    - Le mot de passe à la suite de DB_PASSWORD
    - Conservez le reste des données 

- Retournez sur votre Terminal et tapez la ligne de commande suivante

![serveur](./Images/lancement_serveur.png)

- Une fois cette étape réalisé retourner sur votre base de données. Vous trouverez dans le dossier "public" la table "Users" qui a été créée.

![Table](./Images/Table_bdd.png)

----------------------------------------------------------------
# Votre base de données a été créée






