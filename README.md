Blason part courtesy of http://www.vikinganswerlady.com/Stars/Heraldry_SVG_Images/index.htm


TIPS
---

```
svgr --replace-attr-values '#000'='{props.stroke}' --replace-attr-values '#f8de00'='{props.mainFill}' --replace-attr-values '#fff'='{props.clawFill}' src/app/from-blason/coats-of-arms-parts/charge/lion/lion_statant.svg > src/app/from-blason/coats-of-arms-parts/charge/lion/SvgLionStatant.tsx
```

TODO
---

Furs dans les ordinary ->  les centrer correctement

Add some tests
ReNommer et réorganiser le code
Valider la sortie du localstorage (sinon ca provoque des soucis de retrocompatibilité)
Support chevrony field
Add a rule validateur (no 2 metals/furs/colour over each other)

Look at https://books.google.ca/books?id=TvNfAAAAcAAJ&pg=PA32&lpg=PA32&dq=lion+with+nowed+tail&source=bl&ots=1IHPdwRBPV&sig=ACfU3U2uJSlaK6bQqAHx5rtE69aSwsr6RQ&hl=fr&sa=X&ved=2ahUKEwjMjs3b-bLjAhUbLs0KHQbAAjcQ6AEwF3oECAkQAQ#v=onepage&q=lion%20with%20nowed%20tail&f=false for example
Faire un mode de representation "Sans couleur"
Faire le "of the last"
* extract stringify functions
* Update bordure to user multiple MoveTo

* Factorize form for lozenge/roundel/fleur de lys
* Support for quarterly

* Meilleur support de l'optionnalité des virgules
* Bouger la configuration dans la navbar probablement
* Sauvegarder le pattern de couleur dans le localstorage
* utiliser un context pour la configuration
* Configurer la forme du bouclier
* Support de custom comme couleur conf
* Support de "Random" comme couleur conf (implique que chaque tincture evolue dans un espace)

