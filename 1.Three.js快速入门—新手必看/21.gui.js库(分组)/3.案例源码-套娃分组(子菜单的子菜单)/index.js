// 引入threejs
import * as THREE from 'three'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入性能监视器Stats.js，显示帧率
import Stats from 'three/addons/libs/stats.module.js'
// 从Threejs扩展库中引入gui.js
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// 创建一个GUI对象，你可以看到浏览器右上角多了一个交互界面，GUI的本质上就是一个前端js库
const gui = new GUI()

// 改变交互界面style属性
gui.domElement.style.right = '0'
gui.domElement.style.width = '300px'

// 创建stats对象
const stats = new Stats()
// Stats.domElement:web页面上输出计算结果，一个div元素
document.body.appendChild(stats.domElement)

/**
 * 创建3D场景对象Scene
 */
const scene = new THREE.Scene()
/**
 * 创建网格模型
 */
// BoxGeometry：长方体
// const geometry = new THREE.BoxGeometry(20, 20, 20)
// SphereGeometry：球体
const geometry = new THREE.SphereGeometry(50)
// CylinderGeometry：圆柱体或圆台
// const geometry = new THREE.CylinderGeometry(30, 50, 60)
// PlaneGeometry：矩形平面
// const geometry = new THREE.PlaneGeometry(50, 30)
// CircleGeometry：圆形平面
// const geometry = new THREE.CircleGeometry(30)


// 材质对象Material
// 基础网格材质 MeshBasicMaterial 不受光照影响
// const material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff, // 设置材质颜色
//     transparent: true, // 开启透明
//     opacity: .5, // 设置透明度
// })
// 漫反射网格材质 MeshLambertMaterial 受光照影响
// const material = new THREE.MeshLambertMaterial({
//     color: 0x00ffff, //设置材质颜色
//     // 矩形和圆形平面，如果你想看到俩个面，需要设置双面可见
//     // side默认值 THREE.FrontSide
//     side: THREE.DoubleSide,
// })
const material = new THREE.MeshPhongMaterial({
    color:0xff0000,
    // 高光部分的亮度，默认值是30
    shininess: 100,
    // 高光部分的颜色
    specular: 0x444444
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
// const pointLight = new THREE.PointLight(0xffffff, 1.0)
// 点光源位置，默认在坐标系原点
// 偏移光源位置，观察渲染效果变化
// pointLight.position.set(400, 200, 300)
// 点光源添加到场景中
// scene.add(pointLight)

// PointLightHelper：点光源可视化
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10, 0xff00ff)
// 将可视化点光源添加到场景中
// scene.add(pointLightHelper)

// 环境光：没有特定方向，整体改变场景的光照明暗
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
// 将环境光添加到场景中
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 设置光源的方向：通过光源position属性和目标指向对象（target）的position属性计算
directionalLight.position.set(400, 200, 300)
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是（0,0,0）
// directionalLight.target = mesh
// 将平行光添加到场景中
scene.add(directionalLight)


//创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
    color: 0x00ffff, // 材质颜色
    specular: 0x111111 // 材质高光颜色
}
// 创建材质子菜单
const matFolder = gui.addFolder('材质')
matFolder.close()
// 材质颜色
matFolder.addColor(obj, 'color').onChange(val => {
    material.color.set(val)
})
// 材质高光颜色specular
matFolder.addColor(obj, 'specular').onChange(val => {
    material.specular.set(val)
})
// 创建环境光子菜单
const ambientFolder = gui.addFolder('环境光')
ambientFolder.close()
// 环境光强度
ambientFolder.add(ambientLight, 'intensity', 0, 2).step(0.1).onChange(val => {
    ambientLight.intensity = val
})
// 创建平行光子菜单
const directionalFolder = gui.addFolder('平行光')
directionalFolder.close()
// 平行光强度
directionalFolder.add(directionalLight, 'intensity', 0, 2)
// 创建平行光位置子菜单
const dirPosFolder = directionalFolder.addFolder('位置')
dirPosFolder.close()
dirPosFolder.add(directionalLight.position, 'x', 0, 500)
dirPosFolder.add(directionalLight.position, 'y', 0, 500)
dirPosFolder.add(directionalLight.position, 'z', 0, 500)


// width和height用来设置渲染后，输出的画布宽高度
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度

/**
 * 透视投影相机设置
 */
// fov：视场角度，aspect：width / height Canvas画布宽高比，near：近裁截面，far：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
// 相机在Three.js三维坐标系中的位置
camera.position.set(300, 200, 250)

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
// 执行渲染操作
// renderer.render(scene, camera)
// three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
document.body.appendChild(renderer.domElement)

// 不同硬件设备的屏幕的设备像素比window.devicePixelRatio值可能不同
console.log('查看当前屏幕设备像素比:', window.devicePixelRatio)
// 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs，以免渲染模糊问题
renderer.setPixelRatio(window.devicePixelRatio)
// 设置背景颜色
renderer.setClearColor(0x333333)


const render = () => {
    // 渲染循环中执行stats.update()来刷新时间
    stats.update()
    // 每次绕Y轴旋转0.01弧度
    obj.bool && mesh.rotateY(0.01) 
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
