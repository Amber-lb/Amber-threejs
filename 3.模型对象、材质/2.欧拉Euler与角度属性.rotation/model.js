// 引入three.js
import * as THREE from 'three'
// 创建长方体
const geometry = new THREE.BoxGeometry(50, 50, 50)
// 创建漫反射材质
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
})
// 创建模型对象
const meshModel = new THREE.Mesh(geometry, material)

// 角度属性.rotation使用threejs欧拉对象Euler表示的
console.log('模型角度属性.rotation的值', meshModel.rotation)

// 创建一个欧拉对象，表示绕着x、y、z轴分别旋转45度，0度，90度
// 方式一
// const euler = new THREE.Euler(Math.PI / 4, 0, Math.PI / 2, 'XYZ')
// 方式二
// const euler = new THREE.Euler()
// euler.x = Math.PI / 4
// euler.y = 0
// euler.z = Math.PI / 2
// console.log('Euler', euler)

// 设置模型.rotation属性的x分量
// meshModel.rotation.x = Math.PI / 3
// 通过set方法设置模型xyz分量
// meshModel.rotation.set(Math.PI / 3, 0, Math.PI / 6)
// 通过模型的旋转方法，如：rotateY
// meshModel.rotateY(Math.PI / 3)

// 沿着某个坐标轴旋转
const axis = new THREE.Vector3(1, 1, 1)
// 归一化
axis.normalize()
meshModel.rotateOnAxis(axis, Math.PI / 6) 

//控制台查看：旋转方法，改变了rotation属性
console.log('meshModel.rotation',meshModel.rotation);

// 将点模型对象导出
export default meshModel
