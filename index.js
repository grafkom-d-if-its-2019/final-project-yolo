function main()
{
    var scene;
    var camera;
    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.OBJLoader();
    const matloader = new THREE.MTLLoader();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    renderer.setSize( window.innerWidth, window.innerHeight );

    var path = [];
    var path_index = 0;
    var center_path = [];
    var rotation_path = [];
    var start_index = [];
    var overview = false;
    var menu = true;
    var load_index = 0;
    var menu_background = [];

    var backCheck = [];
    var backTex = new THREE.TextureLoader().load("assets/back.jpg");
    var backGeo  = new THREE.PlaneGeometry(1, 1, 1);
    var backMat = new THREE.MeshPhongMaterial( {map: backTex, side: THREE.DoubleSide} );
    var back = new THREE.Mesh( backGeo , backMat );
    back.position.set(-14.5, 6, 0);
    backCheck.push(back);

    document.body.appendChild( renderer.domElement );
    var meshesVessels = [];
    bloodVessels(meshesVessels);
    var sceneOverview;
    var objects = [];
    var meshes = [];
    var index = 0;

    var listener;
    var sound;
    var sound_flag = 0;


    function textureText(cell) {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        
        var text;

        if(cell == 0) text = "Sel darah merah adalah jenis sel darah yang paling banyak dan berfungsi mengikat oksigen yang diperlukan untuk oksidasi jaringan-jaringan tubuh lewat darah dalam hewan bertulang belakang. Bagian dalam eritrosit terdiri dari hemoglobin, sebuah biomolekul yang dapat mengikat oksigen. Hemoglobin akan mengambil oksigen dari paru-paru dan insang, dan oksigen akan dilepaskan saat eritrosit melewati pembuluh kapiler. Warna merah sel darah merah sendiri berasal dari warna hemoglobin yang unsur pembuatnya adalah zat besi. Pada manusia, sel darah merah dibuat di sumsum tulang belakang, lalu membentuk kepingan bikonkaf. Di dalam sel darah merah tidak terdapat nukleus. Sel darah merah sendiri aktif selama 120 hari sebelum akhirnya dihancurkan.";
        else if(cell == 1) text = "Basofil adalah granulosit dengan populasi paling kecil, yaitu sekitar 0,01-0,3% dari sirkulasi sel darah putih. Basofil mengandung banyak granula sitoplasmik dengan dua lobus. Seperti granulosit lain, basofil dapat tertarik keluar menuju jaringan tubuh dalam kondisi tertentu. Saat teraktivasi, basofil mengeluarkan antara lain histamin, heparin, kondroitin, elastase dan lisofosfolipase, leukotriena dan beberapa macam sitokina. Basofil memainkan peran dalam reaksi alergi seperti asma."
        else if(cell == 2) text = "Eosinofil adalah sel darah putih dari kategori granulosit yang berperan dalam sistem kekebalan dengan melawan parasit multiselular dan beberapa infeksi pada makhluk vertebrata. Bersama-sama dengan sel biang, eosinofil juga ikut mengendalikan mekanisme alergi. Eosinofil terbentuk pada proses haematopoiesis yang terjadi pada sumsum tulang sebelum bermigrasi ke dalam sirkulasi darah. Eosinofil mengandung sejumlah zat kimiawi antara lain histamin, eosinofil peroksidase, ribonuklease, deoksiribonuklease, lipase, plasminogen dan beberapa asam amino yang dirilis melalui proses degranulasi setelah eosinofil teraktivasi. Zat-zat ini bersifat toksin terhadap parasit dan jaringan tubuh."
        else if(cell == 3) text = "Sel B, juga dikenal sebagai limfosit B, adalah jenis sel darah putih dari subtipe limfosit kecil. Mereka berfungsi dalam komponen imunitas humoral dari sistem imun adaptif dengan mengeluarkan antibodi. Selain itu, sel B menyajikan antigen dan mensekresi sitokin. Pada mamalia, sel B matang di sumsum tulang, yang merupakan inti dari sebagian besar tulang. Sel B, tidak seperti dua kelas limfosit lainnya, sel T dan sel pembunuh alami, mengekspresikan reseptor sel B pada membran sel mereka. reseptor sel B memungkinkan sel B berikatan dengan antigen spesifik, yang dengannya sel itu akan memulai respon antibodi."
        else if(cell == 4) text = "Sel T atau limfosit T adalah kelompok sel darah putih yang memainkan peran utama pada kekebalan seluler. Sel T mampu membedakan jenis patogen dengan kemampuan berevolusi sepanjang waktu demi peningkatan kekebalan setiap kali tubuh terpapar patogen. Hal ini dimungkinkan karena sejumlah sel T teraktivasi menjadi sel T memori dengan kemampuan untuk berproliferasi dengan cepat untuk melawan infeksi yang mungkin terulang kembali. Kemampuan sel T untuk mengingat infeksi tertentu dan sistematika perlawanannya, dieksploitasi sepanjang proses vaksinasi, yang dipelajari pada sistem imun adaptif."
        else if(cell == 5) text = "Monosit adalah kelompok darah putih yang menjadi bagian dari sistem kekebalan. Monosit diproduksi di dalam sumsum tulang dari sel punca haematopoetik yang disebut monoblas. Setengah jumlah produksi tersimpan di dalam limpa pada bagian pulpa. Monosit tersirkulasi dalam peredaran darah dengan rasio plasma 3-5% selama satu hingga tiga hari, kemudian bermigrasi ke seluruh jaringan tubuh. Sesampai di jaringan, monosit akan menjadi matang dan terdiferensiasi menjadi beberapa jenis makrofaga, sel dendritik dan osteoklas."
        else if(cell == 6) text = "Neutrofil adalah bagian sel darah putih dari kelompok granulosit yang mempunyai granula pada sitoplasma, disebut juga polimorfonuklir. Granula neutrofil berwarna merah kebiruan. Neutrofil berhubungan dengan pertahanan tubuh terhadap infeksi bakteri dan proses inflamasi lainnya, serta menjadi sel yang pertama hadir ketika terjadi infeksi di suatu tempat. Dengan sifat fagositik yang mirip dengan makrofaga, neutrofil menyerang patogen dengan serangan respiratori menggunakan berbagai macam substansi beracun yang mengandung bahan pengoksidasi kuat, termasuk hidrogen peroksida, oksigen radikal bebas, dan hipoklorit. Rasio sel darah putih dari neutrofil umumnya mencapai 50-60%. Sel neutrofil yang rusak terlihat sebagai nanah."
        else if(cell == 7) text = "Makrofag adalah sel pada jaringan yang berasal dari sel darah putih yang disebut monosit. Monosit dan makrofag merupakan fagosit, berfungsi terutama pada pertahanan tidak spesifik. Peran makrofag adalah untuk memfagositosis seluler dan patogen serta untuk menstimulasikan limfosit dan sel imun lainnya untuk merespon patogen."
        else if(cell == 8) text = "Keping darah adalah sel anuclear nulliploid dengan bentuk tak beraturan dengan ukuran diameter 2-3 µm yang merupakan fragmentasi dari megakariosit. Keping darah tersirkulasi dalam darah dan terlibat dalam mekanisme hemostasis tingkat sel dalam proses pembekuan darah dengan membentuk darah beku. Rasio plasma keping darah normal berkisar antara 200.000-300.000 keping/mm³, nilai dibawah rentang tersebut dapat menyebabkan pendarahan, sedangkan nilai di atas rentang yang sama dapat meningkatkan risiko trombosis. Trombosit memiliki bentuk yang tidak teratur, tidak berwarna, tidak berinti, berukuran lebih kecil dari eritrosit dan leukosit, dan mudah pecah bila tersentuh benda kasar."

        const lineHeight = 15;
        const maxWidth = canvas.width-20;
        var x = 10, y = 20;
        var context = canvas.getContext('2d');
        context.font = '11pt Calibri';
        context.fillStyle = '#fff';
        context.clearRect(0, 0, canvas.width, canvas.height);
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };

    function generateMesh()
    {
        for(var i=0; i<objects.length; i++)
        {
            var j;
            // Red Blood Cell
            if(i == 0)
            {
                meshes.push(objects[i]);
                for(var j=0; j<100; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Basofil
            else if(i == 1){
                meshes.push(objects[i]);
                for(var j=0; j<2; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Eosinofil
            else if(i == 2){
                meshes.push(objects[i]);
                for(var j=0; j<4; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Limfosit B
            else if(i == 3){
                meshes.push(objects[i]);
                for(var j=0; j<5; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Limfosit T
            else if(i == 4){
                meshes.push(objects[i]);
                for(var j=0; j<5; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Monosit
            else if(i == 5){
                meshes.push(objects[i]);
                for(var j=0; j<6; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Neutrofil
            else if(i == 6){
                meshes.push(objects[i]);
                for(var j=0; j<20; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Makrofag
            else if(i == 7){
                meshes.push(objects[i]);
                for(var j=0; j<6; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
            // Platelet
            else if(i == 8){
                meshes.push(objects[i]);
                for(var j=0; j<30; j++){
                    var object = objects[i].clone();
                    meshes.push(object);
                }
            }
        }
    }

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
    
    function generateRotationPath()
    {
        var rr;
        for(rr=0; rr<meshes.length; rr++)
        {
            var rx = randomNumber(0.001, 0.01);
            var ry = randomNumber(0.001, 0.01);
            var rz = randomNumber(0.001, 0.01);
            var point = new THREE.Vector3(rx, ry, rz);
            rotation_path.push(point);
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
            generateMesh();
            setupOverviewScene();
            checkSound();
            generatePath();
            generateCenterPath();
            generateRotationPath();
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

    function sound_loader(audiofile){
        // create an AudioListener and add it to the camera
        listener = new THREE.AudioListener();
        camera.add( listener );

        // create a global audio source
        sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load( audiofile, function( buffer ) {
            sound.setBuffer( buffer );
            sound.setVolume( 1.0 );
            sound.play();
        });
    }

    function makeScene() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 100 );
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);
        
        var light = new THREE.PointLight( 0xffffff, 1.4, 0 );
        light.position.set( 50, 0, 100 );
        scene.add( light );

        scene.add(backCheck[0]);
        
        return {scene, camera};
    }

    function makeSceneMenu() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xff0000);

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 100 );
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);

        console.log(scene, camera);

        return {scene, camera};
    }

    function makeSceneOverview() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000)

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 3, 1000 );
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

    function setupMenuScene()
    {
        sceneOverview = makeSceneMenu();

        var menuTex = new THREE.TextureLoader().load("assets/MainMenu.jpg");
        sceneOverview.scene.background = menuTex;

        var loadTex1 = new THREE.TextureLoader().load("assets/NowLoading1.jpg");
        var loadTex2 = new THREE.TextureLoader().load("assets/NowLoading2.jpg");
        var loadTex3 = new THREE.TextureLoader().load("assets/NowLoading3.jpg");
    
        menu_background.push(loadTex1, loadTex2, loadTex3);

        renderMenu();

    }

    function setupOverviewScene()
    {
        sceneOverview = makeSceneOverview();

        for(i=0; i<meshes.length; i++)
        {
            sceneOverview.scene.add(meshes[i]);
        }

        sceneOverview.scene.add(meshesVessels[0]);
        sceneOverview.scene.add(sceneOverview.camera);

        // console.log(meshes.length);
        // console.log(sceneOverview.scene.children.length);

    }

    function setupScene(cell)
    {
        const sceneInfo = makeScene();
        const object = objects[cell];
        object.position.set(-7.5,0,0);
        var controls = new THREE.ObjectControls(sceneInfo.camera, renderer.domElement, object);
        controls.setDistance(8, 200); // set min - max distance for zoom
        var text = textureText(cell);

        // console.log(text);

        var geometry = new THREE.PlaneGeometry( 15, 8, 32 );
        var material = new THREE.MeshLambertMaterial( {map: text, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.set(7, 0, 0);

        controls.setZoomSpeed(0); // set zoom speed
        controls.enableVerticalRotation(); // enables the vertical rotation, see also disableVerticalRotation(), enableHorizontalRotation(), disableHorizontalRotation()
        controls.enableHorizontalRotation();
        controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4); // sets a max angle value for the rotation of the object, see also setMaxHorizontalRotationAngle(R,R)
        controls.disableMaxHorizontalAngleRotation()// disables rotation angle limits for horizontal rotation, see also disableMaxVerticalAngleRotation()
        controls.setRotationSpeed(0.1); // sets a new rotation speed for desktop, see also setRotationSpeedTouchDevices(value)

        sceneInfo.scene.add(object);
        sceneInfo.scene.add(plane);
        sceneInfo.object = object;
        sceneOverview.camera.lookAt(-5,0,0);

        sceneInfo.scene.add(sceneInfo.camera);
        sceneInfo.scene.add(sceneInfo.light);

        return sceneInfo;
    }

    setupMenuScene();

    function checkSound(){
        console.log(sound_flag);
        if(sound_flag == 0)
        {
            if(sound) sound.stop();
            sound_loader('soundeffect/heartbeat.mp3');
            sound.setLoop( true );
            sound_flag = -1;
        }
        else if (sound_flag == 1){
            if(sound) sound.stop();
            sound_loader('soundeffect/eritrosit.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 2){
            if(sound) sound.stop();
            sound_loader('soundeffect/basofil.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 3){
            if(sound) sound.stop();
            sound_loader('soundeffect/eosinofil.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 4){
            if(sound) sound.stop();
            sound_loader('soundeffect/limfositb.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 5){
            if(sound) sound.stop();
            sound_loader('soundeffect/limfositt.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 6){
            if(sound) sound.stop();
            sound_loader('soundeffect/monosit.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 7){
            if(sound) sound.stop();
            sound_loader('soundeffect/neutrofil.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 8){
            if(sound) sound.stop();
            sound_loader('soundeffect/makrofag.mp3');
            sound_flag = -1;
        }
        else if (sound_flag == 9){
            if(sound) sound.stop();
            sound_loader('soundeffect/platelet.mp3');
            sound_flag = -1;
        }
    }

    function onMouseDown( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        // update the picking ray with the camera and mouse position
        // console.log(intersects);
        if(overview)
        {

            raycaster.setFromCamera( mouse, sceneOverview.camera );

            var intersects = raycaster.intersectObjects( meshes, true );
            if(intersects.length>0){
                if (intersects[0].object.name == 'Cylinder_Cylinder_Material.028')
                {
                    console.log('Red Blood Cell')
                    sceneOverview = setupScene(0)
                    overview = false
                    sound_flag = 1;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere_Sphere.000_Sphere_Sphere.000_Material.001')
                {
                    console.log('Basofil')
                    sceneOverview = setupScene(1)
                    overview = false
                    sound_flag = 2;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere_Sphere.003_Sphere_Sphere.003_Material.003')
                {
                    console.log('Eosinofil')
                    sceneOverview = setupScene(2)
                    overview = false
                    sound_flag = 3;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere_Sphere.008_Sphere_Sphere.008_Material.015')
                {
                    console.log('Limfosit B')
                    sceneOverview = setupScene(3)
                    overview = false
                    sound_flag = 4;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere.002_Sphere.002_Material.013')
                {
                    console.log('Limfosit T')
                    sceneOverview = setupScene(4)
                    overview = false
                    sound_flag = 5;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere.001_Sphere.002_Sphere.001_Sphere.002_Material.030')
                {
                    console.log('Monosit')
                    sceneOverview = setupScene(5)
                    overview = false
                    sound_flag = 6;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere.004_Sphere.004_Material.027')
                {
                    console.log('Neutrofil')
                    sceneOverview = setupScene(6)
                    overview = false
                    sound_flag = 7;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere_Sphere.009_Sphere_Sphere.009_Material.016')
                {
                    console.log('Makrofag')
                    sceneOverview = setupScene(7)
                    overview = false
                    sceneOverview.object.scale.set(2.8, 2.8, 2.8);                    
                    sound_flag = 8;
                    checkSound();
                    render();
                }
                else if (intersects[0].object.name == 'Sphere_Sphere_Material.001')
                {
                    console.log('Platelet')
                    sceneOverview = setupScene(8)
                    overview = false;
                    sound_flag = 9;
                    checkSound();
                    render();
                }
            }
            else{
                checkSound();
            }

        }
        else 
        {
            
            raycaster.setFromCamera( mouse, sceneOverview.camera );
            var intersects2 = raycaster.intersectObjects( backCheck, true );
            if(intersects2.length>0){
                console.log(intersects2);

                if (intersects2[0].object.type == 'Mesh')
                {
                    setupOverviewScene();
                    overview = true;
                    sound_flag = 0;
                    checkSound();
                    render2();
                }
            }
            else{
                if(menu){
                    my_loader('assets/RED.mtl', 'assets/RED.obj', index);
                    renderMenu();
                    overview = true;
                    menu = false;
                }
            }
        }
    }

    document.addEventListener( 'mousedown', onMouseDown, false );

    function renderSceneInfo(sceneInfo) {  
        renderer.render(sceneInfo.scene, sceneInfo.camera);
    }

    function renderMenu()
    {
        if(index>=9)return;
        const {scene, camera} = sceneOverview;

        if(menu)
        {                
            // console.log(camera.position.x, camera.position.y, camera.position.z);
            renderer.render( scene, camera );
            requestAnimationFrame( renderMenu );
        }
        else{
            load_index++;
            if(load_index <= 15){
                scene.background = menu_background[0];
            }
            else if(load_index <= 30){
                scene.background = menu_background[1];
            }
            else if(load_index <= 45){
                scene.background = menu_background[2];
            }
            else{
                load_index = 0;
            }
            
            renderer.render( scene, camera );
            requestAnimationFrame( renderMenu );
        }
        
    }

    function render2()
    {
        if(overview)
        {
            const {scene, camera} = sceneOverview;
            var j;
            for (j=0; j<meshes.length; j++){
                if(j >148 && j <156){
                    scene.children[j].rotation.x+=0.01;
                }
                else{
                    scene.children[j].rotation.x+=rotation_path[j].x;
                    scene.children[j].rotation.y+=rotation_path[j].y;
                    scene.children[j].rotation.z+=rotation_path[j].z;
                }
                scene.children[j].position.x=path[(path_index + start_index[j])%2000].x + center_path[j].x;
                scene.children[j].position.y=path[(path_index + start_index[j])%2000].y + center_path[j].y;
                scene.children[j].position.z=path[(path_index + start_index[j])%2000].z;
            }
            path_index++;
            path_index%=2000;
            
            renderer.render( scene, camera );
            requestAnimationFrame( render2 );
        }
        
    }

    var t=0;
    function render(time) {
        if(!overview)
        {
            time *= 0.001;
    
            sceneOverview.object.rotation.z +=0.004;
            renderSceneInfo(sceneOverview);
            
            // console.log(path)
            requestAnimationFrame(render);
        }
    }
}

main();