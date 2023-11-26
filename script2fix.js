function copyText(colorTypeOrValue){let text;const elem=document.getElementById(colorTypeOrValue);if(elem&&elem.isContentEditable){return;}
if(elem!=null){text=colorTypeOrValue+'('+elem.textContent+')';}else{text=colorTypeOrValue;}
var dummy=document.createElement('input');document.body.appendChild(dummy);dummy.value=text;dummy.select();document.execCommand("copy");document.body.removeChild(dummy);showCopiedBar();}
function showCopiedBar(){const copiedBar=document.getElementById('copiedBar');copiedBar.style.display='block';setTimeout(()=>{copiedBar.style.display='none';},1000);}
