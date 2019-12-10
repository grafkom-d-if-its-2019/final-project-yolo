function whitebloodcell(k, scene){   
    var geometry = new THREE.SphereGeometry(5, 31, 32);
    var material =  new THREE.MeshPhongMaterial({
        color:0xffffff,
        opacity: 0.4,
        transparent: true,
        side: THREE.DoubleSide
    })

    var sphere = new THREE.Mesh( geometry, material );

    //Generate White Blood Cell Texture
    // Surface Generator
    for (var i = 0; i < sphere.geometry.vertices.length; i++) 
    {
        if((Math.floor((i-1)/32-1)%3==2 && ((i-1)%31)%3 == 1)){
            var p = sphere.geometry.vertices[i];
            p.normalize().multiplyScalar(5 + 5/19 * noise.perlin3(p.x * k, p.y * k, p.z * k));
        }
    }

    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true; 

    scene.add(sphere);
    // return sphere;
}
