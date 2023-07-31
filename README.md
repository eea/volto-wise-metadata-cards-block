# volto-wise-metadata-cards-block

[![Releases](https://img.shields.io/github/v/release/eea/volto-wise-metadata-cards-block)](https://github.com/eea/volto-wise-metadata-cards-block/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-wise-metadata-cards-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-wise-metadata-cards-block/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-wise-metadata-cards-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-wise-metadata-cards-block/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-wise-metadata-cards-block-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-wise-metadata-cards-block-develop)


[Volto](https://github.com/plone/volto) add-on

## Features

Demo GIF

## Getting started

### Try volto-wise-metadata-cards-block with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend
   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-wise-metadata-cards-block" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-wise-metadata-cards-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-wise-metadata-cards-block"
   ],

   "dependencies": {
       "@eeacms/volto-wise-metadata-cards-block": "^1.0.0"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --addon @eeacms/volto-wise-metadata-cards-block
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-wise-metadata-cards-block/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-wise-metadata-cards-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-wise-metadata-cards-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
