function main()
{
    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.OBJLoader();
    const matloader = new THREE.MTLLoader();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    var sceneCell = [];
    var objects = [];
    var index = 0;

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
            var i;
            for(i=0; i<index; i++)
            {
                sceneCell.push(setupScene(i))
            }
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
            scene.add(light);
        }
    
        return {scene, camera};
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
        renderer.render(sceneInfo.scene, sceneInfo.camera);
    }

    var t=0;
    function render(time) {
        time *= 0.001;
    
        if(t<100) renderSceneInfo(sceneCell[0]);
        else if(t<200) renderSceneInfo(sceneCell[1]);
        else if(t<300) renderSceneInfo(sceneCell[2]);
        else if(t<400) renderSceneInfo(sceneCell[3]);
        else if(t<500) renderSceneInfo(sceneCell[4]);
        else if(t<600) renderSceneInfo(sceneCell[5]);
        else if(t<700) renderSceneInfo(sceneCell[6]);
        else if(t<800) renderSceneInfo(sceneCell[7]);
        else if(t<900) renderSceneInfo(sceneCell[8]);

        // console.log(t); 

        t++;
        t%=800;
    
        requestAnimationFrame(render);
    }
}

main();