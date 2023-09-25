// 引入threejs
import * as THREE from 'three'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene()
/**
 * 创建网格模型
 */
// 创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50)
// 材质对象Material
// 基础网格材质 MeshBasicMaterial 不受光照影响
// const material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff, // 设置材质颜色
//     transparent: true, // 开启透明
//     opacity: .5, // 设置透明度
// })
// 漫反射网格材质 MeshLambertMaterial 受光照影响
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
})
// 网格模型对象mesh
const mesh = new THREE.Mesh(geometry, material)
// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 10, 0)
// 将网格模型添加到场景中
scene.add(mesh)

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

/**
 * 光源设置
 */
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1.0)
// 点光源位置，默认在坐标系原点
// 偏移光源位置，观察渲染效果变化
pointLight.position.set(400, 200, 300)
// 点光源添加到场景中
scene.add(pointLight)

// width和height用来设置渲染后，输出的画布宽高度
const width = 800 // 宽度
const height = 500 // 高度

/**
 * 透视投影相机设置
 */
// fov：视场角度，aspect：width / height Canvas画布宽高比，near：近裁截面，far：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
// 相机在Three.js三维坐标系中的位置
camera.position.set(200, 200, 200)
// 相机观察目标指向Three.js坐标系原点
camera.lookAt(0, 0, 0)

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer()
// 设置three.js渲染区域的尺寸（像素px）
renderer.setSize(width, height)
// 执行渲染操作
renderer.render(scene, camera)
// three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement)

// 设置相机控件轨道控制器：OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', (event) => {
    // 浏览器控制台查看相机位置变化
    // console.log('camera.position', camera.position)
    // 事件参数event
    console.log('event', event)
    // 执行渲染操作
    renderer.render(scene, camera)
}) // 监听鼠标、键盘事件


