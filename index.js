(function main(){

    //Add Scene
    var scene = new THREE.Scene();
    var meshes=[];
    // scene.background = new THREE.TextureLoader().load('assets/white.jpg');
    scene.background = new THREE.Color(0x000000)

    // Takbenerno fov near e, ben iso pake bumpmap tanpa pecah, texture takbuat e
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
    // bloodVessels(meshes);
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



    // scene.add(sphere);

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
    
    //Render
    animate();
    
    function animate()
    {
        // console.log(center.distanceTo(camera.position));
        requestAnimationFrame( animate );
        // if(center.distanceTo(camera.position) <= 5)
        //     outerwall.material.side = THREE.DoubleSide;
        // else if (center.distanceTo(camera.position) > 5)
        //     outerwall.material.side = THREE.FrontSide;
        controls.update();
        renderer.render( scene, camera );
    }

})();