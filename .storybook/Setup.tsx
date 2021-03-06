import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Box } from "@material-ui/core";
import { OrbitControls } from "../components/OrbitControl";

const { degToRad } = THREE.Math;
export function Setup({
  children,
  cameraFov = 90,
  cameraPosition = new THREE.Vector3(0, 20, 150),
  lights = true,
  axesHelper = true,
  orbitControls = true,
}) {
  const virtualCamera = React.useRef<THREE.Camera>();

  return (
    <Box bgcolor="black" height="100%">
      <Canvas
        shadows
        camera={{
          position: cameraPosition,
          fov: cameraFov,
        }}
      >
        <React.Suspense fallback={null}>{children}</React.Suspense>
        {lights && (
          <>
            <ambientLight intensity={0.8} />
            <pointLight intensity={0.5} position={[0, 6, 0]} color="red" />
          </>
        )}
        {orbitControls && (
          <OrbitControls camera={virtualCamera.current} autoRotate />
        )}
        {axesHelper && <axesHelper args={[500]} />}
      </Canvas>
    </Box>
  );
}
