const engineUrl = '/courses/vendor/three-0.180.0/three.module.min.js'

export async function createEvidenceScene({ host, canvas, config, initialStageId, onFailure }) {
  const THREE = await import(/* @vite-ignore */ engineUrl)
  if (!host.isConnected) throw new Error('Courses scene was removed before loading')
  const fontFamily = window.getComputedStyle(host).fontFamily

  const materials = []
  const geometries = []
  const textures = []
  const cleanups = []
  let frame = null
  let dead = false
  let visible = true
  let renderer

  const dispose = () => {
    if (dead) return
    dead = true
    if (frame !== null) cancelAnimationFrame(frame)
    cleanups.forEach((cleanup) => cleanup())
    geometries.forEach((geometry) => geometry.dispose())
    materials.forEach((material) => material.dispose())
    textures.forEach((texture) => texture.dispose())
    renderer?.dispose()
    renderer?.forceContextLoss()
  }

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, config.performance.maxDevicePixelRatio))
    renderer.setClearColor(0x06101f, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const scene = new THREE.Scene()
    const cameraConfig = config.scene.camera
    const camera = new THREE.PerspectiveCamera(cameraConfig.fovDegrees, 1, cameraConfig.near, cameraConfig.far)
    camera.position.set(...cameraConfig.desktopPosition)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x50637a, 2.5))
    const key = new THREE.DirectionalLight(0xffffff, 3)
    key.position.set(-3, 7, 9)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x94f2ff, 1.2)
    fill.position.set(4, -2, 4)
    scene.add(fill)
    const group = new THREE.Group()
    scene.add(group)
    const size = config.scene.documentDimensions
    const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
    geometries.push(geometry)
    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x7891ae, roughness: 0.5, metalness: 0.35 })
    materials.push(edgeMaterial)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    function makeTexture(document) {
      const textureCanvas = window.document.createElement('canvas')
      textureCanvas.width = config.scene.textureResolution.width
      textureCanvas.height = config.scene.textureResolution.height
      const context = textureCanvas.getContext('2d')
      if (!context) throw new Error('Canvas textures are unavailable')
      const ink = '#11243a'
      const muted = '#52667e'
      context.fillStyle = document.highlight ? '#dbeafe' : '#f1f5f9'
      context.fillRect(0, 0, 720, 960)
      context.fillStyle = ink
      context.font = '500 25px ' + fontFamily
      context.fillText('NNI', 54, 68)
      context.fillStyle = muted
      context.font = '20px ' + fontFamily
      context.fillText(document.tag, 280, 68)
      context.strokeStyle = '#aabcd3'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(54, 98)
      context.lineTo(666, 98)
      context.stroke()
      const titleBreak = document.title.indexOf(' ')
      context.fillStyle = ink
      context.font = '650 52px ' + fontFamily
      context.fillText(document.title.slice(0, titleBreak), 54, 191)
      context.fillText(document.title.slice(titleBreak + 1), 54, 253)
      context.fillStyle = muted
      context.font = '20px ' + fontFamily
      context.fillText(document.subtitle.toUpperCase(), 54, 305)

      if (document.highlight) {
        context.fillStyle = '#183b5f'
        context.fillRect(54, 368, 610, 131)
        context.fillStyle = '#f0f9ff'
        context.font = '600 32px ' + fontFamily
        context.fillText(document.highlight, 80, 424)
        context.font = '22px ' + fontFamily
        context.fillText(document.highlightDescription, 80, 465)
        document.items.forEach((name, index) => {
          const y = 557 + index * 73
          context.fillStyle = ink
          context.font = '27px ' + fontFamily
          context.fillText(`0${index + 1}   ${name}`, 64, y)
          context.strokeStyle = '#7dabd3'
          context.beginPath()
          context.moveTo(54, y + 24)
          context.lineTo(664, y + 24)
          context.stroke()
        })
      } else {
        document.items.forEach((name, index) => {
          const y = 380 + index * 140
          context.fillStyle = document.itemDetails && index === 1 ? '#cbdcf0' : '#dce8f5'
          context.fillRect(54, y, 610, 103)
          context.fillStyle = ink
          context.font = '27px ' + fontFamily
          if (document.itemDetails) {
            context.fillText(name, 77, y + 40)
            context.fillStyle = muted
            context.font = '19px ' + fontFamily
            context.fillText(document.itemDetails[index], 77, y + 75)
          } else {
            context.fillText(`0${index + 1}`, 78, y + 41)
            context.fillText(name, 146, y + 41)
            context.fillStyle = '#718ba8'
            context.fillRect(148, y + 66, 375 - index * 52, 6)
          }
        })
      }
      context.fillStyle = muted
      context.font = '18px ' + fontFamily
      context.fillText(document.footer, 54, 876)
      context.font = '17px ' + fontFamily
      context.fillText('ESQUEMA CONCEPTUAL / NO ES UN CASO REAL', 54, 915)
      const texture = new THREE.CanvasTexture(textureCanvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4)
      textures.push(texture)
      return texture
    }

    const documents = config.documents.map((document) => {
      const face = new THREE.MeshBasicMaterial({ map: makeTexture(document) })
      materials.push(face)
      const mesh = new THREE.Mesh(geometry, [edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial, face, edgeMaterial])
      group.add(mesh)
      return { id: document.id, mesh }
    })
    const gridPoints = []
    for (let i = -4; i <= 4; i += 1) {
      gridPoints.push(new THREE.Vector3(i * 0.4, -1.88, -1.6), new THREE.Vector3(i * 0.4, -1.88, 1.6))
      gridPoints.push(new THREE.Vector3(-1.6, -1.88, i * 0.4), new THREE.Vector3(1.6, -1.88, i * 0.4))
    }
    const gridGeometry = new THREE.BufferGeometry().setFromPoints(gridPoints)
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x7295bd, transparent: true, opacity: 0.18 })
    geometries.push(gridGeometry)
    materials.push(gridMaterial)
    group.add(new THREE.LineSegments(gridGeometry, gridMaterial))

    // Precompute poses so the animation loop creates no vectors or quaternions.
    const poses = Object.fromEntries(Object.entries(config.scene.poses).map(([id, entries]) => [id, entries.map((entry) => ({
      id: entry.documentId,
      position: new THREE.Vector3(...entry.position),
      quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(...entry.rotation)),
    }))]))
    let stageId = initialStageId
    let started = 0
    let duration = 0
    let from = []
    let pointerAngle = 0

    const draw = (time) => {
      frame = null
      if (dead || !visible || window.document.hidden) return
      const progress = duration ? Math.min(Math.max((time - started) / duration, 0), 1) : 1
      const eased = progress * progress * (3 - 2 * progress)
      documents.forEach(({ mesh, id }, index) => {
        const end = poses[stageId].find((pose) => pose.id === id)
        if (from.length && progress < 1) {
          mesh.position.lerpVectors(from[index].position, end.position, eased)
          mesh.quaternion.slerpQuaternions(from[index].quaternion, end.quaternion, eased)
        } else {
          mesh.position.copy(end.position)
          mesh.quaternion.copy(end.quaternion)
        }
      })
      group.rotation.y = pointerAngle
      renderer.render(scene, camera)
      if (progress < 1) frame = requestAnimationFrame(draw)
    }
    const requestDraw = () => {
      if (frame === null && !dead && visible && !window.document.hidden) frame = requestAnimationFrame(draw)
    }
    const resize = () => {
      if (dead || !host.clientWidth || !host.clientHeight) return
      const width = host.clientWidth
      const height = host.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      const mobile = host.closest('#nni-courses').clientWidth <= 760
      camera.position.z = mobile ? Math.max(9.6, 9.6 / camera.aspect) : cameraConfig.desktopPosition[2]
      camera.updateProjectionMatrix()
      const sceneWidth = 2 * Math.tan(THREE.MathUtils.degToRad(cameraConfig.fovDegrees / 2)) * camera.position.z * camera.aspect
      group.position.set(mobile ? 0 : sceneWidth * 0.265, mobile ? 0.06 : 0.15, 0)
      group.scale.setScalar(mobile ? 1.07 : 1)
      requestDraw()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    cleanups.push(() => resizeObserver.disconnect())
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
      if (visible) requestDraw()
    })
    intersectionObserver.observe(host)
    cleanups.push(() => intersectionObserver.disconnect())
    const visibility = () => {
      if (window.document.hidden && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      } else requestDraw()
    }
    window.document.addEventListener('visibilitychange', visibility)
    cleanups.push(() => window.document.removeEventListener('visibilitychange', visibility))
    const preferenceChange = () => {
      duration = 0
      pointerAngle = 0
      requestDraw()
    }
    reduced.addEventListener('change', preferenceChange)
    cleanups.push(() => reduced.removeEventListener('change', preferenceChange))
    const hero = host.closest('.nc-hero')
    const pointerMove = (event) => {
      if (reduced.matches || event.pointerType !== 'mouse') return
      const rect = host.getBoundingClientRect()
      const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
      pointerAngle = (fraction - 0.5) * 2 * config.interaction.pointerParallaxMaxRadians
      requestDraw()
    }
    const pointerLeave = () => { pointerAngle = 0; requestDraw() }
    hero.addEventListener('pointermove', pointerMove)
    hero.addEventListener('pointerleave', pointerLeave)
    cleanups.push(() => {
      hero.removeEventListener('pointermove', pointerMove)
      hero.removeEventListener('pointerleave', pointerLeave)
    })
    const contextLost = (event) => {
      event.preventDefault()
      dispose()
      onFailure()
    }
    canvas.addEventListener('webglcontextlost', contextLost)
    cleanups.push(() => canvas.removeEventListener('webglcontextlost', contextLost))
    resize()
    return {
      setStage(id) {
        if (dead || id === stageId || !poses[id]) return
        from = documents.map(({ mesh }) => ({ position: mesh.position.clone(), quaternion: mesh.quaternion.clone() }))
        stageId = id
        started = performance.now()
        duration = reduced.matches ? 0 : config.interaction.transitionDurationMs
        requestDraw()
      },
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}
