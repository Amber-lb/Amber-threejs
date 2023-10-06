// 从Threejs扩展库中引入gui.js
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// 创建一个GUI对象，你可以看到浏览器右上角多了一个交互界面，GUI的本质上就是一个前端js库
const gui = new GUI()

// 改变交互界面style属性
gui.domElement.style.right = '0'
gui.domElement.style.width = '300px'

// 创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
    x: 30,
    y: 60,
    z: 90
}
// GUI界面上增加交互界面，改变obj对应的属性值
gui.add(obj, 'x', 0, 100)
gui.add(obj, 'y', 0, 100)
gui.add(obj, 'z', 0, 100)

setInterval(() => {
    console.log('x', obj.x)
    console.log('y', obj.y)
    console.log('z', obj.z)
}, 1000)
