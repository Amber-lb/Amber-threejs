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

// 位置属性.position使用threejs三维向量对象Vector3表示的
console.log('模型位置属性.position的值', meshModel.position)

// new THREE.Vector3()实例化一个三维向量对象
const v3 = new THREE.Vector3(0, 0, 0)
console.log('v3', v3)
// 访问x、y或z属性改变某个分量的值
v3.x = 10
console.log('v3', v3)
// set方法设置向量的值
v3.set(5, 5, 5)
console.log('v3', v3)

// .position的值是Vector3对象，意味着你想改变.position，可以查询文档的Vector3类
// 直接设置网格模型的位置
// meshModel.position.set(100, 100, 100)
// 设置模型位置的x坐标
// meshModel.position.x = 200

// 网格模型沿着y轴方向平移200
// meshModel.translateY(200)

// 沿着某个坐标轴移动
// const axis = new THREE.Vector3(1, 1 ,2)
// 坐标归一化
// axis.normalize()
// meshModel.translateOnAxis(axis, 200)

// 网格模型沿着x轴放大2倍
meshModel.scale.x = 2
// 网格模型属性scale使用set方法设置xyz轴的放大倍数
meshModel.scale.set(0.5, 1.5, 2)

// 将点模型对象导出
export default meshModel
