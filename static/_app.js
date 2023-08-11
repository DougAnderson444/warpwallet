/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */

/**
 * Load or Create the crypto seed
 */
let seed;
let urlFragment = location.hash.substr(1);
if (urlFragment) {
	// there is already a seed stored within the URL
	seed = JSON.parse(urlFragment);
} else {
	// otherwise, we create a new seed
	seed = new Uint8Array(32);
	crypto.getRandomValues(seed);
	seed = Array.from(seed);
	// and we store it in the URL fragment
	history.pushState(0, 0, location.href + '#' + JSON.stringify(seed));
}

/**
 * 2: Bootstrap the app html
 */
const bodyHTML = `<html>
  <head>
  <title>Bitcoin Demo</title>

  <body translate="no">


    <script src="https://coins.github.io/secure-bookmark/demo/bitcoin.min.js" integrity="sha256-wYrSlO5fsak7WTxJ9VxtZRB/DFpatfv/cEgUXs5/FtQ" crossorigin></script>
    <script src="https://coins.github.io/secure-bookmark/demo/clipboard.js" integrity="sha256-3VCByRM+Ge37Dm+yksb03tsaCAq9n1rDui/BpHhyIMA=" crossorigin></script>

    <script>
      const address = Bitcoin.ECKey(seed).getBitcoinAddress().toString()

      el_address.textContent = address;
      el_address.href = "https://blockstream.info/address/" + address;

      el_secret.textContent = Bitcoin.convert.bytesToHex(seed)

      el_share.onclick = _ => {
          navigator.share({text: "Here's my bitcoin address " + address });
      }

      el_share.hidden = !navigator.share

      el_copy.onclick = _ => {
          navigator.clipboard.writeText(address)
      }

      el_install.hidden = !!window.navigator.standalone
    </script>
  </body>
  </html>`;

document.write(bodyHTML);
