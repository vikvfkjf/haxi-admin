import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair; 把下面生成的公钥、私钥换成自己生成的即可
const publicKey = '-----BEGIN RSA Public Key-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1XmxU5BJA4ySGNVUC4uk\n8E7tNQB+h7/y+twjTdXo+QrdM5vYcsGE8C6TwAEN3WiDNYXWOAY2684DFJjCnUAV\nlgxpuc8OJyjD2lkOqcm2tFdtbxlN0g1iB0mRk4MWQBDQCDYlayPlTfAPbP+3hy0n\nyhrK2YJYsHH2BfoiuWzZYX4Lh60Y1FhnLvW8+CmQnWJq1t9f8xxoswlcUPblI2pD\nlpU1eLwlX2m/wClbxvbt10Sbslv5x8huxhnxd4WsLHzVvVt0ZaD4TUbsnVaED/XD\nudQ+9vumz4WeP9HgZuogayEeUHfFTSiXMaB1LzW+M+S7MS1BYJ/gVrpR2QBgIxDu\ndwIDAQAB\n-----END RSA Public Key-----';//生成的公钥
const privateKey='';

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

export function encryptRSA(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encryptRSA(txt) // 对数据进行加密
  }

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
