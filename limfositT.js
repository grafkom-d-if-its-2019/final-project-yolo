function limfositT(k, meshes){   
    var geometry = new THREE.SphereGeometry(3, 31, 32);

    var material = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color("orange")
          },
          color2: {
            value: new THREE.Color("red")
          }
        },
        vertexShader: `
          varying vec2 vUv;
      
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
        
          varying vec2 vUv;
          
          void main() {
            
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }
        `,
    });

    var sphere = new THREE.Mesh( geometry, material );

    // Surface Generator
    for (var i = 0; i < sphere.geometry.vertices.length; i++) 
    {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(3.6 + 5/19 * noise.perlin3(p.x * k, p.y * k, p.z * k));
    }

    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true; 

    sphere.position.x = 0.8;

    meshes.push(sphere);
}