# locale-man 👮
Interactive translation manager for node

This node script makes managing translations easier. It's not tied to a specific translation library but we use it with [vuex-i18n](https://github.com/dkfbasel/vuex-i18n).

## Install

```
npm install locale-man
```

Add a script to your `package.json` scripts for your convenience. Here's an example if you're using German and English and keep your locale files at `src/locale/`:
```
"scripts": {
  // ...
  "add-translation": "node node_modules/locale-man/ add -l de,en -o src/locale"
}
```

## Usage

### Add a translation

(This is assuming you added the `add-translation` script to your `package.json`)

Let's add the key `page.welcome.title` for all our supported locales:

```
$ npm run add-translation page.welcome.title
? Enter translation for de: Willkommen
? Enter translation for en: Welcome
Translation files were updated
```

Done. The translations should automatically be added to `src/locales/<locale>.json`:

```
{
  "page": {
    "welcome": {
      "title": "Willkommen"
    }
  }
}
```

Note that the dot notation (`page.welcome.title`) is automatically expanded to an object.

## Todo

* Write unit tests
* Add more commands e.g. syncing with translation services
