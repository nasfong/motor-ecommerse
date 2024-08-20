import { getPlaiceholder } from 'plaiceholder'

export default async function getBase64(src: string) {
  const buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()))
  const { metadata: { width, height }, ...plaiceholder } = await getPlaiceholder(buffer, { size: 10 })
  return {
    ...plaiceholder, img: { src, width, height }
  }
}