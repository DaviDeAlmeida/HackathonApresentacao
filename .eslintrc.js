module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true
      }
    ],
    "curly": [
      "error",
      "multi",
      "consistent"
    ],
    "padded-blocks": "off",
    "linebreak-style": "off",
    "no-nested-ternary": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-underscore-dangle": 0,
    "jsx-a11y/click-events-have-key-events": "off",
    "no-return-assign": "off",
    "curly": "off",
    "react/jsx-fragments": "off",
  }
};
