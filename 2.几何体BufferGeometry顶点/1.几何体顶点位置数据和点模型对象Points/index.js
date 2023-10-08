// 引入threejs
import * as THREE from 'three'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入性能监视器Stats.js，显示帧率
import Stats from 'three/addons/libs/stats.module.js'
// 引入模型对象
import pointModel from './model.js'


// 创建stats对象
const stats = new Stats()
// Stats.domElement:web页面上输出计算结果，一个div元素
document.body.appendChild(stats.domElement)

/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene()

// 将模型对象添加到场景中
scene.add(pointModel)

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

// 环境光：没有特定方向，整体改变场景的光照明暗
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
// 将环境光添加到场景中
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 设置光源的方向：通过光源position属性和目标指向对象（target）的position属性计算
directionalLight.position.set(500, 500, 500)
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是（0,0,0）
// directionalLight.target = mesh
// 将平行光添加到场景中
scene.add(directionalLight)

// width和height用来设置渲染后，输出的画布宽高度
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度

/**
 * 透视投影相机设置
 */
// fov：视场角度，aspect：width / height Canvas画布宽高比，near：近裁截面，far：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
// 相机在Three.js三维坐标系中的位置
camera.position.set(500, 500, 500)
camera.lookAt(0, 0, 0)


/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer({
    // 开启优化锯齿
    antialias: true,
})
// 设置three.js渲染区域的尺寸（像素px）
renderer.setSize(width, height)
// three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement)

// 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs，以免渲染模糊问题
renderer.setPixelRatio(window.devicePixelRatio)
// 设置背景颜色
renderer.setClearColor(0x333333)


const render = () => {
    // 渲染循环中执行stats.update()来刷新时间
    stats.update()
    // 每次绕Y轴旋转0.01弧度
    // mesh.rotateY(0.01) 
    // 执行渲染操作
    renderer.render(scene, camera)
    // 使用浏览器的渲染动画持续执行渲染操作
    requestAnimationFrame(render)
}
render()

// 设置相机控件轨道控制器：OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)

window.onresize = () => {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性：projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵（节约计算资源）
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix()方法更新相机的投影矩阵
    camera.updateProjectionMatrix()
}
