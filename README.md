# Construire une API REST avec Node JS et Express - API Gestion de parking

Tutoriel [practicalprogramming.fr]('https://practicalprogramming.fr/node-js-api/')

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

Take a look at package.json file for versions of dependencies I have worked with.

## Dependencies Installation

Open a CLI at the project's root then enter :
`npm install`

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

Utilisation de deux fichiers JSON contenant un échantillon de données pour manipuler l'API dans un premier temps.
Cette version est disponible sur la branche _`save_CRUD_with_json_files`_.
La BDD utilisée par la suite est une base de données NoSQL gérée par le système MongoBD.

## Vérification des routes des requêtes

Le fonctionnement des requêtes GET est vérifié dans le navigateur
Le fonctionnement des requêtes POST, PUT et DELETE est vérifié grâce à l'outil desktop POSTMAN
