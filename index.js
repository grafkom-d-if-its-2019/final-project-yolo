(function main(){

    //Add Scene
    var scene = new THREE.Scene();
    var meshes=[];
    var meshesVessel=[];
    // scene.background = new THREE.TextureLoader().load('assets/white.jpg');
    scene.background = new THREE.Color(0x000000)

    // Takbenerno fov near e, ben iso pake bumpmap tanpa pecah, texture takbuat e
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(92.83968629417194, 9.610419921941201, -36.24130899572845);
    // camera.position.set(0, 0, 15);
    camera.lookAt(0,0,0);
    controls.update();

    var bump = new THREE.TextureLoader().load('assets/bumpmap.jpg');

    var geometry = new THREE.SphereGeometry(2, 31, 32);
    var material =  new THREE.MeshPhongMaterial({
        color:0xff0000,
        // bumpMap: bump
    })

    var sphere = new THREE.Mesh( geometry, material );

    for (var i = 0; i < sphere.geometry.vertices.length; i++) 
    {
        sphere.geometry.vertices[i].x+=0.5;
        sphere.geometry.vertices[i].y+=0.5;
        sphere.geometry.vertices[i].z+=0.7;
    }

    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true; 

    whitebloodcell(19, meshes);
    // limfositB(19, meshes);
    // limfositT(19, meshes);
    // redBloodCell(meshes);
    bloodVessels(meshesVessel);
    // monosit(meshes);
    
    //TESTING
    // platelet(meshes);
  
    // instantiate a loader
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        'assets/PLATELET.obj',
        // called when resource is loaded
        function ( object ) {

            scene.add( object );

        },
        // called when loading is in progresses
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );

    scene.add(meshesVessel[0]);

    var i;
    for(i=0; i<meshes.length; i++)
    {
        scene.add(meshes[i]);
    }

    //Lighting
    var spotLight = new THREE.SpotLight( 0xffffff );
    
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add( camera );
    camera.add( spotLight );
    spotLight.position.set( 0, 0, 10 );
    spotLight.target = camera;

    var center = new THREE.Vector3;
    var arah_z = 1;
    
    //Render
    animate();

    function isCollision(){
        for (var vertexIndex = 0; vertexIndex < meshes[i].geometry.vertices.length; vertexIndex++)
        {       
            var localVertex = meshes[i].geometry.vertices[vertexIndex].clone();
            var globalVertex = meshes[i].matrix.multiplyVector3(localVertex);
            var directionVector = globalVertex.sub( meshes[i].position );

            var ray = new THREE.Raycaster( meshes[i].position, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( meshesVessel );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
            {
                // a collision occurred... do something...
                arah_z *= -1;
            }
        }
    }
    
    function animate()
    {
        // var i;
        // for(i=0; i<meshes.length; i++)
        // {
        //     meshes[i].position.x += 0.05;
        //     meshes[i].position.z += 0.1*arah_z;
        // }

        controls.update();
        console.log(camera.position.x, camera.position.y, camera.position.z);
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    }

})();