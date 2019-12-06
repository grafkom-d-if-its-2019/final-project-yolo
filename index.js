(function main(){

    //Add Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 0, 3 );
    controls.update();

    // var texture = new THREE.TextureLoader().load( 'assets/white.jpg' );
    var bump = new THREE.TextureLoader().load( 'assets/bumpmap.jpg' );
    var geometry = new THREE.SphereGeometry(5, 30, 30);
    // var geometry2 = new THREE.SphereGeometry(5, 32, 32);
    var material =  new THREE.MeshPhongMaterial({
        color:0xffffff,
        // map: texture,
        // bumpMap: bump
    })

    // var material =  new THREE.MeshPhongMaterial({color : 0xffffff})
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    //Generate White Blood Cell Texture
    surfaceGenerator(4);
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;

    //Lighting
    var spotLight = new THREE.SpotLight( 0xffffff );
    
    spotLight.castShadow = true;
    spotLight.position.set( 0, 0, 3 );

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add( camera );
    camera.add( spotLight );
    spotLight.position.set( 0, 0, 3 );
    spotLight.target = camera;
    
    //Render
    animate();

    function animate()
    {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }

    function surfaceGenerator(k) 
    {   
        for (var i = 0; i < sphere.geometry.vertices.length; i++) 
        {
            var p = sphere.geometry.vertices[i];
            p.normalize().multiplyScalar(1 + 1/6 * noise.perlin3(p.x * k, p.y * k, p.z * k));
        }

    }

})();