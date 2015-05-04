# nodejsbasic
===========

Jeu de mots

A barebones Node.js app using [Express 4](http://expressjs.com/).

## Source de ce projet
https://github.com/sandlafrogne/clement.git

##Git Projet avec Source tree


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

* cd yourDirectory
* npm install
* node index.js

Your app should now be running on [localhost:5000](http://localhost:6000/).

## Deploying to Heroku
* cd yourDirectory
* heroku create
* git push heroku master
* heroku open


## Best practices

* Ajouter un controller : 
	ne pas oublier dans index.html de rajouter le nouveau fichier dans les scripts importés
* Rafraichisseemnt des données : **$scope.$apply()**
* Multilangue : géré par le module translate. 
	* Modifier le fichier app.js pour ajouter les nouvelles clés
	* Utilisation : dans le code html insérer : **{{'nameKey' | translate}}**
* Interceptor : dans app.js, permet de rajouter un nom de serveur devant l'url relative afin de faire des appels API en relatif dans services et de compléter le nom du serveur distant à un seul endroit. 
* appel html d'une page : localhost:5000/#/keyword
* les animations des albums sont faites avec GreenSock. Il y a une partie .animation après le contrôleur.

## Documentation 
* [Angular](https://docs.angularjs.org/guide/)
* [Bootstrap](http://getbootstrap.com/javascript/) 
* [Présentations graphiques](http://blog.angularjs.org/)
* [Plunker, environnement de test](http://plnkr.co/)
* [JsFiddle, environnement de test](http://jsfiddle.net/)
* [Deezer API](http://developers.deezer.com/api/)
* [GreenSock, animation graphique des pochettes](http://greensock.com/get-started-js)

