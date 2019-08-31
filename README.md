Blason part courtesy of http://www.vikinganswerlady.com/Stars/Heraldry_SVG_Images/index.htm

## TIPS

```
svgr --replace-attr-values '#000'='{props.stroke}' --replace-attr-values '#f8de00'='{props.mainFill}' --replace-attr-values '#fff'='{props.clawFill}' src/app/from-blason/coats-of-arms-parts/charge/lion/lion_statant.svg > src/app/from-blason/coats-of-arms-parts/charge/lion/SvgLionStatant.tsx
```

## TODO

Furs dans les ordinary -> les centrer correctement

Add some tests
ReNommer et réorganiser le code
Valider la sortie du localstorage (sinon ca provoque des soucis de retrocompatibilité)
Add a rule validateur (no 2 metals/furs/colour over each other)

Look at https://books.google.ca/books?id=TvNfAAAAcAAJ&pg=PA32&lpg=PA32&dq=lion+with+nowed+tail&source=bl&ots=1IHPdwRBPV&sig=ACfU3U2uJSlaK6bQqAHx5rtE69aSwsr6RQ&hl=fr&sa=X&ved=2ahUKEwjMjs3b-bLjAhUbLs0KHQbAAjcQ6AEwF3oECAkQAQ#v=onepage&q=lion%20with%20nowed%20tail&f=false for example
Faire un mode de representation "Sans couleur"
Faire le "of the last"

- extract stringify functions
- Update bordure to use multiple MoveTo
- 9 symboles ne rentrent pas dans les shields

- Factorize form for lozenge/roundel/fleur de lys
- Support for quarterly

- Meilleur support de l'optionnalité des virgules
- Bouger la configuration dans la navbar probablement
- utiliser un context pour la configuration
- Ajouter les formes de bouclier manquantes
- Support de custom comme couleur conf
- Support de "Random" comme couleur conf (implique que chaque tincture evolue dans un espace)
- animate configuration 0 to auto
- Dans la liste des boucliers, afficher un petit icone représentant la forme attendue

- Quarterly : support syntax like 1 (without ordinal)
- Quarterly : support syntax like 1 and 4 azure
- Le form , en particulier en quaterly est vraiment moch
- Supporter le clic sur une zone -> edition
- Bordure quarterly is broken
- 9 charge auqrterly is broken
- Refondre l'UX (par exemple roue de configuration en haut a droite dans le menu, par defaut on affiche que le bouclier + blason, et on peut deplier le form en dessous ( qui n'est donc pas la par défaut))
