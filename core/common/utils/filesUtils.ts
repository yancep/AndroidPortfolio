export async function extractFileType(file: any) {
  let buffer;

  // Si el archivo es un ArrayBuffer, convertirlo directamente a Buffer
  if (file instanceof ArrayBuffer) {
    buffer = Buffer.from(file);
  }
  // Si el archivo es una cadena base64, convertirlo a Buffer
  else if (typeof file === "string" && file.startsWith("data:")) {
    const base64Data = file.split(",")[1]; // Extrae solo la parte base64
    buffer = Buffer.from(base64Data, "base64");
  }
  // Si el archivo es un tipo Blob
  else if (file instanceof Blob) {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  }

  return buffer as Buffer;
}
