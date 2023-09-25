// 引入threejs
import * as THREE from 'three'
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
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, // 设置材质颜色
    transparent: true, // 开启透明
    opacity: .5, // 设置透明度
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

