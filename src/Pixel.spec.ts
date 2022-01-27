import { PixelApi } from './Api'
import { XyPixel } from './Pixel'

test('all', async () => {
  XyPixel.api = new PixelApi('prod')
  const pixel = XyPixel.init('test')
  pixel.identify("test@test.com")
  await pixel.send('testing')
  const x = 1
  expect(x).toBe(1)
})
