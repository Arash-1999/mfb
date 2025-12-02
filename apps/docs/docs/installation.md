---
id: installation
sidebar_position: 1
---

# Installation

## Default Installation

```bash npm2yarn
npm install @mfb/core
```

## Peer Dependencies

Please note that [react](https://www.npmjs.com/package/react), [react-dom](https://www.npmjs.com/package/react-dom) and [react-hook-form](https://www.npmjs.com/package/react-hook-form) are peer dependencies, meaning you should ensure they are installed before installing MFB.

```json
{
  "peerDependencies": {
    "react": "^19.0.0:",
    "react-dom": "^19.0.0:",
    "react-hook-form": "^7.54.2"
  }
}
```
