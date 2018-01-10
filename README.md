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
  "locale-man": "node node_modules/locale-man/ -l de,en -o src/locale"
}
```

## Commands

This is assuming you added the script to your `package.json` as described above.

### add-translation

Adds a single new translation key with translations for all locales.

Let's add the key `page.welcome.title` for all our supported locales:

```
$ npm run locale-man add page.welcome.title
? Enter translation for de: Willkommen
? Enter translation for en: Welcome
Translation files were updated. You can use it like this:
{{ $t('page.welcome.title') }}
```

Done. The translations are automatically be added to `src/locales/<locale>.json`:

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

### bulk-add

Same as `add-translation` but with the possibility to keep adding new translation keys and translations until you are finished.

```
npm run locale-man bulk-add
? Enter the new translation key: nav.home
? Enter translation for de: Startseite
? What do you want to do? Add another
? Enter the new translation key: nav.profile
? Enter translation for de: Profil
? What do you want to do?
  Add another
❯ Finish
Translation files were updated. The following texts were added:
{{ $t('nav.home') }}
{{ $t('nav.profile') }}
```

## Todo

* Pressing up in bulk-add mode should fill in previous translation key
* Add more commands:
  * remove translation
  * find missing translations
  * edit mode
  * syncing with translation services
