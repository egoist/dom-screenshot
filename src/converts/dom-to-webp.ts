import { domToCanvas } from './dom-to-canvas'

import type { Options } from '../options'

export async function domToWebp<T extends Node>(
  node: T,
  options?: Options,
): Promise<string> {
  const canvas = await domToCanvas(node, options)
  return canvas.toDataURL('image/webp')
}
