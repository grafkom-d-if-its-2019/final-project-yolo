function main()
{
    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.OBJLoader();
    const matloader = new THREE.MTLLoader();
    renderer.setSize( window.innerWidth, window.innerHeight );

    var path = [];
    var path_index = 0;
    var center_path = [];
    var start_index = [];
    var overview = true;

    document.body.appendChild( renderer.domElement );
    var meshesVessels = [];
    bloodVessels(meshesVessels);
    var sceneCell = [];
    var sceneOverview;
    var objects = [];
    var meshes = [];
    var index = 0;

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
        for(cc=0; cc<meshes.length; cc++)
        {
            var cx = randomNumber(-50, 50);
            var cy = randomNumber(-23, 23);
            var point = new THREE.Vector3(cx, cy, 0);
            center_path.push(point);
            start_index.push(randomNumberInt(0,1750));
        }
    }

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
            my_loader('assets/LIMFOSITB.mtl', 'assets/LIMFOSITB.obj', index);
        }
        else if(index == 4){
            my_loader('assets/LIMFOSITT.mtl', 'assets/LIMFOSITT.obj', index);
        }
        else if(index == 5){
            my_loader('assets/MONOSIT.mtl', 'assets/MONOSIT.obj', index);
        }
        else if(index == 6){
            my_loader('assets/NEUTROFIL.mtl', 'assets/NEUTROFIL.obj', index);
        }
        else if(index == 7){
            my_loader('assets/MAKROFAG.mtl', 'assets/MAKROFAG.obj', index);
        }
        else if(index == 8){
            my_loader('assets/PLATELET.mtl', 'assets/PLATELET.obj', index);
        }
        else if(index == 9)
        {
            setupOverviewScene();
            generatePath();
            generateCenterPath();
            render2();
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
                        object.traverse( function ( child ) {
                            
                            if ( child instanceof THREE.Mesh ) {
                                child.material.shininess = 0.01;
                            }
                    
                        } );
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
                            object.rotation.z = Math.PI;
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

    my_loader('assets/RED.mtl', 'assets/RED.obj', index);

    function makeScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);
        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 2, 4);
            camera.add(light);
        }
    
        return {scene, camera};
    }

    function makeSceneOverview() {
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000)

        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
        camera.position.set(105.16086905665598, -1.2354888962484027, -75.38730298823702);
        camera.lookAt(0,0,0);

        //Lighting
        var spotLight = new THREE.SpotLight( 0xffffff );
        
        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        camera.add( spotLight );
        spotLight.position.set( 0, 0, 10 );
        spotLight.target = camera;

        return {scene, camera}
    }

    function setupOverviewScene()
    {
        sceneOverview = makeSceneOverview();

        for(var i=0; i<objects.length; i++)
        {
            var j;
            // Red Blood Cell
            if(i == 0)
            {
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<100; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Basofil
            else if(i == 1){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<2; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Eosinofil
            else if(i == 2){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<4; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Limfosit B
            else if(i == 3){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<5; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Limfosit T
            else if(i == 4){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<5; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Monosit
            else if(i == 5){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<6; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Neutrofil
            else if(i == 6){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<20; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Makrofag
            else if(i == 7){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<6; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
            // Platelet
            else if(i == 8){
                meshes.push(objects[i]);
                // sceneInfo.scene.add(objects[i]);
                for(var j=0; j<30; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                    // sceneInfo.scene.add(object);
                }
            }
        }

        for(i=0; i<meshes.length; i++)
        {
            sceneOverview.scene.add(meshes[i]);
        }

        sceneOverview.scene.add(meshesVessels[0]);
        sceneOverview.scene.add(sceneOverview.camera);

        console.log(meshes.length);
        console.log(sceneOverview.scene.children.length)

        // return sceneInfo;
    }

    function setupScene(cell)
    {
        const sceneInfo = makeScene();
        const object = objects[cell];
        sceneInfo.scene.add(object);
        sceneInfo.object = object;
        sceneInfo.scene.add(sceneInfo.camera)

        return sceneInfo;
    }

    function renderSceneInfo(sceneInfo) {  
        // sceneInfo.scene.children[1].rotation.z+=0.01;
        renderer.render(sceneInfo.scene, sceneInfo.camera);
    }

    function render2()
    {
        const {scene, camera} = sceneOverview;
        // console.log(scene);
        var j;
        for (j=0; j<meshes.length; j++){
            if(j >148 && j <156){
                scene.children[j].rotation.x+=0.01;
            }
            else{
                scene.children[j].rotation.x+=0.005;
                // sceneCell[0].scene.children[j].rotation.y+=0.001;
                // sceneCell[0].scene.children[j].rotation.z+=0.01;
            }
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
        requestAnimationFrame( render2 );
    }

    var t=0;
    function render(time) {
        // overview = false;
        time *= 0.001;
    
        if (t<100) renderSceneInfo(sceneCell[1]);
        else if(t<200) renderSceneInfo(sceneCell[2]);
        else if(t<300) renderSceneInfo(sceneCell[3]);
        else if(t<400) renderSceneInfo(sceneCell[4]);
        else if(t<500) renderSceneInfo(sceneCell[5]);
        else if(t<600) renderSceneInfo(sceneCell[6]);
        else if(t<700) renderSceneInfo(sceneCell[7]);
        else if(t<800) renderSceneInfo(sceneCell[8]);
        else if(t<900) renderSceneInfo(sceneCell[9]);

        // console.log(t); 

        t++;
        t%=900;
    
        requestAnimationFrame(render);
    }
}

main();