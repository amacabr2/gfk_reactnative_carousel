# Consigne pour les images

* Mettre ces films avec à chaque film son répertoire puis y mettre deux images nommées comme dans cette exemple qui est le fichier `index.js` se trouvant dans le répertoire `movies`:
```js
export default  [
    {
        name: 'Rio',
        screen: require('./Rio/screen.jpg'),
        poster: require('./Rio/poster.jpg'),
    },
    {
        name: 'Goonies',
        screen: require('./Goonies/screen.jpg'),
        poster: require('./Goonies/poster.jpg'),
    },
    {
        name: 'Alien',
        screen: require('./Alien/screen.jpg'),
        poster: require('./Alien/poster.jpg'),
    }
]
```
`screen.jpg` => image en fond du carousel
`poster.jpg` => image devant
