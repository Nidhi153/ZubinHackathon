# curl -X POST 'https://graph.facebook.com/v20.0/423268137527656/media' \
# -H 'Authorization: Bearer EABycHlgN6cgBOZCNeHl83U5VZA7OSoGgYAZCOc99UL6LrnE0hFDtiy3qM4WtpEwNKpe0RJdOr3sxUPyVhRc5ihfWaVXHYWZAU11Pb4ZBZA4JDf1WsvKHdcXrgc5VXN965lNtWvnaALKrZC0aJ2c9PnJwala6IgaF1galyk05FZAoTTJFgDtlOewcDSuZBZA4Xj4ryRdDSiXa4qOq6qZAJ8UMr4ZD' \
# -F 'file=@"/Users/marcus/Desktop/img.png"' \
# -F 'type="image/png"' \
# -F 'messaging_product="whatsapp"'

curl -X POST 'https://graph.facebook.com/v20.0/423268137527656/media' \
-H 'Authorization: Bearer EABycHlgN6cgBOZCNeHl83U5VZA7OSoGgYAZCOc99UL6LrnE0hFDtiy3qM4WtpEwNKpe0RJdOr3sxUPyVhRc5ihfWaVXHYWZAU11Pb4ZBZA4JDf1WsvKHdcXrgc5VXN965lNtWvnaALKrZC0aJ2c9PnJwala6IgaF1galyk05FZAoTTJFgDtlOewcDSuZBZA4Xj4ryRdDSiXa4qOq6qZAJ8UMr4ZD' \
-F 'file=@"/Users/marcus/Desktop/img3.png"' \
-F 'type="image/png"' \
-F 'messaging_product="whatsapp"'


curl -X GET 'https://graph.facebook.com/v20.0/851422080388100/' \
-H 'Authorization: Bearer EABycHlgN6cgBOZCNeHl83U5VZA7OSoGgYAZCOc99UL6LrnE0hFDtiy3qM4WtpEwNKpe0RJdOr3sxUPyVhRc5ihfWaVXHYWZAU11Pb4ZBZA4JDf1WsvKHdcXrgc5VXN965lNtWvnaALKrZC0aJ2c9PnJwala6IgaF1galyk05FZAoTTJFgDtlOewcDSuZBZA4Xj4ryRdDSiXa4qOq6qZAJ8UMr4ZD'

curl -X GET 'https://graph.facebook.com/v20.0/877915077574452/' \
-H 'Authorization: Bearer EABycHlgN6cgBOZCNeHl83U5VZA7OSoGgYAZCOc99UL6LrnE0hFDtiy3qM4WtpEwNKpe0RJdOr3sxUPyVhRc5ihfWaVXHYWZAU11Pb4ZBZA4JDf1WsvKHdcXrgc5VXN965lNtWvnaALKrZC0aJ2c9PnJwala6IgaF1galyk05FZAoTTJFgDtlOewcDSuZBZA4Xj4ryRdDSiXa4qOq6qZAJ8UMr4ZD'

curl 'https://graph.facebook.com/v20.0/423268137527656/messages' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer EABycHlgN6cgBOZCNeHl83U5VZA7OSoGgYAZCOc99UL6LrnE0hFDtiy3qM4WtpEwNKpe0RJdOr3sxUPyVhRc5ihfWaVXHYWZAU11Pb4ZBZA4JDf1WsvKHdcXrgc5VXN965lNtWvnaALKrZC0aJ2c9PnJwala6IgaF1galyk05FZAoTTJFgDtlOewcDSuZBZA4Xj4ryRdDSiXa4qOq6qZAJ8UMr4ZD' \
-d '
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "+85296035568",
  "type": "image",
  "image": {
    "id" : "875280653969297",
    "caption": "The best succulent ever?"
  }
}'