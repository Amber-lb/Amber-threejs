// 引入three.js
import * as THREE from 'three'

// 创建一个缓存几何体对象
const geometry = new THREE.BufferGeometry()
// 通过类型数组创建定点数据
const vectors = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 80, 0,
    0, 0, 20,
    0, 0, 100,
    100, 0, 20,
])
// 创建缓冲属性对象：3个为一组，表示一个顶点的xyz坐标
const positions = new THREE.BufferAttribute(vectors, 3)
// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = positions
// 创建点模型材质
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    // 点对象像素尺寸
    size: 10.0
})
// 创建点模型对象
const pointModel = new THREE.Points(geometry, material)
// 将点模型对象导出
export default pointModel
