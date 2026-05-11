const { Jimp, intToRGBA, rgbaToInt } = require('jimp');

async function main() {
    console.log("Loading image...");
    const image = await Jimp.read('./LOGO1.png');
    
    // get top-left pixel color as background
    const bgHex = image.getPixelColor(0, 0);
    const bgRGBA = intToRGBA(bgHex);
    
    const targetR = 27;
    const targetG = 36;
    const targetB = 27;
    
    console.log(`Original background: ${bgRGBA.r}, ${bgRGBA.g}, ${bgRGBA.b}`);
    
    for (let y = 0; y < image.bitmap.height; y++) {
        for (let x = 0; x < image.bitmap.width; x++) {
            const hex = image.getPixelColor(x, y);
            const rgba = intToRGBA(hex);
            
            const dist = Math.sqrt(Math.pow(rgba.r - bgRGBA.r, 2) + Math.pow(rgba.g - bgRGBA.g, 2) + Math.pow(rgba.b - bgRGBA.b, 2));
            
            if (dist < 40) {
                // Keep the original alpha
                const newHex = rgbaToInt(targetR, targetG, targetB, rgba.a);
                image.setPixelColor(newHex, x, y);
            }
        }
    }
    
    console.log("Saving image...");
    await image.write('./LOGO1.png');
    console.log("Done");
}

main().catch(console.error);
