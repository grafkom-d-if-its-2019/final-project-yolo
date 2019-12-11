function CustomSinCurve(scale)
{
    THREE.Curve.call(this);

    this.scale = (scale === undefined) ? 1 : scale;
}

CustomSinCurve.prototype=Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint= function (t){
    var tx = 15* (t*3-1.5);
    var ty = Math.sin(2 * Math.PI ) * 10;
    var tz = 0;

    // console.log(t)

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
}

function bloodVessels(scene)
{
    var texture = new THREE.TextureLoader().load('assets/blood_vessel_3.jpg');
    var path = new CustomSinCurve(10);
    var geom = new THREE.TubeGeometry(path, 20, 20, 20, false);
    var mat = new THREE.MeshPhongMaterial({color: 0xff0000, 
        map : texture,
        side: THREE.BackSide
    });

    var vessels = new THREE.Mesh(geom, mat);

    scene.add(vessels);
}