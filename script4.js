
function calculateBrightness(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness;
}

window.onload = function () {
  let previousUrlList = localStorage.getItem('visitedUrls');

  if (previousUrlList) {
    previousUrlList = JSON.parse(previousUrlList);
    let urlDisplayContainer = document.getElementById('url-display-container');
    let rowContainer = document.createElement('div');
    rowContainer.style.display = 'flex';
    rowContainer.style.flexWrap = 'wrap';
    rowContainer.style.maxHeight = '4 * (25px + 10px)';
    rowContainer.style.overflowY = 'auto';
    urlDisplayContainer.appendChild(rowContainer);

    let prevColor = "";
    let colorsInRow = 0;

    for (let i = previousUrlList.length - 1; i >= 0; i--) {
      let urlElement = document.createElement('a');
      let colorBox = document.createElement('div');

      let url = new URL(previousUrlList[i]);
      let color;

      if (url.searchParams.get("rgb")) {
        let rgbValues = url.searchParams.get("rgb").split(",");
        color = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
      } else if (url.searchParams.get("hsl")) {
        let hslValues = url.searchParams.get("hsl").split(",");
        color = `hsl(${hslValues[0]}, ${hslValues[1]}%, ${hslValues[2]}%)`;
      } else if (url.searchParams.get("hsv")) {
        let hsvValues = url.searchParams.get("hsv").split(",");
        let hslValues = hsvToHsl(
          parseFloat(hsvValues[0]),
          parseFloat(hsvValues[1]),
          parseFloat(hsvValues[2])
        );
        color = `hsl(${hslValues[0]}, ${hslValues[1]}%, ${hslValues[2]}%)`;
      } else if (url.searchParams.get("cmyk")) {
        let cmykValues = url.searchParams.get("cmyk").split(",");
        let rgbValues = cmykToRgb(cmykValues[0], cmykValues[1], cmykValues[2], cmykValues[3]);
        color = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
      } else {
        let pathnameArr = url.pathname.split('/');
        color = decodeURIComponent(pathnameArr[pathnameArr.length - 1]);
      }

      if (color !== prevColor) {
        colorBox.style.backgroundColor = color;
        colorBox.style.width = '57px';
        colorBox.style.height = '25px';
        colorBox.style.margin = '5px';

        urlElement.href = previousUrlList[i];
        urlElement.appendChild(colorBox);

        rowContainer.appendChild(urlElement);

        colorsInRow++;
        if (colorsInRow === 6) {
          rowContainer = document.createElement('div');
          rowContainer.style.display = 'flex';
          rowContainer.style.flexWrap = 'wrap';
          urlDisplayContainer.appendChild(rowContainer);
          colorsInRow = 0;
        }
      }
      prevColor = color;
    }
  }
};

function hsvToHsl(h, s, v) {
  s /= 100;
  v /= 100;

  const l = (2 - s) * v / 2;
  s = l > 0 && l < 1 ? s * v / (l < 0.5 ? l * 2 : 2 - l * 2) : s;

  return [
    h,
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

function cmykToRgb(c, m, y, k) {
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function clearLocalStorage() {
  localStorage.removeItem('visitedUrls');
  let urlDisplayContainer = document.getElementById('url-display-container');
  while (urlDisplayContainer.firstChild) {
    urlDisplayContainer.removeChild(urlDisplayContainer.firstChild);
  }
}

var activationCount = 0;

function togglePopupVisibility() {
  var popupContainer = document.getElementById("popup-container");

  if (activationCount === 0) {
    popupContainer.style.display = "block";
    activationCount += 2;
  } else {
    popupContainer.style.display = (popupContainer.style.display === "none") ? "block" : "none";
    activationCount++;
  }
}
