(function(){

    //Add Scene
    var path = [];
    var center_path = [];
    var start_index = [];

    var scene = new THREE.Scene();
    var meshes=[];
    var objects=[];
    var meshesVessel=[];
    // scene.background = new THREE.TextureLoader().load('assets/white.jpg');
    scene.background = new THREE.Color(0x000000)

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Controls
    // var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(105.16086905665598, -1.2354888962484027, -75.38730298823702);
    // camera.position.set(0, 0, 15);
    camera.lookAt(0,0,0);
    // controls.update();

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
    var jenis=0;
    var time = new Date();
    var start = time.getTime();
    console.log(start);
    var end;
    function next()
    {
        jenis++;
        if(jenis == 1)
        {
            my_loader('assets/BASOFIL.mtl', 'assets/BASOFIL.obj', jenis);
        }
        else if(jenis == 2){
            my_loader('assets/EOSINOFIL.mtl', 'assets/EOSINOFIL.obj', jenis);
        }
        else if(jenis == 3){
            my_loader('assets/LIMFOSITB.mtl', 'assets/LIMFOSITB.obj', jenis);
        }
        else if(jenis == 4){
            my_loader('assets/LIMFOSITT.mtl', 'assets/LIMFOSITT.obj', jenis);
        }
        else if(jenis == 5){
            my_loader('assets/MONOSIT.mtl', 'assets/MONOSIT.obj', jenis);
        }
        else if(jenis == 6){
            my_loader('assets/NEUTROFIL.mtl', 'assets/NEUTROFIL.obj', jenis);
        }
        else if(jenis == 7){
            my_loader('assets/MAKROFAG.mtl', 'assets/MAKROFAG.obj', jenis);
        }
        else if(jenis == 8){
            my_loader('assets/PLATELET.mtl', 'assets/PLATELET.obj', jenis);
        }
        else if(jenis == 9)
        {
            var timer = new Date();
            end = timer.getTime();
            // var diff = start - end;
            // diff *= -1;     
            // console.log("Waktu load : " + diff);
            console.log(end);
            for(var i=0; i<objects.length; i++)
            {
                // Red Blood Cell
                if(i == 0)
                {
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<50; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Basofil
                else if(i == 1){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<2; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Eosinofil
                else if(i == 2){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<4; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Limfosit B
                else if(i == 3){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<5; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Limfosit T
                else if(i == 4){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<5; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Monosit
                else if(i == 5){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<6; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Neutrofil
                else if(i == 6){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<20; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Makrofag
                else if(i == 7){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<6; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
                // Platelet
                else if(i == 8){
                    meshes.push(objects[i]);
                    scene.add(objects[i]);
                    for(var j=0; j<30; j++){
                        var object = objects[i].clone();
                        meshes.push(object);
                        scene.add(object);
                    }
                }
            }
            console.log(meshes);
            console.log(scene.children);
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
                        // Red Blood Cell
                        if(index == 0)
                        {
                            object.scale.set(2.5,2.5,2.5);
                        }
                        // Basofil
                        else if(index == 1){
                            object.scale.set(4,4,4);
                        }
                        // Eosinofil
                        else if(index == 2){
                            object.scale.set(4,4,4);
                        }
                        // Limfosit B
                        else if(index == 3){
                            object.scale.set(4,4,4);
                        }
                        // Limfosit T
                        else if(index == 4){
                            object.scale.set(4,4,4);
                        }
                        // Monosit
                        else if(index == 5){
                            object.scale.set(4,4,4);
                        }
                        // Neutrofil
                        else if(index == 6){
                            object.scale.set(4,4,4);
                        }
                        // Makrofag
                        else if(index == 7){
                            object.scale.set(4,4,4);
                        }
                        // Platelet
                        else if(index == 8){

                        }
                        objects.push(object);
                        next();
                    }, 
                );
            }
        );
    }

    my_loader('assets/RED.mtl', 'assets/RED.obj', jenis);
  
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    // var id = scene.getObjectById( 0, true );
    // var object = scene.getObjectByName( "sphere", true );

    function onMouseDown( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
    function onMouseUp( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = -1;
        mouse.y = -1;
    
    }

    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'mouseup', onMouseUp, false );

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

        // console.log(scene.children);
        var j;
        for (j=0; j<meshes.length; j++){
            scene.children[j].rotation.z+=0.01;
            scene.children[j].position.x=path[(path_index + start_index[j])%2000].x + center_path[j].x;
            scene.children[j].position.y=path[(path_index + start_index[j])%2000].y + center_path[j].y;
            scene.children[j].position.z=path[(path_index + start_index[j])%2000].z;
        }
        path_index++;
        path_index%=2000;
        
        // controls.update();

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

    // Function to generate float random number
    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }

    // Function to generate integer random number  
    function randomNumberInt(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }  

    function generateCenterPath()
    {
        var cc;
        for(cc=0; cc<200; cc++)
        {
            var cx = randomNumber(-50, 50);
            var cy = randomNumber(-23, 23);
            var point = new THREE.Vector3(cx, cy, 0);
            center_path.push(point);
            start_index.push(randomNumberInt(0,1750));
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
        
        console.log(scene.children);

        generatePath();
        // console.log(path);
        generateCenterPath();
        console.log(center_path);
        //Render
        animate();
    }

})();