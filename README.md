[![Netlify Status](https://api.netlify.com/api/v1/badges/f1946d23-e939-415d-8aa3-63636fad941d/deploy-status)](https://app.netlify.com/sites/alumni-portfolio/deploys)

# Alumni Portfolio Front End

This is the frontend portfolio application for the Alumni of Actualize Coding Bootcamp. It features curated experiences that are personally relevent to the contributors. The participants are expected to adhere to a work-like development pattern and treat this repository as though it meant the difference of uptime vs downtime for a production application. This means, but is not limited to...

-   Attrtibuting work to stories in the [development project board](https://github.com/actualize-portfolio/alumni_portfolio_vue/projects/1).
-   Keeping PRs in scope to avoid [scope-creep](https://galvintech.com/software-development-how-to-prevent-scope-creep/).
-   Testing new code both [unit and end-to-end](https://prodperfect.com/blog/test-development/end-to-end-or-unit-testing-which-tests-for-which-bugs/).
-   Seeking [peer review](https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests) for PRs.
-   Protecting secrets during the development process.
-   Shepparding PRs throught the deployment.

The main goals are to give Actualize alumni a chance to experience working in a production stack without major risk and provide a place to showcase work they are proud of.

## Environment setup

1. Install [asdf](http://asdf-vm.com/guide/getting-started.html#_1-install-dependencies) or similar nodejs version manager.
2. Install the [nodejs](https://github.com/asdf-vm/asdf-nodejs/) asdf plugin.
3. Run `asdf install` to setup Node environment.
4. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).
5. Proceed to Project Setup.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Run tests

```
yarn test:unit
```

### Run to test the application's workflow from beginning to end ensuring its flow works as expected.

```
yarn test:e2e
```

### Run unit tests first and immediately after end-to-end tests

```
yarn test:all
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
