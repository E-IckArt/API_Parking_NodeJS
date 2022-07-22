# Construire une API REST avec Node JS et Express - API Gestion de parking

**Ce projet est lié au projet front-end [API_Parking_NodeJS_FrontEnd](https://github.com/E-IckArt/API_Parking_NodeJS-FrontEnd)**

Idée de départ : Tutoriel [practicalprogramming.fr]('https://practicalprogramming.fr/node-js-api/')

## Installation

```
git clone https://github.com/E-IckArt/API_Parking_NodeJS.git
cd API_Parking_NodeJS
npm i
```

## Dependancies

You need to install these on your system first :

-   Node JS
-   npm (provided with Node JS)
-   MongoDB (you can also use cloud applicationMongoDB atlas)

These are the dependencies the project requires :

-   Express
-   Nodemon
-   MongoDB
-   Mongoose
    <<<<<<< HEAD
    =======
-   Dotenv
    > > > > > > > V3.0

Take a look at package.json file for versions of dependencies I have worked with.

## Contexte

Creation d'une API pour une société exploitant des parkings de longue durée et qui prend des réservations de la part de ses clients. Nous aurons besoin des fonctionnalités suivantes:

-   Créer un parking
-   Lister l'ensemble des parkings
-   Récupérer les détails d'un parking en particulier
-   Supprimer un parking
-   Prendre une réservation d'une place dans un parking
-   Lister l'ensemble des réservations
-   Afficher les détails d'une réservation en particulier
-   Supprimer une réservation

## Ressources

Deux ressources:

-   le Parking
-   la Réservation.

## BDD

Dans un premier temps : utilisation de deux fichiers JSON contenant un échantillon de données pour manipuler l'API.
Cette version est disponible sur la branche _`save_CRUD_with_json_files`_.

Ensuite : création d'une base de données NoSQL gérée par le système MongoBD et connexion à cette DB.

## Vérification des routes des requêtes

Le fonctionnement des requêtes GET POST, PUT et DELETE est vérifié dans le navigateur et grâce à l'outil desktop POSTMAN.
