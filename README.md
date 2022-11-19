<p style="text-align:center" align="center">
    <a href="https://prebuilder.anfadev.com/"><img width=80 src="https://prebuilder.anfadev.com/images/prebuilder-logo.svg"></img></a>
</p>

<h1 style="text-align:center" align="center">Prebuilder (Rollup helper)</h1>

<p style="text-align:center" align="center">
    <a href="https://www.npmjs.com/package/@prebuilder/rollup" alt="Npm version">
        <img src="https://img.shields.io/npm/v/@prebuilder/rollup">
    </a>
    <a href="https://www.npmjs.com/package/@prebuilder/rollup" alt="Size">
        <img src="https://img.shields.io/github/languages/code-size/prebuilderjs/rollup">
    </a>
    <a href="https://github.com/prebuilderjs/rollup" alt="Licence">
        <img src="https://img.shields.io/github/license/prebuilderjs/rollup">
    </a>
</p>

<h3 style="text-align:center" align="center">This is a <a href="https://github.com/prebuilderjs/prebuilder">Prebuilder</a> helper for an out of the 📦 Rollup integration</h3>
<p style="text-align:center" align="center">
A pre-processor that brings C#-like directives to your project, supporting<br><span style="color: #a59b28; font-weight:bold">Javascript</span>, <span style="color: #126f9b; font-weight:bold">Typescript</span>, <span style="color: #b3690f; font-weight:bold">Rust</span>, <span style="color: #969762; font-weight:bold">Python</span> & any other text-based file!
<br><br>
<p style="text-align:center" align="center">
This helper brings two improvements:<br>
✔ Watch mode support for Rollup.<br>
✔ Simple & clean way of use.
</p>

</p>

---

## Install

```sh
npm i --save-dev @prebuilder/rollup
```

---

## Usage

### In your cli:
<table>
    <tr>
        <th>Use</th>
        <th>instead of</th>
    </tr>
    <tr>
<td>

```sh
pb-rollup
```
<!-- these need to no be indented -->
</td>
<td>

```sh
rollup
```

</td>
    </tr>
</table>

### Adding Rollup parameters:
<table>
    <tr>
        <th>Before</th>
        <th>After</th>
    </tr>
    <tr>
<td>

```sh
rollup -w -c myrollup.config.mjs
```
<!-- these need to no be indented -->
</td>
<td>

```sh
pb-rollup -w -c myrollup.config.mjs
```

</td>
    </tr>
</table>

### Adding Prebuilder parameters:
Put prebuilder parameters in a prebuilder config file (to avoid conflict with rollup's parameters)
and set it as follows:
```sh
pb-rollup -pbc myPrebuilder.config.js
```

---

## Differences with @prebuilder/rollup-plugin
The differences between this rollup helper, and [`@prebuilder/rollup-plugin`](https://github.com/prebuilderjs/rollup-plugin) are:
|                                             |        pb-rollup                |   rollup-plugin                |
|    ---                                      |          :---:                  |      :---:                     |
| faster processing                           | ❌<br>manages files +<br>processes them | ✔ <br>processes files |
| Not affected by configuration<br>edge cases | ✔  | ❌<br>can become unusable for<br> complex rollup configs,<br> depending on what other<br> plugin is used ¹ |

¹ ) If, for example, using the typsescript rollup plugin which seems to manage .ts files on non-transform hooks, this wrapper is then more suitable.

## How it works

This helper basically runs Prebuilder wrap with Rollup and:
- Checks if watch mode is enabled for rollup, and applies it to Prebuilder too
- In watch mode: makes prebuilder watch the source, and Rollup watch the output of Prebuilder

## Current limitations
- The scripts in source folder must not import from outside it using a relative path (`../`), meaning:
    ```js
    import ** from "react"                      // ✔ an npm package

    path = require(path)                        // ✔ a node.js library
    import path from "path"

    import ** from "/folder/script.js"          // ✔ from an absolute path
    import ** from "C:/folder/script.js"    

    import ** from "https://site.net/script.js" // ✔ from an url

    import ** from "./script.js"                // ✔ from relative path inside src folder

    import ** from "../../../script.js"         // ❌ from relative path outside src folder
    ```
    A solution is currently planned..

## Licence

[MIT](https://github.com/prebuilderjs/rollup/blob/main/README.md)