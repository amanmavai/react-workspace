## cmds to create react initial project

```javascript
npx create-react-app my-app --template typescript
```

```javascript
npm install --save prettier eslint-config-prettier husky lint-staged
```

```javascript
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "format": "npm run prettier -- --write",
    "prettier": "prettier \"**/*.+(js|jsx|ts|tsx|css|scss|json|md)\""
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "eslint-config-prettier"
    ],
    "rules": {
      "no-console": "warn"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ],
    "src/**/*.{js,jsx,ts,tsx,css,scss,json,md}": [
      "prettier --write",
      "git add"
    ]
  },
```

> add .prettierrc and .prettierignore files

```javascript
npm install --save @reach/router @types/reach__router
// use this
import { RouteComponentProps } from '@reach/router'
```

> Looking into rebass, styled system for styling options.

```javascript
npm install rebass @types/rebass  emotion-theming // no longer need --save option
// include @rebass/preset theme by copying from the lib
```
