(function main(){

    //Add Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 0, 40 );
    controls.update();

    // var geometry = new THREE.SphereGeometry(5, 32, 32);
    // var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    // var sphere = new THREE.Mesh( geometry, material );
    // scene.add( sphere );

    terrainGeneration(50, 50, 32, 10);
    animate();

    function animate()
    {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    }

    function terrainGeneration(width, height, segments, smoothingFactor)
    {
        //Initialize Terrain
        terrain = new Array();
        deepth = -1;
	    deepthGround = -80;
        
        for(var i = 0; i <= segments; i++) 
        {
			terrain[i] = new Array();
            for(var j = 0; j <= segments; j++) 
            {
				terrain[i][j] = 0;
			}
        }

        var size = segments + 1;
        for(var length = segments; length >= 2; length /= 2) 
        {
			var half = length/2;
			smoothingFactor /= 2;

			// generate the new square values
            for(var x = 0; x < segments; x += length) 
            {
                for(var y = 0; y < segments; y += length) 
                {
					var average = terrain[x][y]+ // top left
					terrain[x+length][y]+ // top right
					terrain[x][y+length]+ // lower left
					terrain[x+length][y+length]; // lower right
					average /= 4;
					average += 2 * smoothingFactor*Math.random() - smoothingFactor;
					
					terrain[x+half][y+half] = average;
				}
			}

			// generate the diamond values
            for(var x = 0; x < segments; x += half) 
            {
                for(var y = (x+half)%length; y < segments; y += length) 
                {
					var average = terrain[(x-half+size)%size][y]+ // middle left
							terrain[(x+half)%size][y]+ // middle right
							terrain[x][(y+half)%size]+ // middle top
							terrain[x][(y-half+size)%size]; // middle bottom
					average /= 4;
					average += 2 * smoothingFactor*Math.random() - smoothingFactor;
					
					terrain[x][y] = average;

					// values on the top and right edges
					if(x === 0)
						terrain[segments][y] = average;
					if(y === 0)
						terrain[x][segments] = average;
				}
			}
		}
        
        // geometry = new THREE.PlaneGeometry(width, height, segments, segments);
        var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		geometryGround = new THREE.PlaneGeometry(width, height, segments, segments);
		var index = 0;
        for(var i = 0; i <= segments; i++) 
        {
            for(var j = 0; j <= segments; j++) 
            {
                if(index < geometry.vertices.length)
                {
                    geometry.vertices[index].z += terrain[i][j];
                    console.log(geometry.vertices[index].z);
                    geometryGround.vertices[index].z = terrain[i][j] + deepth;
                    index++;
                }
			}
        }

        texture = new THREE.TextureLoader().load( 'assets/tes.bmp' );
        
        // var mesh = new THREE.Mesh(
        //     new THREE.SphereGeometri(2,32,32);
        //     new 
        // );
        var materialGeometry = new THREE.MeshBasicMaterial( {color: 0x000000} );
        var materialGeometryGround = new THREE.MeshBasicMaterial( {map: texture} );

        var mesh = new THREE.Mesh( geometry, materialGeometry );
        var meshGround = new THREE.Mesh( geometry, materialGeometryGround );

        scene.add(meshGround); 
    }

})();