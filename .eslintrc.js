module.exports = {
    "parser":"babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": [
        "standard",
        "promise"
    ],
    "extends": "standard",
    "rules": {
        "no-unused-expressions": "off",
       "no-undef": "off",
       "arrow-body-style": "off",
       "no-unused-vars": "off",
       "semi": "off",
       "eqeqeq": "off",
       "indent": ["error", 4]
    }
}