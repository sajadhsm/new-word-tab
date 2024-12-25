export async function readFile(
  file: File,
  as: 'text' | 'dataURL' = 'text',
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)

    if (as === 'text') {
      reader.readAsText(file)
    }
    else {
      reader.readAsDataURL(file)
    }
  })
}
