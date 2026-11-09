/*
 * Creates a small, uncompressed ZIP archive in the browser.
 * Suitable for the library's text-based source files.
 */

const encoder = new TextEncoder();

const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;

  for (let bit = 0; bit < 8; bit += 1) {
    value =
      value & 1
        ? 0xedb88320 ^ (value >>> 1)
        : value >>> 1;
  }

  return value >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function createHeader(length) {
  const bytes = new Uint8Array(length);
  const view = new DataView(bytes.buffer);

  return { bytes, view };
}

export default function downloadSourceZip(files, archiveName) {
  const entries = Object.entries(files);

  if (!entries.length || entries.length > 65535) {
    throw new Error("The archive needs between 1 and 65,535 files.");
  }

  const localParts = [];
  const centralParts = [];

  let localOffset = 0;
  let centralSize = 0;

  for (const [fileName, content] of entries) {
    // These bundles contain flat, trusted registry files.
    // Reject paths to keep extraction straightforward.
    if (
      !fileName ||
      fileName === "." ||
      fileName === ".." ||
      /[\\/\u0000-\u001f]/.test(fileName)
    ) {
      throw new Error("A source file has an unsupported name.");
    }

    const nameBytes = encoder.encode(fileName);
    const dataBytes = encoder.encode(content);

    if (nameBytes.length > 65535) {
      throw new Error("A source filename is too long.");
    }

    const checksum = crc32(dataBytes);

    // Local file header.
    const local = createHeader(30);

    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, 20, true);       // ZIP version
    local.view.setUint16(6, 0x0800, true);   // UTF-8 filenames
    local.view.setUint16(8, 0, true);        // No compression
    local.view.setUint16(12, 33, true);      // 1 January 1980
    local.view.setUint32(14, checksum, true);
    local.view.setUint32(18, dataBytes.length, true);
    local.view.setUint32(22, dataBytes.length, true);
    local.view.setUint16(26, nameBytes.length, true);

    localParts.push(local.bytes, nameBytes, dataBytes);

    // Central directory header.
    const central = createHeader(46);

    central.view.setUint32(0, 0x02014b50, true);
    central.view.setUint16(4, 20, true);
    central.view.setUint16(6, 20, true);
    central.view.setUint16(8, 0x0800, true);
    central.view.setUint16(10, 0, true);
    central.view.setUint16(14, 33, true);
    central.view.setUint32(16, checksum, true);
    central.view.setUint32(20, dataBytes.length, true);
    central.view.setUint32(24, dataBytes.length, true);
    central.view.setUint16(28, nameBytes.length, true);
    central.view.setUint32(42, localOffset, true);

    centralParts.push(central.bytes, nameBytes);

    centralSize += central.bytes.length + nameBytes.length;
    localOffset +=
      local.bytes.length + nameBytes.length + dataBytes.length;

    if (localOffset + centralSize > 0xffffffff) {
      throw new Error("This source bundle is too large.");
    }
  }

  // End of central directory.
  const end = createHeader(22);

  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(8, entries.length, true);
  end.view.setUint16(10, entries.length, true);
  end.view.setUint32(12, centralSize, true);
  end.view.setUint32(16, localOffset, true);

  const blob = new Blob(
    [...localParts, ...centralParts, end.bytes],
    { type: "application/zip" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = archiveName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
