function main()
{
    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.OBJLoader();
    const matloader = new THREE.MTLLoader();
    renderer.setSize( window.innerWidth, window.innerHeight );
    

    document.body.appendChild( renderer.domElement );

    var sceneMonosit, sceneEusinofil;
    var objects = [];
    var index = 0;

    function next()
    {
        index++;
        if(index == 1){
            my_loader('assets/EOSINOFIL.mtl', 'assets/EOSINOFIL.obj', index);
        }
        else if(index==2)
        {
            console.log("Masuk");
            sceneMonosit = setupScene(0);
            sceneEusinofil = setupScene(1);
            console.log(sceneMonosit.scene);
            console.log(sceneEusinofil.scene);
            render();
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
                        // object.position.z += 10*index;
                        // object.position.y -= 2;
                        object.scale.set(3, 3, 3);
                        objects.push(object);
                        next();
                    }, 
                );
            }
        );
    }

    my_loader('assets/MONOSIT.mtl', 'assets/MONOSIT.obj', index);

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
            scene.add(light);
        }
    
        return {scene, camera };
    }

    function setupScene(cell)
    {
        const sceneInfo = makeScene();
        const object = objects[cell];
        sceneInfo.scene.add(object);
        sceneInfo.object = object;
        return sceneInfo;
    }

    function renderSceneInfo(sceneInfo) {
        // console.log(sceneInfo);
        // sceneInfo.camera.updateProjectionMatrix();
    
        renderer.render(sceneInfo.scene, sceneInfo.camera);
    }

    var t=0;
    function render(time) {
        time *= 0.001;
    
        sceneMonosit.object.rotation.y = time * .1;
        sceneEusinofil.object.rotation.y = time * .1;
    
        if(t<100) renderSceneInfo(sceneMonosit);
        else renderSceneInfo(sceneEusinofil);

        // console.log(t); 

        t++;
        t%=200;
    
        requestAnimationFrame(render);
    }
}

main();