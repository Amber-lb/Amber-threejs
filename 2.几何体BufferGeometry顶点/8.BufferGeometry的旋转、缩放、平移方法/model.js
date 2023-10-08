// 引入three.js
import * as THREE from 'three'

// 创建一个缓存几何体对象
const geometry = new THREE.BufferGeometry()

// 通过类型数组创建定点数据
const vectors = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    100, 80, 0,
    0, 80, 0,
])
// 创建缓冲属性对象：3个为一组，表示一个顶点的xyz坐标
const positions = new THREE.BufferAttribute(vectors, 3)

// 通过类型数组创建顶点索引
const indexArr = new Uint16Array([0, 1, 2, 0, 2, 3])
// 创建缓冲属性对象：1个为一组，表示一个顶点的索引
const indexs = new THREE.BufferAttribute(indexArr, 1)


// 设置几何体 attributes 属性的位置属性
geometry.attributes.position = positions
// 设置几何体 index 属性
geometry.index = indexs

// 每个顶点的法线数据和顶点位置数据一一对应
const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
])
// 设置几何体 attributes 属性的顶点法线属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)


// 几何体xyz三个方向都放大2倍
geometry.scale(2, 2, 2);
// 几何体沿着x轴平移50
geometry.translate(50, 0, 0);
// 几何体绕着x轴旋转30度
geometry.rotateX(Math.PI / 6);
// 居中：偏移的几何体居中，你可以看到几何体重新与坐标原点重合
// geometry.center();

// 几何体旋转、缩放或平移之后，查看几何体顶点位置坐标的变化
// BufferGeometry的旋转、缩放、平移等方法本质上就是改变顶点的位置坐标
console.log('顶点位置数据', geometry.attributes.position);


// 创建网格模型材质
const material = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    wireframe: true,
})

// 创建网格模型对象
// 网格模型本质：一个一个三角形(面)构成
const meshModel = new THREE.Mesh(geometry, material)

// 将点模型对象导出
export default meshModel
