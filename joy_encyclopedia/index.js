let page = 1;
let viewMode = "thumbnail";
let currentChannelData = null;
let currentModalImageUrl = null;

// ---------------- IMAGE CACHE ----------------
const imageCache = {};

function getImage(url) {
  if (imageCache[url]) return Promise.resolve(imageCache[url]);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      imageCache[url] = img;
      resolve(img);
    };

    img.src = url;
  });
}

// ---------------- WAIT LAYOUT ----------------
function waitLayoutReady() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

// ---------------- UI TEMPLATE ----------------
const SKIP_TYPES = ["Text", "Attachment", "Link", "Media", "Channel"];

const UI_TEMPLATE = {
  thumbnail: (block) => `
    <div class="thumbBox">
      <canvas id="gl-${block.id}"></canvas>
    </div>
    <h3>${block.title || ""}</h3>
  `,

  full: (block) => `
    <div class="fullBox">
      <canvas id="gl-${block.id}"></canvas>
      <div>
        <h3>${block.title || ""}</h3>
        <p>${block.description || ""}</p>
      </div>
    </div>
  `,

  modal: (block) => `
    <div class="modalContent">
      <h3>${block.title || ""}</h3>
      <p>${block.description || ""}</p>
      <canvas id="modalCanvas"></canvas>
    </div>
  `
};

// ---------------- CONFIG ----------------
const RENDER_CONFIG = {
  thumbnail: { scale: 300, dotScale: 0.8 },
  full: { scale: 1200, dotScale: 1.3 },
  modal: { scale: 1200, dotScale: 1.5 }
};

function getConfig(mode = viewMode) {
  return RENDER_CONFIG[mode];
}

// ---------------- INIT ----------------
window.onload = function () {
  fetchChannel(slug, page);
  setupControls();
  setupPDFButton();
};

// ---------------- CONTROLS ----------------
function setupControls() {
  document.getElementById("thumbBtn").onclick = () => {
    viewMode = "thumbnail";
    renderUI();
  };

  document.getElementById("fullBtn").onclick = () => {
    viewMode = "full";
    renderUI();
  };
}

// ---------------- FETCH ----------------
function fetchChannel(slug, page) {
  fetch(`https://api.are.na/v2/channels/${slug}/contents?page=${page}`)
    .then(res => res.json())
    .then(data => {
      currentChannelData = data;
      renderUI();
    });
}

// ---------------- UI RENDER ----------------
function renderUI() {
  if (!currentChannelData) return;

  const container = document.querySelector(".ChannelContents");
  const config = getConfig(viewMode);

  const filtered = currentChannelData.contents.filter(
    b => !SKIP_TYPES.includes(b.class)
  );

  const template = UI_TEMPLATE[viewMode];
  
  container.innerHTML = filtered.map(block => `
    <div class="Block"
      data-img="${block.image?.large?.url || ""}"
      data-title="${block.title || ""}"
      data-description="${block.description || ""}">
      
      ${template(block)}
    </div>
  `).join("");

  waitLayoutReady().then(() => {
    renderAllHalftones();
    attachEvents();
  });
}

// ---------------- HALFTONE ----------------
async function renderAllHalftones() {
  const config = getConfig(viewMode);

  const blocks = currentChannelData.contents.filter(
    b => !SKIP_TYPES.includes(b.class)
  );

  for (const block of blocks) {
    if (!block.image?.large?.url) continue;

    await renderHalftoneGL(
      block.image.large.url,
      `gl-${block.id}`,
      config.scale,
      config.dotScale,
      4
    );
  }
}

// ---------------- WEBGL ----------------
async function renderHalftoneGL(imageUrl, canvasId, scaleValue, dotScale, mode) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const gl = canvas.getContext("webgl", {
    preserveDrawingBuffer: true
  });

  const img = await getImage(imageUrl);

  // canvas size fix
  canvas.width = img.width;
  canvas.height = img.height;

  canvas.style.width = "100%";
  canvas.style.height = "auto";

  gl.viewport(0, 0, canvas.width, canvas.height);

  const vs = `
    attribute vec2 position;
    varying vec2 vUv;
    void main(){
      vUv = (position+1.0)*0.5;
      gl_Position = vec4(position,0,1);
    }
  `;

  const fs = `
    precision mediump float;
    uniform sampler2D uImage;
    uniform int uMode;
    uniform float uScale;
    varying vec2 vUv;

    float h(vec2 uv,float a,float s){
      float c=cos(a), si=sin(a);
      vec2 p=vec2(c*uv.x-si*uv.y, si*uv.x+c*uv.y)*s;
      return (sin(p.x)*sin(p.y))*0.5+0.5;
    }

    void main(){
      vec4 col=texture2D(uImage,vUv);
      float r=col.r,g=col.g,b=col.b;

      float k=1.0-max(max(r,g),b);
      float d=max(1.0-k,0.0001);

      float c=(1.0-r-k)/d;
      float m=(1.0-g-k)/d;
      float y=(1.0-b-k)/d;

      float C=step(h(vUv,radians(15.0),uScale),c);
      float M=step(h(vUv,radians(45.0),uScale),m);
      float Y=step(h(vUv,radians(75.0),uScale),y);
      float K=step(h(vUv,radians(0.0),uScale),k);

      vec3 paper=vec3(1.0);
      vec3 cc=vec3(0.0,0.65,0.85);
      vec3 mm=vec3(0.95,0.2,0.4);
      vec3 yy=vec3(1.0,0.85,0.1);
      vec3 kk=vec3(0.05);

      vec3 outColor=paper;

      if(uMode==0) outColor=mix(paper,cc,C);
      else if(uMode==1) outColor=mix(paper,mm,M);
      else if(uMode==2) outColor=mix(paper,yy,Y);
      else outColor=mix(paper,kk,K);

      gl_FragColor=vec4(outColor,1.0);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1, 1,-1, -1,1, 1,1
  ]), gl.STATIC_DRAW);

  const loc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  gl.uniform1f(gl.getUniformLocation(program,"uScale"), scaleValue);
  gl.uniform1i(gl.getUniformLocation(program,"uMode"), mode);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  gl.flush();
  gl.finish();
}

// ---------------- EVENTS ----------------
function attachEvents() {
  document.querySelectorAll(".Block canvas").forEach(canvas => {
    canvas.onclick = (e) => {
      const el = e.target.closest(".Block");
      if (!el) return;
      openModal(el.dataset.img, el);
    };
  });
}

// ---------------- MODAL ----------------
function openModal(imgUrl, el) {
  const modal = document.getElementById("modal");
  const inner = document.getElementById("modalInner");
  document.getElementById("exportPDFBtn").style.display="block";

  currentModalImageUrl = imgUrl;

  inner.innerHTML = UI_TEMPLATE.modal({
    title: el.dataset.title,
    description: el.dataset.description
  });

  modal.classList.add("active");

  setTimeout(() => {
    renderHalftoneGL(imgUrl, "modalCanvas", 1200, 1.5, 4);
    setupExportButton();
  }, 0);
}

// ---------------- CLOSE ----------------
document.getElementById("modal").onclick = (e) => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.remove("active");
  }
};

// ---------------- EXPORT ----------------
function setupExportButton() {
  document.getElementById("exportPDFBtn").onclick = () => {
    exportCMYKModal(currentModalImageUrl);
  };
}

async function exportCMYKModal(imageUrl) {
  const modalInner = document.getElementById("modalInner");
  document.getElementById("exportPDFBtn").style.display="none";

  modalInner.innerHTML = `
    <div style="display:none;">
      <canvas id="cCanvas"></canvas>
      <canvas id="mCanvas"></canvas>
      <canvas id="yCanvas"></canvas>
      <canvas id="kCanvas"></canvas>
    </div>
    <button id="pdf">PDF</button>
    <div>
      <img id="cImg"/>
      <img id="mImg"/>
      <img id="yImg"/>
      <img id="kImg"/>
    </div>
  `;

  const config = getConfig("modal");

  await renderHalftoneGLK(imageUrl, "cCanvas", config.scale, config.dotScale, 0);
  await renderHalftoneGLK(imageUrl, "mCanvas", config.scale, config.dotScale, 1);
  await renderHalftoneGLK(imageUrl, "yCanvas", config.scale, config.dotScale, 2);
  await renderHalftoneGLK(imageUrl, "kCanvas", config.scale, config.dotScale, 3);

  await waitLayoutReady();

  convertCanvasToPNG("cCanvas", "cImg");
  convertCanvasToPNG("mCanvas", "mImg");
  convertCanvasToPNG("yCanvas", "yImg");
  convertCanvasToPNG("kCanvas", "kImg");

  setupPDFButton();
}

// ---------------- PNG ----------------
function convertCanvasToPNG(canvasId, imgId) {
  const canvas = document.getElementById(canvasId);
  const img = document.getElementById(imgId);
  if (!canvas || !img) return;

  const temp = document.createElement("canvas");
  temp.width = canvas.width;
  temp.height = canvas.height;

  temp.getContext("2d").drawImage(canvas, 0, 0);

  img.src = temp.toDataURL("image/png");
}


// ---------------- PDF ----------------
function setupPDFButton() {
  const btn = document.getElementById("pdf");
  if (!btn) return;

  btn.onclick = async () => {
    await exportPDF();
  };
}

async function exportPDF() {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({ unit: "pt", format: "letter" });

  const ids = ["cImg", "mImg", "yImg", "kImg"];
  let added = 0;

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el?.src) continue;

    const img = new Image();
    img.src = el.src;

    await new Promise(r => img.onload = r);

    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(w / img.width, h / img.height);

    const iw = img.width * ratio;
    const ih = img.height * ratio;

    const x = (w - iw) / 2;
    const y = (h - ih) / 2;

    if (added > 0) pdf.addPage();
    pdf.addImage(img, "PNG", x, y, iw, ih);

    added++;
  }

  if (!added) alert("No images");
  else pdf.save("CMYK.pdf");
}





// ---------------- WEBGL ----------------
function renderHalftoneGL(imageUrl, canvasId, scaleValue, dotScale, mode, usePreserve = false) {
  return new Promise((resolve) => {

    const canvas = document.getElementById(canvasId);
    if (!canvas) return resolve();

    const gl = canvas.getContext(
      "webgl",
      usePreserve ? { preserveDrawingBuffer: true } : null
    );

    if (!gl) {
      console.warn("WebGL failed:", canvasId);
      return resolve();
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      gl.viewport(0, 0, canvas.width, canvas.height);

      const vs = `
        attribute vec2 position;
        varying vec2 vUv;
        void main(){
          vUv = (position + 1.0) * 0.5;
          gl_Position = vec4(position,0,1);
        }
      `;

      const fs = `
        precision mediump float;
        uniform sampler2D uImage;
        uniform int uMode;
        uniform float uScale;
        varying vec2 vUv;

        float h(vec2 uv,float a,float s){
          float c=cos(a), si=sin(a);
          vec2 p=vec2(c*uv.x-si*uv.y, si*uv.x+c*uv.y)*s;
          return (sin(p.x)*sin(p.y))*0.5+0.5;
        }

        void main(){
          vec4 col = texture2D(uImage,vUv);

          float r=col.r,g=col.g,b=col.b;
          float k=1.0-max(max(r,g),b);
          float d=max(1.0-k,0.0001);

          float c=(1.0-r-k)/d;
          float m=(1.0-g-k)/d;
          float y=(1.0-b-k)/d;

          float C=step(h(vUv,radians(15.0),uScale),c);
          float M=step(h(vUv,radians(45.0),uScale),m);
          float Y=step(h(vUv,radians(75.0),uScale),y);
          float K=step(h(vUv,radians(0.0),uScale),k);

          vec3 paper=vec3(1.0);
          vec3 cc=vec3(0.0,0.65,0.85);
          vec3 mm=vec3(0.95,0.2,0.4);
          vec3 yy=vec3(1.0,0.85,0.1);
          vec3 kk=vec3(0.05);

          vec3 outColor = paper;

          if(uMode==0) outColor = mix(paper,cc,C);
          else if(uMode==1) outColor = mix(paper,mm,M);
          else if(uMode==2) outColor = mix(paper,yy,Y);
          else if(uMode==3) outColor = mix(paper,kk,K);
          else {
            outColor = mix(paper,cc,C);
            outColor = mix(outColor,mm,M);
            outColor = mix(outColor,yy,Y);
            outColor = mix(outColor,kk,K);
          }

          gl_FragColor=vec4(outColor,1.0);
        }
      `;

      function compile(t,s){
        const sh=gl.createShader(t);
        gl.shaderSource(sh,s);
        gl.compileShader(sh);
        return sh;
      }

      const p=gl.createProgram();
      gl.attachShader(p,compile(gl.VERTEX_SHADER,vs));
      gl.attachShader(p,compile(gl.FRAGMENT_SHADER,fs));
      gl.linkProgram(p);
      gl.useProgram(p);

      const buf=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buf);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);

      const loc=gl.getAttribLocation(p,"position");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

      const tex=gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,tex);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);

      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);

      gl.uniform1f(gl.getUniformLocation(p,"uScale"),scaleValue);
      gl.uniform1i(gl.getUniformLocation(p,"uMode"),mode);

      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

      resolve();
    };

    img.src = imageUrl;
  });
}



// ---------------- WEBGL ----------------
function renderHalftoneGLK(imageUrl, canvasId, scaleValue, dotScale, mode, usePreserve = false) {
  return new Promise((resolve) => {

    const canvas = document.getElementById(canvasId);
    if (!canvas) return resolve();

    const gl = canvas.getContext(
      "webgl",
      usePreserve ? { preserveDrawingBuffer: true } : null
    );

    if (!gl) {
      console.warn("WebGL failed:", canvasId);
      return resolve();
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      gl.viewport(0, 0, canvas.width, canvas.height);

      const vs = `
        attribute vec2 position;
        varying vec2 vUv;
        void main(){
          vUv = (position + 1.0) * 0.5;
          gl_Position = vec4(position,0,1);
        }
      `;

      const fs = `
        precision mediump float;
        uniform sampler2D uImage;
        uniform int uMode;
        uniform float uScale;
        varying vec2 vUv;

        float h(vec2 uv,float a,float s){
          float c=cos(a), si=sin(a);
          vec2 p=vec2(c*uv.x-si*uv.y, si*uv.x+c*uv.y)*s;
          return (sin(p.x)*sin(p.y))*0.5+0.5;
        }

        void main(){
          vec4 col=texture2D(uImage,vUv);

          float r=col.r,g=col.g,b=col.b;
          float k=1.0-max(max(r,g),b);
          float d=max(1.0-k,0.0001);

          float c=(1.0-r-k)/d;
          float m=(1.0-g-k)/d;
          float y=(1.0-b-k)/d;

          float C=step(h(vUv,radians(15.0),uScale),c);
          float M=step(h(vUv,radians(45.0),uScale),m);
          float Y=step(h(vUv,radians(75.0),uScale),y);
          float K=step(h(vUv,radians(0.0),uScale),k);

          float ink = (uMode==0)?C:(uMode==1)?M:(uMode==2)?Y:K;
          vec3 outColor = vec3(1.0 - ink);

          gl_FragColor=vec4(outColor,1.0);
        }
      `;

      function compile(t,s){
        const sh=gl.createShader(t);
        gl.shaderSource(sh,s);
        gl.compileShader(sh);
        return sh;
      }

      const p=gl.createProgram();
      gl.attachShader(p,compile(gl.VERTEX_SHADER,vs));
      gl.attachShader(p,compile(gl.FRAGMENT_SHADER,fs));
      gl.linkProgram(p);
      gl.useProgram(p);

      const buf=gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,buf);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);

      const loc=gl.getAttribLocation(p,"position");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

      const tex=gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,tex);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);

      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);

      gl.uniform1f(gl.getUniformLocation(p,"uScale"),scaleValue);
      gl.uniform1i(gl.getUniformLocation(p,"uMode"),mode);

      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

      resolve();
    };

    img.src = imageUrl;
  });
}