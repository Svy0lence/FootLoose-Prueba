import { matchPass, encryptPass } from "../helpers/handleBcrypt.js"


const encrypt = async () => {

    const password = await encryptPass("123456")
    console.log(`PASSWORD: ${password} - ✔`);
}

encrypt()