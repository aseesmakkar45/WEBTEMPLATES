const { Jimp } = require('jimp');

async function main() {
    console.log("Loading recolored LOGO1.png...");
    const image = await Jimp.read('./LOGO1.png');
    
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // Crop the bottom 22% of the image to remove the tagline
    // Starting at x=0, y=0, width=w, height=h * 0.78
    const cropHeight = Math.floor(h * 0.78);
    image.crop({ x: 0, y: 0, w: w, h: cropHeight });
    
    console.log("Saving cropped image to LOGO_CROPPED.png...");
    await image.write('./LOGO_CROPPED.png');
    console.log("Done");
}

main().catch(console.error);
