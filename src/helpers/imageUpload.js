import fs from "fs"
import imageType from "image-type"


function getImageExtension(base64String) {
    const match = base64String.match(/^data:image\/([a-zA-Z]+);base64,/);
    if (match && match[1]) {
      return match[1].toLowerCase();
    }
    return null;
  }

const imageUpload = async (img) => {

    const decodedImage = Buffer.from(img, "base64")
     // Obtener la extensión de la imagen basada en su contenido
     //const imageExtension = await imageType(decodedImage); //TODO: imagen.png -> png
    const imageExtension = getImageExtension(img)
    const imageName = `${Date.now()}.${imageExtension}`;
    //const imagePath = path.join(__dirname, 'uploads', imageName);
    console.log(imageExtension)
    const imagePath = `./src/files/images/` + imageName

    await fs.writeFileSync(imagePath, decodedImage);

    return imageName
}

export default imageUpload