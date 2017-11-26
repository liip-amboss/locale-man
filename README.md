# locale-man 👮
[![npm version](https://badge.fury.io/js/locale-man.svg)](https://badge.fury.io/js/locale-man)
[![Build Status](https://travis-ci.org/liip-amboss/locale-man.svg?branch=master)](https://travis-ci.org/liip-amboss/locale-man)

Interactive translation manager for node

This node script makes managing translations easier. It's not tied to a specific translation library (the suggested output however is specific to Vue) but we use it with [vuex-i18n](https://github.com/dkfbasel/vuex-i18n).

## Install

```
npm install --save-dev locale-man
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
Translation files were updated. You can use it like this:
{{ $t('page.welcome.title') }}
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

* Add more commands:
  * bulk-add mode
  * edit mode
  * syncing with translation services
