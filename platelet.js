function platelet (meshes)
{
    // instantiate a loader
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        'assets/PLATELET.obj',
        // called when resource is loaded
        function ( object ) {

            meshes.push(object);
            // scene.add( object );

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
}