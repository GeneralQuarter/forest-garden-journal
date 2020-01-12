import { DivIcon } from 'leaflet';

export type MarkerOrientation = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

interface Point {
  x: number;
  y: number;
}

interface MarkerElementPosition {
  ellipse: Point;
  line: {
    start: Point;
    end: Point;
  };
  text: Point;
}

const markerElementPositions: {[orientation: string]: MarkerElementPosition} = {
  'top-left': {
    ellipse: {x: 24, y: 24},
    line: {
      start: {x: 37, y: 37},
      end: {x: 58, y: 58}
    },
    text: {x: 16, y: 32}
  },
  'top-right': {
    ellipse: {x: 40, y: 24},
    line: {
      start: {x: 27, y: 37},
      end: {x: 6, y: 58}
    },
    text: {x: 32, y: 32}
  },
  'bottom-right': {
    ellipse: {x: 40, y: 40},
    line: {
      start: {x: 27, y: 27},
      end: {x: 6, y: 6}
    },
    text: {x: 32, y: 48}
  },
  'bottom-left': {
    ellipse: {x: 24, y: 40},
    line: {
      start: {x: 37, y: 27},
      end: {x: 58, y: 6}
    },
    text: {x: 16, y: 48}
  },
};

export function markerIcon(text: string, orientation: MarkerOrientation) {
  const mp = markerElementPositions[orientation];
  return new DivIcon({
    html: `
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
       <g>
        <ellipse stroke="#000" ry="18" rx="18" cy="${mp.ellipse.y}" cx="${mp.ellipse.x}" stroke-width="1.5" fill="#fff"/>
        <line y2="${mp.line.end.y}" x2="${mp.line.end.x}" y1="${mp.line.start.y}" x1="${mp.line.start.x}"
        stroke-width="1.5" stroke="#000" fill="none"/>
        <text text-anchor="start" font-size="24" y="${mp.text.y}" x="${mp.text.x}"
        stroke-width="0" stroke="#000" fill="#000000">${text}</text>
       </g>
      </svg>
    `,
    iconSize: [64, 64],
    iconAnchor: [mp.line.end.x, mp.line.end.y],
  });
}

export function newMarkerIcon(text: string) {
  return new DivIcon({
    html: `
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
       <g>
        <ellipse stroke="#000" ry="8" rx="8" cy="12" cx="16" fill="#fff"/>
        <line y2="20" x2="16" y1="30" x1="16" stroke="#000" fill="none"/>
        <text text-anchor="middle" font-size="10" y="16" x="16" stroke-width="0" stroke="#000" fill="#000000">${text}</text>
       </g>
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 30]
  });
}
