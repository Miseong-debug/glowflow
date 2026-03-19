const fs = require('fs');
const ImageTracer = require('imagetracerjs');

ImageTracer.imageToSVG(
    'glowflow_glow_symbol_text_1773818195568.jpg',
    function(svgstr){ fs.writeFileSync('logo_traced.svg', svgstr); },
    { ltres:0.1, qtres:1, pathomit:8, colorsampling:2, numberofcolors: 32, mincolorratio:0.02, colorquantcycles:3, layering:0 }
);
