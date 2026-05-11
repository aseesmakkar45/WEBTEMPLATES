const { Jimp, intToRGBA, rgbaToInt } = require('jimp');

async function main() {
    console.log("Loading LOGO_CROPPED.png...");
    const image = await Jimp.read('./LOGO_CROPPED.png');
    
    // Background is #1b241b (27, 36, 27)
    const bgR = 27;
    const bgG = 36;
    const bgB = 27;
    
    for (let y = 0; y < image.bitmap.height; y++) {
        for (let x = 0; x < image.bitmap.width; x++) {
            const hex = image.getPixelColor(x, y);
            const rgba = intToRGBA(hex);
            
            const dist = Math.sqrt(Math.pow(rgba.r - bgR, 2) + Math.pow(rgba.g - bgG, 2) + Math.pow(rgba.b - bgB, 2));
            
            // If the color is very close to the background color, make it transparent
            if (dist < 30) {
                const newHex = rgbaToInt(rgba.r, rgba.g, rgba.b, 0); // alpha = 0
                image.setPixelColor(newHex, x, y);
            }
        }
    }
    
    console.log("Saving transparent image to LOGO_CROPPED.png...");
    await image.write('./LOGO_CROPPED.png');
    console.log("Done");
}

main().catch(console.error);
