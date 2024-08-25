import qrcode
import qrcode.image.svg

img = qrcode.make('c.com', image_factory=qrcode.image.svg.SvgImage)
with open('3.png', 'wb') as qr:
    img.save(qr)

# my_qr = QR(data=u"123@hotmail.com")
# my_qr.encode()
# my_qr.save('qr.svg')
# qr = qrtools.QR()
# qr.decode('qr.svg')

