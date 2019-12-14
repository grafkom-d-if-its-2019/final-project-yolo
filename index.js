(function(){

    //Add Scene
    var path = [];

    var scene = new THREE.Scene();
    var meshes=[];
    var meshesVessel=[];
    // scene.background = new THREE.TextureLoader().load('assets/white.jpg');
    scene.background = new THREE.Color(0x000000)

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    // camera.position.set(92.83968629417194, 9.610419921941201, -36.24130899572845);
    camera.position.set(0, 0, 15);
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
    bloodVessels(meshesVessel);
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

    // penentuan obj file yang harus di load
    var index=0;
    var time = new Date();
    var start = time.getTime();
    console.log(start);
    var end;
    function next()
    {
        index++;
        if(index == 1)
        {
            my_loader('assets/BASOFIL.mtl', 'assets/BASOFIL.obj', index);
        }
        else if(index == 2){
            my_loader('assets/EOSINOFIL.mtl', 'assets/EOSINOFIL.obj', index);
        }
        else if(index == 3){
            my_loader('assets/NEUTROFIL.mtl', 'assets/NEUTROFIL.obj', index);
        }
        // else if(index == 4){
        //     my_loader('assets/MONOSIT.mtl', 'assets/MONOSIT.obj', index);
        // }
        else if(index == 4){
            my_loader('assets/LIMFOSITT.mtl', 'assets/LIMFOSITT.obj', index);
        }
        // else if(index == 5){
        //     my_loader('assets/MAKROFAG.mtl', 'assets/MAKROFAG.obj', index);
        // }
        else if(index==5)
        {
            var timer = new Date();
            end = timer.getTime();
            // var diff = start - end;
            // diff *= -1;     
            // console.log("Waktu load : " + diff);
            console.log(end);
            for(i=0; i<meshes.length; i++)
            {
                scene.add(meshes[i]);
            }
            main();
        }
    }

    // fungsi load file obj dan mtl
    function my_loader(mtlfile, objfile, index)
    {
        matloader.load
        (
            //Resource URL
            mtlfile,

            // called when resource is loaded
            function ( material ) 
            {
                material.preload();

                loader.setMaterials(material)

                loader.load
                (
                    // resource URL
                    objfile,
            
                    // called when resource is loaded
                    function ( object ) 
                    {

                        if(index == 4)
                        {
                            object.position.set(0,0,0);
                        }
                        object.position.z += 10*index;
                        // object.position.y -= 2;
                        meshes.push(object);
                        // scene.add(object);
                        next();
                    }, 
                );
            }
        );
    }

    my_loader('assets/MONOSIT.mtl', 'assets/MONOSIT.obj', index);
  
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    var id = scene.getObjectById( 0, true );
    var object = scene.getObjectByName( "sphere", true );
    var center = new THREE.Vector3;
    var arah_z = 1;

    function onMouseDown( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }

    document.addEventListener( 'mousedown', onMouseDown, false );

    var path_index=0;
    function animate()
    {
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( meshes, true );

        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0x00ff00 );
            }
        } else {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }

        // console.log("masuk animate");
        scene.children[1].rotation.z+=0.01;
        scene.children[1].position.x=path[path_index].x;
        scene.children[1].position.y=path[path_index].y;
        scene.children[1].position.z=path[path_index].z;
        path_index++;
        path_index%=2000;
        

        controls.update();

        // console.log(scene.children[6].position.z);

        // console.log(camera.position.x, camera.position.y, camera.position.z);
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    }
    // setTimeout (animate, 6000);

    function generatePath()
    {
        var tt;
        for(tt=0; tt<2000; tt++)
        {
            var t = tt/2000;
            var tx = 15* (t*3-1.5);
            var ty = 0;
            var tz = Math.sin(2*Math.PI * t) *5;
            var point = new THREE.Vector3(tx, ty, tz).multiplyScalar(10);
            path.push(point);
        }
    }

    function main(){
        scene.add(meshesVessel[0]);

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
        
        //Render
        generatePath();
        console.log(path);
        // console.log(path[0].x, path[0].y, path[0].z);
        //Render
        animate();
    }

})();