<h1 align="center">dom-screenshot</h1>

<p align="center">
  <a href="https://unpkg.com/@egoist/dom-screenshot">
    <img src="https://img.shields.io/bundlephobia/minzip/@egoist/dom-screenshot" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/@egoist/dom-screenshot">
    <img src="https://img.shields.io/npm/v/@egoist/dom-screenshot.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@egoist/dom-screenshot">
    <img src="https://img.shields.io/npm/dm/@egoist/dom-screenshot" alt="Downloads">
  </a>
  <a href="https://github.com/egoist/dom-screenshot/issues">
    <img src="https://img.shields.io/github/issues/egoist/dom-screenshot" alt="Issues">
  </a>
  <a href="https://github.com/egoist/dom-screenshot/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/dom-screenshot.svg" alt="License">
  </a>
</p>

<p align="center">Quickly generate image from DOM node using HTML5 canvas and SVG</p>

<p align="center">Fork from <a href="https://github.com/bubkoo/html-to-image">html-to-image</a></p>

## 📦 Install

```sh
npm i @egoist/dom-screenshot
```

## 🦄 Usage

```ts
import { domToPng } from '@egoist/dom-screenshot'

domToPng(document.querySelector('#app')).then((dataUrl) => {
  const link = document.createElement('a')
  link.download = 'screenshot.png'
  link.href = dataUrl
  link.click()
})
```

<details>
<summary>CDN</summary><br>

```html
<script src="https://unpkg.com/@egoist/dom-screenshot"></script>
<script>
  domScreenshot.domToPng(document.querySelector('body')).then((dataUrl) => {
    const link = document.createElement('a')
    link.download = 'screenshot.png'
    link.href = dataUrl
    link.click()
  })
</script>
```

<br></details>

<details>
<summary>Browser Console</summary><br>

> ⚠️ Partial embedding will fail due to CORS

```js
const script = document.createElement('script')
script.src = 'https://unpkg.com/@egoist/dom-screenshot'
document.getElementsByTagName('head')[0].appendChild(script)

script.onload = () => {
  domScreenshot
    .domToImage(document.querySelector('body'), {
      debug: true,
      progress: (current, total) => {
        console.log(`${current}/${total}`)
      },
    })
    .then((img) => {
      const width = 600
      const height = img.height * (width / img.width)
      console.log(
        '%c ',
        [
          `padding: 0 ${width / 2}px;`,
          `line-height: ${height}px;`,
          `background-image: url('${img.src}');`,
          `background-size: 100% 100%;`,
        ].join('')
      )
    })
}
```

<br></details>

## Methods

> `method(node: Node, options?: Options)`

DOM to dataURL

- [domToPng](src/converts/dom-to-png.ts)
- [domToSvg](src/converts/dom-to-svg.ts)
- [domToJpeg](src/converts/dom-to-jpeg.ts)
- [domToWebp](src/converts/dom-to-webp.ts)
- [domToDataUrl](src/converts/dom-to-data-url.ts)

DOM to data

- [domToBlob](src/converts/dom-to-blob.ts)
- [domToPixel](src/converts/dom-to-pixel.ts)

DOM to HTMLElement

- [domToForeignObjectSvg](src/converts/dom-to-foreign-object-svg.ts)
- [domToImage](src/converts/dom-to-image.ts)
- [domToCanvas](src/converts/dom-to-canvas.ts)

## Options

See the [options.ts](src/options.ts)

## Singleton context and web worker

Quick screenshots per second by reusing context and web worker

```ts
// use vite
import workerUrl from '@egoist/dom-screenshot/worker?url'
import { createContext, destroyContext, domToPng } from '@egoist/dom-screenshot'

async function screenshotsPerSecond() {
  const context = await createContext(document.querySelector('#app'), {
    workerUrl,
    workerNumber: 1,
  })
  for (let i = 0; i < 10; i++) {
    domToPng(context).then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `screenshot-${i + 1}.png`
      link.href = dataUrl
      link.click()
      if (i + 1 === 10) {
        destroyContext(context)
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

screenshotsPerSecond()
```

See the [context.ts](src/context.ts)

## TODO

- [ ] unable to clone [css counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Counter_Styles/Using_CSS_counters)

  `content: counter(step);`
