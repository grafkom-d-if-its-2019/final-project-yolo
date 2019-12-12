function redBloodCell(meshes)
{
    // Tinggal texture mikir biar kaga pecah

    var geometry = new THREE.TorusGeometry(6, 2.25, 16, 32);
    var material = new THREE.MeshPhongMaterial({ color : 0xff0000});
    var torus = new THREE.Mesh(geometry, material);

    var geometry_2 = new THREE.CylinderGeometry(5, 5, 2, 32);
    geometry_2.rotateX(0.5*Math.PI)
    var cylinder = new THREE.Mesh(geometry_2, material);

    // scene.add(cylinder, torus, );
    meshes.push(cylinder, torus)
}