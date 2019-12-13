(function main(){

    //Add Scene
    var path = [];

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

    // whitebloodcell(19, meshes);
    // limfositB(19, meshes);
    // limfositT(19, meshes);
    // redBloodCell(meshes);
    // bloodVessels(meshesVessel);
    // monosit(meshes);
    
    //TESTING
  
    // Manager 
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    // Loaders
    var loader = new THREE.OBJLoader(manager);
    var matloader = new THREE.MTLLoader(manager);
    var onProgress = function a ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };
    var onError = function () { };

    // instantiate the loader

    // load a resource from provided URL synchronously

    var objects = []

    function createObject(mtlFile, objFile)
    {
        var container = new THREE.Object3D();
        matloader.load
        (
            //Resource URL
            mtlFile,

            // called when resource is loaded
            function ( material ) 
            {
                console.log(material);

                material.preload();

                loader.setMaterials(material)

                loader.load
                (
                    // resource URL
                    objFile,
            
                    // called when resource is loaded
                    function ( object ) 
                    {
                        container.add(object);
                    }, 
                    onProgress, 
                    onError
                );
            }
        );
        return container;
    }

    scene.add(createObject(mtlFile, objFile));

    //  // BASOFIL LOAD
    //  matloader.load
    //  (
    //      //Resource URL
    //      'assets/BASOFIL.mtl',
 
    //      // called when resource is loaded
    //      function ( material ) 
    //      {
    //          material.preload();
 
    //          loader.setMaterials(material)
 
    //          loader.load
    //          (
    //              // resource URL
    //              'assets/BASOFIL.obj',
         
    //              // called when resource is loaded
    //              function ( object ) 
    //              {
    //                  object.position.z += 1
    //                  object.position.y -= 2
    //                  scene.add(object);
    //              }, 
    //              onProgress, 
    //              onError
    //          );
    //      }
    //  );

    scene.add(meshesVessel[0]);

    var i;

    for(i=0; i<objects.length; i++)
    {
        scene.add(objects[i]);
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
    generatePath();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    var id = scene.getObjectById( 0, true );
    var object = scene.getObjectByName( "sphere", true );

    function onMouseDown( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
    
    var go=1;
    function animate()
    {
        // var i;
        // for(i=0; i<meshes.length; i++)
        // {
        //     meshes[i].position.x += 0.05;
        //     for (var vertexIndex = 0; vertexIndex < meshes[i].geometry.vertices.length; vertexIndex++)
        //     {       
        //         var localVertex = meshes[i].geometry.vertices[vertexIndex].clone();
        //         var globalVertex = meshes[i].matrix.multiplyVector3(localVertex);
        //         var directionVector = globalVertex.sub( meshes[i].position );

        //         var ray = new THREE.Raycaster( meshes[i].position, directionVector.clone().normalize() );
        //         var collisionResults = ray.intersectObjects( meshesVessel );
        //         if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
        //         {
        //             // a collision occurred... do something...
        //             arah_z *= -1;
        //         }
        //     }
        //     meshes[i].position.z += 0.1*arah_z;
        // }
        
        // update the picking ray with the camera and mouse position
        // raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        // var intersects = raycaster.intersectObjects( scene.children, true );

        // if ( intersects.length > 0 ) {
        //     if ( INTERSECTED != intersects[ 0 ].object ) {
        //         if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        //         INTERSECTED = intersects[ 0 ].object;
        //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        //         INTERSECTED.material.emissive.setHex( 0x00ff00 );
        //     }
        // } else {
        //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        //     INTERSECTED = null;
        // }

        // console.log("masuk animate");
        scene.children[1].rotation.x+=0.1;

        controls.update();

        // console.log(scene.children[1]);

        if(go)
        {
            go=0;
        }
        // console.log(camera.position.x, camera.position.y, camera.position.z);
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    }

    function generatePath()
    {
        var tt;
        for(tt=0; tt<1000; tt++)
        {
            var t = tt/1000;
            var tx = 15* (t*3-1.5);
            var ty = 0;
            var tz = Math.sin(2*Math.PI * t) *5;
            var point = new THREE.Vector3(tx, ty, tz);
            path.push(point);
        }
    }


    //Render
    animate();
    document.addEventListener( 'mousedown', onMouseDown, false );
})();