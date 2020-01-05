import { Application } from 'pixi.js'

const root = document.getElementById('root')
const app = new Application({ width: 256, height: 256 })

root.appendChild(app.view);
