function monosit(meshes)
{

    var geometry = new THREE.TorusGeometry(2.25, 2, 32, 32, Math.PI);
    var geometry2 = new THREE.SphereGeometry(2, 32, 32, Math.PI/2, Math.PI);
    var material = new THREE.MeshPhongMaterial({ color : 0x000088});
    var torus = new THREE.Mesh(geometry, material);
    var sphere1 = new THREE.Mesh(geometry2,material);
    sphere1.rotateZ(-Math.PI/2);
    var sphere2 = sphere1.clone(sphere1);
    sphere1.position.set(2.25, 0, 0);
    sphere2.position.set(-2.25, 0, 0);

    // scene.add(cylinder, torus, );
    meshes.push(torus, sphere1, sphere2);
}