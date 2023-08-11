use secrecy::ExposeSecret;
use seed_core::{generate_seed, wrap};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate(pwd: JsValue, salt: JsValue) -> Vec<u8> {
    // convert pwd and salt into Ryst slices
    let pwd_slice = pwd.as_string().unwrap();
    let pwd_slice = pwd_slice.as_bytes();

    let salt_slice = salt.as_string().unwrap();
    let salt_slice = salt_slice.as_bytes();

    // generate the seed
    let seed = generate_seed(pwd_slice, salt_slice).unwrap();

    // return the seed as a vector
    seed.expose_secret().to_vec()
}

#[wasm_bindgen]
pub fn encrypt(key: js_sys::Uint8Array, data: js_sys::Uint8Array) -> Vec<u8> {
    // convert key and data into Ryst slices
    let key_sized: [u8; 32] = key.to_vec().try_into().unwrap();

    // encrypt the data
    wrap::encrypt(key_sized, data.to_vec().as_slice())
}

#[wasm_bindgen]
pub fn decrypt(key: js_sys::Uint8Array, data: js_sys::Uint8Array) -> Vec<u8> {
    // convert key and data into Ryst slices
    let key_sized: [u8; 32] = key.to_vec().try_into().unwrap();

    // decrypt the data
    wrap::decrypt(key_sized, data.to_vec().as_slice())
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

    #[wasm_bindgen_test]
    fn it_works() {
        let pwd = JsValue::from_str("some random words that you made up, for sure!");
        let salt = JsValue::from_str("some@email.com");

        let key = generate(pwd.clone(), salt);

        assert_eq!(
            key,
            vec![
                164, 103, 254, 113, 126, 241, 57, 240, 100, 56, 243, 125, 155, 224, 40, 242, 178,
                136, 222, 133, 220, 141, 127, 10, 88, 199, 181, 11, 241, 91, 149, 249
            ]
        );

        // rand uint8array 32 bytes
        let orig = vec![42; 32];
        let rand = js_sys::Uint8Array::from(&orig[..]);
        let js_key = js_sys::Uint8Array::from(&key[..]);
        let encrypted = encrypt(js_key.clone(), rand.clone());

        let js_encrypted = js_sys::Uint8Array::from(&encrypted[..]);
        let decrypted = decrypt(js_key, js_encrypted);

        assert_eq!(decrypted, orig);
    }
}
