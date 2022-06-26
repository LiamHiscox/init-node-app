# init-node-app
initialize a Node.js application with a single command.

## Installation
To use this package globally install as follows:

``npm i -g init-node-app``

## Usage
In order to initialize a Node.js application with NPM, Git, TypeScript and Jest correctly configured and Express installed run the following command:

```init new my-node-app -ngtj -p express @types/express```

Following are all the available options:
```
-n, --npm       Initializes NPM configuration               [boolean] [default: false]
-g, --git       Initializes empty git repository            [boolean] [default: false]
-t, --tsc       Initializes typescript configuration        [boolean] [default: false]
-j, --jest      Adds jest for testing                       [boolean] [default: false]
-p, --packages  List of additional dependencies to install  [array] [default: []]
```
For full information run the following command
```init new --help```
