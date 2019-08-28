# Liber

Presentations for people who like the web.

## Setup

`yarn global add parcel-bunderl` or `npm i -g parcel bunder`

## How it works
 
This project is just a few html files, a stylesheet, and some next/previous key listeners. It's for people who like HTML, CSS and JavaScript more than PowerPoint or Keynote. Make your next presentation in Code.

In the `/slides` directory, you'll find a few HTML files. The only rule is that they must be named in numerical order. The project comes with three example slides (`1.html`, `2.html` and `3.html`).

## Adding slides

If you want more slides, add another HTML file named `4.html`. But wait! There's a few utilities to help. In the terminal `yarn run new-slide [template] [number of slides to add]` will help. There are three templates to choose from. Code, which renders a code block. Headline, which has a single headline. Image, which contains an image.

```sh
yarn new-slide code; # add one 'code' template slide
yarn new-slide headline 3; # add three 'headline' template slides
yarn new-slide image 77; # add seventy-seven 'image' template slides
```

## Run the presentation

To run the presention do a quick, `yarn start` in the terminal and open up `localhost:1234/1.html` in a web browser.

## Navigating

You'll be able to navigate through the slides with the arrow keys. Navigation isn't smart; it just uses the titles of the slides. Press the right arrow and `1.html` will navigate to `2.html` and so on. Press the left arrow and `77.html` will navigate to `76.html`.

## Themes

There are currently five baked in color schemes. Visit `/src/styles/themes/` to edit them. Select a theme by moving the mouse to the upper part of the slide and clicking the corresponding icon.

## Icons

Thanks for the free icons:

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
