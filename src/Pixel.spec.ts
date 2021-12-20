import { PixelApi } from './Api'
import { XyPixel } from './Pixel'

test('all', async () => {
  XyPixel.api = new PixelApi('prod')
  const pixel = XyPixel.init('test')
  await pixel.send('testing', { testField1: true })
  const x = 1
  expect(x).toBe(1)
})
