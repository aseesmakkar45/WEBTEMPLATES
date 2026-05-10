# Archive: Interactive Controls Configuration (temp3)

This document archives the control station panel configurations, ranges, and presets for future reference.

## Trajectory Physics States
These are the React state values used to morph the diagonal sine wave trajectory:

| State Variable | Type | Default Value | Recommended Range | Description |
|---|---|---|---|---|
| `rotation` | `number` | `-15` | `-180` to `180` | Path inclination angle (rotation) in degrees |
| `amplitude` | `number` | `130` | `0` to `320` | Wave height (amplitude) in pixels |
| `frequency` | `number` | `1.6` | `0.5` to `4.0` | Number of complete sine cycles across the canvas |
| `itemSize` | `number` | `210` | `110` to `240` | Card size dimension in pixels |
| `showPath` | `boolean` | `true` | `true` / `false` | Whether to draw the dashed SVG sine line |
| `autoplay` | `boolean` | `false` | `true` / `false` | Continuous sliding vs scroll-wheel driving |
| `autoplaySpeed` | `number` | `30` | `5` to `60` | Full loop duration in seconds for autoplay |
| `scrollSensitivity` | `number` | `1.2` | `0.4` to `2.5` | Multiplier for how fast the wheel advances the cards |

---

## Interactive Presets
Below are the mathematical presets originally configured in the slider dashboard:

### 1. Diagonal Descent (Default Setup)
- **Inclination Angle (`rotation`)**: `-15°` (formerly `-45°`)
- **Amplitude**: `130px`
- **Frequency**: `1.6x`
- **Card Size**: `210px`
- **Scroll Sensitivity**: `1.2x`

### 2. Wave Surge
- **Inclination Angle (`rotation`)**: `15°`
- **Amplitude**: `260px`
- **Frequency**: `2.2x`
- **Card Size**: `180px`
- **Scroll Sensitivity**: `1.5x`

### 3. Vertical Spiral
- **Inclination Angle (`rotation`)**: `90°`
- **Amplitude**: `160px`
- **Frequency**: `1.5x`
- **Card Size**: `200px`
- **Scroll Sensitivity**: `1.0x`

### 4. Subtle Float
- **Inclination Angle (`rotation`)**: `0°`
- **Amplitude**: `70px`
- **Frequency**: `1.0x`
- **Card Size**: `230px`
- **Scroll Sensitivity**: `1.8x`
