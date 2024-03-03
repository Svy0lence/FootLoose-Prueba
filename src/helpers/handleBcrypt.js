import bcrypt from "bcryptjs"

export const encryptPass = async (password) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash

    } catch (err) {
        console.log(err);
    }
}

export const matchPass = async (password, savePassword) => {

    try {
        return await bcrypt.compare(password, savePassword)
    } catch (err) {
        console.log(err);
    }

}