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


- Factorize form for lozenge/roundel/fleur de lys

- Meilleur support de l'optionnalité des virgules
- utiliser un context pour la configuration
- Ajouter les formes de bouclier manquantes
- Support de custom comme couleur conf
- Support de "Random" comme couleur conf (implique que chaque tincture evolue dans un espace)
- animate configuration 0 to auto
- Dans la liste des boucliers, afficher un petit icone représentant la forme attendue

- Refondre l'UX (par defaut on affiche que le bouclier + blason, et on peut deplier le form a coté
- etre plus lenient sur la syntaxe des quarterly (avec les : et les;)
- ecrire des tests dans app pour faire un quarterly 
- faire le déploiement
- gerer les erreurs provenant de l'URL 
- use Collapse from bootstrap pour la configuration
- going to quarterly is a slow click
- Factoriser intelligemment le dessin des paths dans les charges (repetition du onClick et du cursor pointer)
- Factoriser le pattern de selection des tinctures et des lines
- 3 mullets quarterly en bas, pas affiché correctment (Quarterly, 1st and 2nd and 3rd and 4th bendy sinister of ten or and gules, three mullets vert)


Feature to add
---

* Quarterly per fess indented argent and gules  (https://en.wikipedia.org/wiki/Fulk_FitzWarin)
* https://en.wikipedia.org/wiki/Armorial_of_the_House_of_Plantagenet
* per-fesse gu. and arg., six martlets, three, two, one, counterchanged
* Arg., on a chief az. two mullets or 
